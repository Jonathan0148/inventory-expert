<?php

namespace App\Http\Controllers\reports;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\accounting\Bail;
use App\Models\accounting\Expense;
use App\Models\accounting\Sale;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public $date;
    public $type;

    public function closingDayling(Request $request)
    {
        $this->date = $request->date;
        $this->type = $request->type;

        $data['sales'] = $this->getReportSales();
        $data['bails'] = $this->getReportBails();
        $data['expenses'] = $this->getReportExpense();
        $data['balance'] = $this->getReportBalance($data);

        return ResponseHelper::Get($data);
    }

    private function getReportSales()
    {
        $sales = [];
        $sales['num'] = $this->getSale($this->type, $this->date)->count();
        $sales['valueDay'] = $this->getSale($this->type, $this->date)->where(['status' => 1])->sum('total');
        $sales['cash'] = $this->getSale($this->type, $this->date)->where(['payment_type_id' => 1, 'status' => 1])->sum('total');
        $sales['bancolombia'] = $this->getSale($this->type, $this->date)->where(['payment_type_id' => 4, 'status' => 1])->sum('total');
        $sales['nequi'] = $this->getSale($this->type, $this->date)->where(['payment_type_id' => 2, 'status' => 1])->sum('total');
        $sales['daviplata'] = $this->getSale($this->type, $this->date)->where(['payment_type_id' => 3, 'status' => 1])->sum('total');

        return $sales;
    }

    private function getReportBails()
    {
        $bails = [];
        $bails['num'] = $this->getBail($this->type, $this->date)->count();
        $bails['valueDayAll'] = $this->getBail($this->type, $this->date)->sum('price');
        $bails['cashAll'] = $this->getBail($this->type, $this->date)->where('payment_type_id', 1)->sum('price');
        $bails['bancolombiaAll'] = $this->getBail($this->type, $this->date)->where('payment_type_id', 4)->sum('price');
        $bails['nequiAll'] = $this->getBail($this->type, $this->date)->where('payment_type_id', 2)->sum('price');
        $bails['daviplataAll'] = $this->getBail($this->type, $this->date)->where('payment_type_id', 3)->sum('price');

        $bails['valueDay'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->sum('price');
        $bails['cash'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('payment_type_id', 1)->sum('price');
        $bails['bancolombia'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('payment_type_id', 4)->sum('price');
        $bails['nequi'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('payment_type_id', 2)->sum('price');
        $bails['daviplata'] = $this->getBail($this->type, $this->date)->whereHas('saleNotPaid')->where('payment_type_id', 3)->sum('price');

        return $bails;
    }

    private function getReportExpense()
    {
        $expenses = [];
        $expenses['num'] = $this->getExpense($this->type, $this->date)->count();
        $expenses['valueDay'] = $this->getExpense($this->type, $this->date)->sum('value');

        return $expenses;
    }

    private function getReportBalance($data)
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

    private function getRevenue()
    {
        return $this->getSale($this->type, $this->date)
            ->leftjoin('sale_details', 'sales.id', '=', 'sale_details.sale_id')
            ->leftjoin('products', 'sale_details.product_id', '=', 'products.id')
            ->where('sales.status', 1)
            ->sum(DB::raw('sale_details.amount * sale_details.price - sale_details.amount * products.cost'));
    }
    
    private function getLastDayMonth($date)
    {
        $parseDate = Carbon::parse($date);
        $arr['month'] = $parseDate->format('m');
        $arr['year'] = $parseDate->format('Y');
        return $arr;
    }
}