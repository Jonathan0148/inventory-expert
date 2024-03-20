<?php

namespace App\Http\Controllers\reports;

use App\Helpers\InvoiceHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\accounting\Bail;
use App\Models\accounting\BailOrder;
use App\Models\accounting\Expense;
use App\Models\accounting\Order;
use App\Models\accounting\Sale;
use App\Models\inventory\Product;
use App\Models\Local;
use App\Models\settings\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public $date;
    public $type;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function closingDayling(Request $request)
    {
        $this->date = $request->date;
        $this->type = $request->type;

        $data['sales'] = $this->getReportSales();
        $data['bails'] = $this->getReportBails();
        $data['expenses'] = $this->getReportExpense();
        $data['balance'] = $this->getReportBalance($data);
        $data['buys'] = $this->getValueProducts();

        return ResponseHelper::Get($data);
    }

    public function getReportSales()
    {
        $sales = [];
        $sales['num'] = $this->getSale($this->type, $this->date)->count();
        $sales['valueDay'] = $this->getSale($this->type, $this->date)->where(['status' => 1])->sum('total');
        $sales['cash'] = $this->getSale($this->type, $this->date)->where(['id_payment_method' => 1, 'status' => 1, 'total_bails' => null])->sum('total');
        $sales['bancolombia'] = $this->getSale($this->type, $this->date)->where(['id_payment_method' => 4, 'status' => 1, 'total_bails' => null])->sum('total');
        $sales['nequi'] = $this->getSale($this->type, $this->date)->where(['id_payment_method' => 2, 'status' => 1, 'total_bails' => null])->sum('total');
        $sales['daviplata'] = $this->getSale($this->type, $this->date)->where(['id_payment_method' => 3, 'status' => 1, 'total_bails' => null])->sum('total');

        return $sales;
    }

    public function getReportBails()
    {
        $bails = [];
        $bails['num'] = $this->getBail($this->type, $this->date)->count();
        $bails['valueDayAll'] = $this->getBail($this->type, $this->date)->sum('price');
        $bails['cashAll'] = $this->getBail($this->type, $this->date)->where('id_payment_method', 1)->sum('price');
        $bails['bancolombiaAll'] = $this->getBail($this->type, $this->date)->where('id_payment_method', 4)->sum('price');
        $bails['nequiAll'] = $this->getBail($this->type, $this->date)->where('id_payment_method', 2)->sum('price');
        $bails['daviplataAll'] = $this->getBail($this->type, $this->date)->where('id_payment_method', 3)->sum('price');

        $bails['valueDay'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->sum('price');
        $bails['cash'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('id_payment_method', 1)->sum('price');
        $bails['bancolombia'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('id_payment_method', 4)->sum('price');
        $bails['nequi'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('id_payment_method', 2)->sum('price');
        $bails['daviplata'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('id_payment_method', 3)->sum('price');

        return $bails;
    }

    public function getReportBailsInvoices()
    {
        $bailsInvoices = [];
        $bailsInvoices['num'] = $this->getBailInvoice($this->type, $this->date)->count();
        $bailsInvoices['valueDay'] = $this->getBailInvoice($this->type, $this->date)->sum('price');
        $bailsInvoices['cash'] = $this->getBailInvoice($this->type, $this->date)->where('id_payment_method', 1)->sum('price');
        $bailsInvoices['bancolombia'] = $this->getBailInvoice($this->type, $this->date)->where('id_payment_method', 4)->sum('price');
        $bailsInvoices['nequi'] = $this->getBailInvoice($this->type, $this->date)->where('id_payment_method', 2)->sum('price');
        $bailsInvoices['daviplata'] = $this->getBailInvoice($this->type, $this->date)->where('id_payment_method', 3)->sum('price');

        $bailsInvoices['valueDayAll'] = $this->getBailInvoice($this->type, $this->date)->whereHas('orderNotPaid')->sum('price');
        $bailsInvoices['cashAll'] = $this->getBailInvoice($this->type, $this->date)->whereHas('orderNotPaid')->where('id_payment_method', 1)->sum('price');
        $bailsInvoices['bancolombiaAll'] = $this->getBailInvoice($this->type, $this->date)->whereHas('orderNotPaid')->where('id_payment_method', 4)->sum('price');
        $bailsInvoices['nequiAll'] = $this->getBailInvoice($this->type, $this->date)->whereHas('orderNotPaid')->where('id_payment_method', 2)->sum('price');
        $bailsInvoices['daviplataAll'] = $this->getBailInvoice($this->type, $this->date)->whereHas('orderNotPaid')->where('id_payment_method', 3)->sum('price');

        return $bailsInvoices;
    }

    public function getReportExpense()
    {
        $expenses = [];
        $expenses['num'] = $this->getExpense($this->type, $this->date)->count();
        $expenses['valueDay'] = $this->getExpense($this->type, $this->date)->sum('value');

        return $expenses;
    }

    public function getReportBalance($data)
    {
        $sales = $data['sales'];
        $bails = $data['bails'];
        $expenses = $data['expenses'];
        $balance = [];

        $balance['balanceCash'] = $sales['cash'] + $bails['cashAll'] - $expenses['valueDay'];
        $balance['balanceNequi'] = $sales['nequi'] + $bails['nequiAll'];
        $balance['balanceBancolombia'] = $sales['bancolombia'] + $bails['bancolombiaAll'];
        $balance['balanceDaviplata'] = $sales['daviplata'] + $bails['daviplataAll'];
        $balance['general'] = $balance['balanceCash'] + $balance['balanceNequi'] + $balance['balanceBancolombia'] + $balance['balanceDaviplata'];

        $revenue = $this->getRevenue();
        $balance['revenue'] = $revenue;

        return $balance;
    }

    private function getValueProducts()
    {
        $buys['value'] = $this->getProduct($this->type, $this->date)->sum(DB::raw('cost * stock'));
        $buys['num'] = $this->getProduct($this->type, $this->date)->count();

        return $buys;
    }

    public function getRevenue()
    {
        return $this->getSale($this->type, $this->date)
            ->leftjoin('sales_detail', 'sales.id', '=', 'sales_detail.sale_id')
            ->leftjoin('products', 'sales_detail.product_id', '=', 'products.id')
            ->where('sales.status', 1)
            ->sum(DB::raw('sales_detail.amount * sales_detail.price - sales_detail.amount * products.cost'));
    }

    private function getSale(String $type, $date)
    {
        if ($type == 'month') {
            $rangeDates = $this->getLastDayMonth($date);
            return Sale::whereMonth('sales.date', $rangeDates['month'])->whereYear('sales.date', $rangeDates['year']);
        }
        return Sale::whereDate('sales.date', $date);
    }

    private function getBail(String $type, $date)
    {
        if ($type == 'month') {
            $rangeDates = $this->getLastDayMonth($date);
            return Bail::whereMonth('created_at', $rangeDates['month'])->whereYear('created_at', $rangeDates['year']);
        }
        return Bail::whereDate('created_at', $date);
    }

    private function getExpense(String $type, $date)
    {
        if ($type == 'month') {
            $rangeDates = $this->getLastDayMonth($date);
            return Expense::whereMonth('created_at', $rangeDates['month'])->whereYear('created_at', $rangeDates['year']);
        }
        return Expense::whereDate('created_at', $date);
    }

    private function getProduct(String $type, $date)
    {
        if ($type == 'month') {
            $rangeDates = $this->getLastDayMonth($date);
            return Product::whereMonth('created_at', $rangeDates['month'])->whereYear('created_at', $rangeDates['year']);
        }
        return Product::whereDate('created_at', $date);
    }

    private function getLastDayMonth($date)
    {
        $parseDate = Carbon::parse($date);
        $arr['month'] = $parseDate->format('m');
        $arr['year'] = $parseDate->format('Y');
        return $arr;
    }
}
