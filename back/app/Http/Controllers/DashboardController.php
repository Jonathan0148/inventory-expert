<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\accounting\Order;
use App\Models\accounting\Sale;
use App\Models\accounting\SalesDetail;
use App\Models\audits\AuditOrder;
use App\Models\audits\AuditProduct;
use App\Models\audits\AuditSale;
use App\Models\contacts\Customer;
use App\Models\contacts\Provider;
use App\Models\contacts\Supplier;
use App\Models\inventory\Product;
use App\Models\settings\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
   

    /**
     * to earn an income 
     */
    public function getSales(Request $request)
    {
        $date = $request->input('date');
        $type = $request->input('type');

        $sale = $this->getSale();
        if($date) $sale = $this->getModelWithFilters($date, $sale, $type); 
        $sale = $sale->where('status', 1);

        $data = $sale->sum('total');

        return ResponseHelper::Get($data);
    }


     /**
     * to earn an income 
     */
    public function getActivityProducts(Request $request)
    {
        return 0;
        // $page = $request->input('page') ?? 1;
        // $limit = 10;

        // Paginator::currentPageResolver(function () use ($page) {
        //     return $page;
        // });

        // $data = AuditProduct::with(['user:id,full_name', 'product:id,reference'])->orderBy('created_at','DESC')->paginate($limit);

        // return ResponseHelper::Get($data);
    }

     /**
     * to earn an income 
     */
    public function getActivitySales(Request $request)
    {
        return 0;
        // $page = $request->input('page') ?? 1;
        // $limit = 10;

        // Paginator::currentPageResolver(function () use ($page) {
        //     return $page;
        // });

        // $data = AuditSale::with(['user:id,full_name', 'sale:id,reference','bail:id,price'])->orderBy('created_at', 'DESC')->paginate($limit);

        // return ResponseHelper::Get($data);
    }

    /**
     * to earn an income 
     */
    public function getActivityOrders(Request $request)
    {
        return 0;
        // $page = $request->input('page') ?? 1;
        // $limit = 10;

        // Paginator::currentPageResolver(function () use ($page) {
        //     return $page;
        // });

        // $data = AuditOrder::with(['user:id,full_name', 'order:id,reference','bail:id,price'])->orderBy('created_at', 'DESC')->paginate($limit);

        // return ResponseHelper::Get($data);
    }

    

    /**
     * to earn an income 
     */
    public function getCountSales(Request $request)
    {
        $date = $request->input('date');
        $type = $request->input('type');

        $sale = $this->getSale();
        if($date) $sale = $this->getModelWithFilters($date, $sale, $type); 

        $data = $sale->count();

        return ResponseHelper::Get($data);
    }
     /**
     * to earn an income 
     */
    public function getCountProducts()
    {
        $data = Product::count();

        return ResponseHelper::Get($data);
    }

    /**
        * to earn an income 
    */
    public function getValueProducts(Request $request)
    {
        $date = $request->input('date');
        $type = $request->input('type');

        $products = $this->getProduct();
        if($date) $products = $this->getModelWithFilters($date, $products, $type); 

        $data = $products->sum(DB::raw('cost * stock'));
        
        return ResponseHelper::Get($data);
    }

    /**
     * GET TOP PRODUCTS ON SALES
    */
    public function getTopProducts(Request $request)
    {
        $data = [];
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 5;
        $term = $request->get('term');

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });
        
        $data = Product::with(['categories' => function ($query) { 
            $query->select('categories.id as category_id','categories.name as name_category');
        }])
        ->withSum('sales_detail','amount')  
        ->withSum('sales_detail','price')
        ->orderBy('sales_detail_sum_amount','DESC')
        ->paginate($limit);
        
        return ResponseHelper::Get($data);
    }

    /**
     * to earn an income 
    */
    public function getCountClients(Request $request)
    {
        $date = $request->input('date');
        $type = $request->input('type');

        $customer = $this->getCustomer();
        if($date) $customer = $this->getModelWithFilters($date, $customer, $type); 

        $data = $customer->count();

        return ResponseHelper::Get($data);
    }

    /**
     * to earn an income 
    */
    public function getCountUsers()
    {
        $data = User::count();

        return ResponseHelper::Get($data);
    }


    public function getRecentSales(Request $request)
    {
        $data = [];
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 5;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });
        
        $data = Sale::select('sales.*')
        ->with(['customer' => function ($query) { 
            $query->select('id','full_name', 'type_document','document');
        },'paymentMethod:id,name'])->orderBy('id', 'DESC')->paginate($limit);
        
        return ResponseHelper::Get($data);
    }

    public function getTopClients(Request $request)
    {
        $data = [];
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 5;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });
        
        $data = Customer::select('full_name','id')->whereHas('sales')->withCount('sales')->orderBy('sales_count', 'DESC')->paginate($limit);
        
        return ResponseHelper::Get($data);
    }

    public function getTopDebtors(Request $request)
    {
        $data = [];
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 5;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $data = Customer::select('full_name','id','type_document','document')
        ->whereHas('salesPending')
        ->with(['sales' => function ($query) { 
            $query->where('status', 2);
            $query->whereNotNull('total_bails');
        }])
        ->withCount(['sales' => function ($query) { 
            $query->where('status', 2);
        }])
        ->withSum('sales', (DB::raw('total - sales.total_bails')))
        ->orderBy('sales_sum_total_salestotal_bails','DESC')
        ->paginate($limit);
        
        return ResponseHelper::Get($data);
    }

    
    public function getTopInvoices(Request $request)
    {
        return 0;
        // $data = [];
        // $page = $request->get('page') ? $request->get('page') : 1;
        // $limit = $request->get('limit') ? $request->get('limit') : 5;

        // Paginator::currentPageResolver(function () use ($page) {
        //     return $page;
        // });

        // $data = Supplier::select('full_name','nit','id')
        //         ->whereHas('orders')
        //         ->withCount(['orders' => function ($query) { 
        //             $query->where('payment_status', 2);
        //         }])
        //         ->with(['orders' => function ($query) { 
        //             $query->select('id','payment_status', 'due_date','total_bails','total','id_provider');
        //             $query->where('payment_status', 2);
        //             $query->orderBy('due_date','DESC');
        //         }])
        //         ->withSum('orders',(DB::raw('total - orders.total_bails')))
        //         ->orderBy('orders_sum_total_orderstotal_bails','DESC')
        //         ->paginate($limit);
        
        // return ResponseHelper::Get($data);
    }

    private function getModelWithFilters($date, $model, $type) {
        $rangeDates = $this->getMonthAndYear($date);
        if($type == 'month') return $model->whereMonth('created_at', $rangeDates['month'])->whereYear('created_at', $rangeDates['year']);
        return $model->whereYear('created_at', $rangeDates['year']);
    } 

    private function getMonthAndYear($date) {
        $parseDate = Carbon::parse($date);
        $arr['month'] = $parseDate->format('m');
        $arr['year'] = $parseDate->format('Y');
        return $arr;
    }

    private function getSale() { return Sale::orderBy('created_at','DESC'); } 
    private function getCustomer() { return Customer::orderBy('created_at','DESC'); } 
    private function getProduct() { return Product::orderBy('created_at','DESC'); } 
}
