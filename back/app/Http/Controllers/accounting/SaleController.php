<?php

namespace App\Http\Controllers\accounting;

use App\Helpers\InvoiceHelper;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\accounting\Bail;
use App\Models\accounting\PaymentMethod;
use App\Models\accounting\Sale;
use App\Models\accounting\SaleDetail;
use App\Models\contacts\Customer;
use App\Models\inventory\Product;
use App\Models\settings\Store;
use Carbon\Carbon;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{
    /**
     * Muestra muchos registros.
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
     * Crea un registro.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $product = Sale::where('reference', $request->input('reference'))->first();
        if ($product) {
            return ResponseHelper::NoExits('Ya existe una venta con esta referencia');
        }

        try {
            $products = @$request->productsForm;
            $status = @$request->status;
            $customer = ($request->input('document') && $request->input('full_name')) ? ((!$request->client_exists) ? $this->createClientForSale($request->all()) : $request->customer_id) : null;
    
            $data = Sale::create([
                'store_id' => $request->input('store_id'),
                'customer_id' => $customer,
                'payment_type_id' => $request->input('payment_type_id'),
                'date' => Carbon::createFromFormat('d/n/Y, H:i:s', $request->input('date'))->format('Y-m-d H:i:s'),
                'reference' => $request->input('reference'),
                'status' => $status,
                'total_bails' => $request->input('bail'),
                'subtotal' => $request->input('subtotal'),
                'tax' => $request->input('tax'),
                'total' => $request->input('total'),
                'observations' => $request->input('observations'),
            ]);
            
            if ($status == 2) $this->createBail(@$request->all(), $data);
    
            $this->createSalesDetail($products, $data->id);
            
            return ResponseHelper::CreateOrUpdate($data, 'Información creada correctamente');
        } catch (\Throwable $th) {
            return ResponseHelper::Error($th, 'La información no pudo ser creada');
        }
    }

     /**
     * Muestra un registro.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Sale::with(['details' => function ($query) {
            $query->with(['product' => function ($query) {
                $query->select('name', 'id', 'images', 'stock', 'price_total as price');
            }]);
        }, 'customer', 'paymentMethod:id,name'])->find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe una venta con el id ' .  $id);
        }
        return ResponseHelper::Get($data);
    }

    /**
     * Edita un registro.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $data = Sale::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $products = @$request->productsForm;
        $status = @$request->status;
        $customer = ($request->input('document')) ? ((!$request->client_exists) ? $this->createClientForSale($request->all()) : $request->customer_id) : null;
        
        try {
            $data->update([
                'customer_id' => $customer,
                'payment_type_id' => $request->input('payment_type_id'),
                'status' => $status,
                'subtotal' => $request->input('subtotal'),
                'tax' => $request->input('tax'),
                'total' => $request->input('total'),
            ]);

            $this->updateSalesDetail($products, $data->id);

            return  ResponseHelper::CreateOrUpdate($data, 'Información actualizada correctamente',);
        } catch (\Throwable $th) {
            return ResponseHelper::Error($th, 'La información no pudo ser actualizada');
        }
    }

    /**
     * Elimina un registro.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Sale::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $this->returnStockProducts($id);

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }

    private function getSaleBypagination($term)
    {
        return Sale::select('sales.*')
            ->leftjoin('customers', 'sales.customer_id', '=', 'customers.id')
            ->with(['customer' => function ($query) {
                $query->select('id', 'full_name', 'type_document', 'document');
            }, 'paymentMethod:id,name'])
            ->where(function ($query) use ($term) {
                $query->where('sales.reference', 'like', "%$term%");
                $query->orWhere('sales.status', 'like', "%$term%");
                $query->orWhere('customers.full_name', 'like', "%$term%");
                $query->orWhere('customers.document', 'like', "%$term%");
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

    public function getReference()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        $length = 10;

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return ResponseHelper::Get($randomString);
    }

    public function getPaymentMethods()
    {
        $paymentMethods = PaymentMethod::all();

        return ResponseHelper::Get($paymentMethods);
    } 

    private function createClientForSale(array $customer): Int
    {
        $customerNew = Customer::create([
            'type_document' => @$customer['type_document'],
            'document' => @$customer['document'],
            'full_name' => @$customer['full_name'],
            'cell_phone' => @$customer['cell_phone']
        ]);

        return $customerNew->id;
    }

    private function createBail(array $req, Sale $sale)
    {
        Bail::create([
            'sale_id' => $sale->id,
            'payment_type_id' => @$req['payment_type_id'],
            'price' => @$req['bail'],
        ]); 
    }

    private function createSalesDetail(array $products, int $saleId)
    {
        foreach ($products as $product){
            SaleDetail::create([
                'sale_id' => $saleId,
                'product_id' => $product['product_id'],
                'amount' => $product['amount'],
                'price' => $product['price']
            ]);

            $productFind = Product::find($product['product_id']);
            $stock = $productFind['stock'] - $product['amount'];
            $status = $this->newStatusProduct($stock, $productFind->stock_min);
            $productFind->update(['stock' => $stock, 'status' => $status ]);
        }
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

    private function returnStockProducts(int $saleId)
    {
        $products = SaleDetail::where('sale_id', $saleId)->get();

        foreach ($products as $product){
            $productFind = Product::find($product['product_id']);
            $stock = $productFind['stock'] + $product['amount'];
            $status = $this->newStatusProduct($stock, $productFind->stock_min);
            $productFind->update(['stock' => $stock, 'status' => $status ]);
        }
    }

    private function updateSalesDetail(array $productsCreate, int $saleId)
    {
        $productsUpdate = SaleDetail::where('sale_id', $saleId)->get();
        foreach ($productsUpdate as $productUpdate){
            $productFindUpdate = Product::find($productUpdate['product_id']);
            $stock = $productFindUpdate['stock'] + $productUpdate['amount'];
            $status = $this->newStatusProduct($stock, $productFindUpdate->stock_min);
            $productFindUpdate->update(['stock' => $stock, 'status' => $status ]);

            $productUpdate->delete();
        }

        foreach ($productsCreate as $product){
            SaleDetail::create([
                'sale_id' => $saleId,
                'product_id' => $product['product_id'],
                'amount' => $product['amount'],
                'price' => $product['price']
            ]);

            $productFind = Product::find($product['product_id']);
            $stock = $productFind['stock'] - $product['amount'];
            $status = $this->newStatusProduct($stock, $productFind->stock_min);
            $productFind->update(['stock' => $stock, 'status' => $status ]);
        }
    }

    public function downloadInvoice($id)
    {
        $sale = Sale::select('sales.reference', 'sales.subtotal', 'sales.tax', 'sales.total', 'payment_methods.name as paymentMethod', 'sales.created_at', 'sales.date')
            ->leftjoin('payment_methods', 'sales.payment_type_id', '=', 'payment_methods.id')
            ->where('sales.id', $id)
            ->first();

        $detailSail = SaleDetail::select('products.name', 'sale_details.amount', 'sale_details.price')
            ->leftjoin('products', 'sale_details.product_id', '=', 'products.id')
            ->where('sale_id', $id)
            ->get();

        $local = Store::first();

        $data['sale'] = $sale;
        $data['detailSail'] = $detailSail;
        $data['local'] = $local;
        
        return InvoiceHelper::download($data);
    }
}