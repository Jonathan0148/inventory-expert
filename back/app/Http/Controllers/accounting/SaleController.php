<?php

namespace App\Http\Controllers\accounting;

use App\Exports\SalesExport;
use App\Helpers\AuditHelper;
use App\Helpers\InvoiceHelper;
use Illuminate\Http\Request;
use App\Models\accounting\Sale;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use App\helpers\ResponseHelper;
use App\Models\accounting\Bail;
use App\Models\accounting\SalesDetail;
use App\Models\contacts\Customer;
use App\Models\inventory\Product;
use App\Models\Local;
use App\Models\PaymentMethod;
use App\Models\settings\Store;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = [];
        $page = $request->input('page') ? $request->input('page') : 1;
        $limit = $request->input('limit') ? $request->input('limit') : 10;
        $term = $request->input('term');
        $type = $request->input('type');
        $date = $request->input('date');

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $sale = $this->getSaleBypagination($term);
        if ($date && $type) $sale = $this->getSaleWithFilters($type, $date, $sale);
        $data = $sale->orderBy('id', 'DESC')->paginate($limit);

        return ResponseHelper::Get($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try {

            $products = @$request->productsForm;
            $status = @$request->status;
            $customer = (!$request->client_exists) ? $this->createClientForSale(@$request->all()) : @$request->id_customer;

            $data = Sale::create([
                'reference' => $request->input('reference'),
                'date' => Carbon::parse($request->input('date'))->toDateTimeString(),
                'id_customer' => $customer,
                'id_payment_method' => $request->input('id_payment_method'),
                'status' => $status,
                'total_bails' => $request->input('total_bails'),
                'subtotal' => $request->input('subtotal'),
                'tax' => $request->input('tax'),
                'total' => $request->input('total'),
                'observations' => $request->input('observations'),
            ]);

            if ($status == 2) $this->createBail(@$request->all(), $data);

            $products = $this->productSalesDetail($products, $data->id);
            
            if (isset($products['success']) && !$products['success']) {
                return ResponseHelper::NoExits($products['message']);
            }

            try {
                SalesDetail::insert($products);
            } catch (\Throwable $th) {
                return ResponseHelper::Error($th, 'El detalle de la venta no pudo ser almacenado');
            }

            return ResponseHelper::CreateOrUpdate($data, 'Venta creada correctamente');
        } catch (Throwable $th) {
            return ResponseHelper::Error($th, 'La venta no pudo ser creada');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Sale::with(['details' => function ($query) {
            $query->with(['product' => function ($query) {
                $query->select('name', 'id', 'reference', 'stock', 'price_total as price');
            }]);
        }, 'customer', 'paymentMethod:id,name'])->find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe una venta con el id ' .  $id);
        }
        return ResponseHelper::Get($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Sale::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe una venta con el id ' .  $id);
        }

        $customer = (!$request->client_exists) ? $this->createClientForSale(@$request->all()) : @$request->id_customer;

        try {
            $data->update([
                'id_customer' => $customer,
                'id_payment_method' => $request->input('id_payment_method'),
                'status' => $request->input('status'),
                'subtotal' => $request->input('subtotal'),
                'tax' => $request->input('tax'),
                'total' => $request->input('total'),
                'observations' => $request->input('observations')
            ]);

            $products = @$request->productsForm;
            $productsSave = $this->productSalesDetailUpdate($products, $data->id);

            if (isset($productsSave['success']) && !$productsSave['success']) {
                return ResponseHelper::NoExits(@$productsSave['message']);
            }

            try {
                SalesDetail::insert($productsSave);
            } catch (\Throwable $th) {
                return ResponseHelper::Error($th, 'El detalle de la venta no pudo ser almacenado');
            }


            return  ResponseHelper::CreateOrUpdate($data, 'Información actualizada correctamente',);
        } catch (Throwable $th) {
            return ResponseHelper::Error($th, 'La información no pudo ser actualizada');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Sale::with('details')->find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe una venta con el id ' .  $id);
        }


        $this->deleteSale($data['details']);
        $data->bails()->delete();
        $data->delete();

        return ResponseHelper::Delete('Venta eliminada correctamente');
    }

    public function deleteSale($details): void
    {
        foreach (@$details as $detail) {
            $productAvailable = Product::find(@$detail['product_id']);
            $this->backToStock($productAvailable, @$detail['amount']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyDetail($id)
    {
        $data = SalesDetail::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe un detalle de venta con el id ' .  $id);
        }

        $productAvailable = Product::find($data['product_id']);
        $this->backToStock($productAvailable, $data['amount']);
        $data->delete();

        return ResponseHelper::Delete('Registro eliminado correctamente');
    }

    /**
     * GET PAYMENT METHOD ALL
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPaymentMethods()
    {
        $paymentMethods = PaymentMethod::all();

        return ResponseHelper::Get($paymentMethods);
    }

    /**
     * get id latest
     */
    public function getCount()
    {
        $data = Sale::latest('id')->first();

        return ResponseHelper::Get($data);
    }

    /**
     * Display the specified resource.
     */
    public function downloadInvoice($id)
    {
        $sale = Sale::select('sales.reference', 'sales.subtotal', 'sales.tax', 'sales.total', 'payment_methods.name as paymentMethod', 'sales.created_at', 'sales.date')
            ->leftjoin('payment_methods', 'sales.id_payment_method', '=', 'payment_methods.id')
            ->where('sales.id', $id)
            ->first();

        $detailSail = SalesDetail::select('products.name', 'sales_detail.amount', 'sales_detail.price')
            ->leftjoin('products', 'sales_detail.product_id', '=', 'products.id')
            ->where('sale_id', $id)
            ->get();

        $local = Store::first();
        return InvoiceHelper::download($sale, $detailSail, $local);
    }

    private function createBail(array $req, Sale $sale): Int
    {
        $bailNew = Bail::create([
            'id_sale' => $sale->id,
            'id_payment_method' => @$req['id_payment_method'],
            'price' => @$req['bail'],
        ]);


        $this->updateBailsSale($sale);
        return $bailNew->id;
    }

    private function updateBailsSale($sale)
    {
        $bails = $this->getBailsTotalSale($sale->id);
        $sale->update(['total_bails' => $bails]);
    }

    private function getBailsTotalSale(Int $idSale): string
    {
        return Bail::where('id_sale', $idSale)->sum('price');
    }

    private function createClientForSale(array $customer): Int
    {
        $customerNew = Customer::create([
            'id_type_person' => @$customer['id_type_person'],
            'full_name' => @$customer['full_name'],
            'id_type_document' => @$customer['id_type_document'],
            'document' => @$customer['document'],
            'cellphone' => @$customer['cellphone'],
            'email' => @$customer['email'],
        ]);

        return $customerNew->id;
    }

    private function productSalesDetailUpdate($products, $id)
    {
        $arr = [];
        foreach ($products as $product) {
            $saleDetail = SalesDetail::find(@$product['sale_id']);
            $productAvailable = Product::find($product['product_id']);
            $amountAvailable = @$product['amount'];

            if ($saleDetail) {
                $this->backToStock($productAvailable, @$saleDetail->amount);
                $amountAvailable = @$productAvailable->stock;
            }

            if (@$productAvailable->stock < @$amountAvailable) {
                return [
                    'message' => "No hay unidades disponibles para <b>$productAvailable->name</b>. <br> <b>$productAvailable->stock unidad/es</b> disponibles",
                    'success' => false
                ];
                break;
            }

            if ($saleDetail) {
                $saleDetail->update(['product_id' => $product['product_id'], 'amount' => @$product['amount'], 'price' => @$product['price']]);
            }

            $this->updateStock($productAvailable, @$product['amount']);
            if (!$saleDetail) {
                $product['created_at'] = now();
                $product['sale_id'] = $id;
                $arr[] = $product;
            }
        }
        return $arr;
    }

    private function productSalesDetail($products, $id)
    {
        $arr = [];
        foreach ($products as $product) {
            $productAvailable = Product::find($product['product_id']);

            if (@$productAvailable->stock < @$product['amount']) {
                return [
                    'message' => "No hay unidades disponibles para <b>$productAvailable->name</b>. <br> <b>$productAvailable->stock unidad/es</b> disponibles",
                    'success' => false
                ];
                break;
            }
            $this->updateStock($productAvailable, @$product['amount']);
            $product['created_at'] = now();
            $product['sale_id'] = $id;
            $arr[] = $product;
        }
        return $arr;
    }

    private function updateStock($product, $amount)
    {
        $newStock = $product->stock - $amount;
        $this->updateProductStock($product, $newStock);
    }

    private function backToStock($product, $amount)
    {
        $newStock = $product->stock + $amount;
        $this->updateProductStock($product, $newStock);
    }

    private function updateProductStock(Product $product, Int $newStock)
    {
        $status = $this->newStatusProduct($newStock, $product->stock_min);
        
        $product->update(['stock' => $newStock, 'status' => $status]);
    }

    private function newStatusProduct(Int $stock, Int $minStock): string
    {
        $newStatus = 'in-stock';
        if ($minStock >= $stock) {
            $newStatus = 'low-stock';
        }
        if ($stock == 0) {
            $newStatus = 'out-stock';
        }
        return $newStatus;
    }

    private function getSaleBypagination($term)
    {
        return Sale::select('sales.*')
            ->with(['customer' => function ($query) {
                $query->select('id', 'full_name', 'type_document', 'document');
            }, 'paymentMethod:id,name'])
            ->where(function ($query) use ($term) {
                $query->where('reference', 'like', "%$term%");
                $query->orWhere('status', 'like', "%$term%");
            });
    }

    private function getSaleWithFilters(String $type, $date, $expense)
    {
        if ($type == 'month') {
            $rangeDates = $this->getMonthAndYear($date);
            return $expense->whereMonth('sales.date', $rangeDates['month'])->whereYear('sales.date', $rangeDates['year']);
        }
        return $expense->whereDate('sales.date', $date);
    }

    private function getMonthAndYear($date)
    {
        $parseDate = Carbon::parse($date);
        $arr['month'] = $parseDate->format('m');
        $arr['year'] = $parseDate->format('Y');
        return $arr;
    }


    /**
     * create audit function
     */
    public function transformDateSales()
    {
        $sales = Sale::get();

        foreach($sales as $sale){
            $dateTime = Carbon::parse($sale->created_at)->toDateTimeString();
            $sale->date = $dateTime;
            $sale->update();
        }
    }


    // /**
    //  * Export resource data
    //  */
    // public function exportExcel()
    // {
    //     return Excel::download(new SalesExport, 'Listado-ventas.xlsx');
    // }
}
