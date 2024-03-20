<?php

namespace App\Helpers;

use Symfony\Component\HttpFoundation\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class InvoiceHelper
{
    public static function download($sale, $detailSail, $local)
    {
        $data['logoLocal'] = $local->logo;
        $data['nameLocal'] = $local->store_name;
        $data['nitLocal'] = $local->nit;
        $data['cellphoneLocal'] = $local->cell_phone;
        $data['departmentLocal'] = $local->department;
        $data['cityLocal'] = $local->city;
        $data['directionLocal'] = $local->address;
        $data['referenceSale'] = $sale->reference;
        $data['date'] = $sale->created_at->format('Y-m-d H:i:s');
        $data['seller'] = Auth::user()->names.' '.Auth::user()->surnames;
        $data['detailSail'] = $detailSail;
        $data['subtotal'] = $sale->subtotal;
        $data['tax'] = $sale->tax;
        $data['total'] = $sale->total;
        $data['paymentMethod'] = $sale->paymentMethod;

        $pdf = PDF::loadView('exportsPdf.invoice', [
            'data' => $data
        ]);
        $pdf->setPaper('b7', 'portrait');
        
        return $pdf->download("Factura #$sale->reference.pdf");
    }

    public static function downloadInvoices($order, $local)
    {
        $data['logoLocal'] = $local->logo;
        $data['nameLocal'] = $local->name;
        $data['nitLocal'] = $local->nit;
        $data['cellphoneLocal'] = $local->cellphone;
        $data['departmentLocal'] = $local->department;
        $data['cityLocal'] = $local->city;
        $data['directionLocal'] = $local->direction;
        $data['nitProvider'] = $order->nitProvider;
        $data['nameProvider'] = $order->nameProvider;
        $data['cellphoneProvider'] = $order->cellphoneProvider;
        $data['departmentProvider'] = $order->departmentProvider;
        $data['cityProvider'] = $order->cityProvider;
        $data['addressProvider'] = $order->addressProvider;
        $data['referenceOrder'] = $order->reference;
        $data['date'] = $order->created_at->format('Y-m-d H:i:s');
        $data['observations'] = $order->observations;
        $data['subtotal'] = $order->subtotal;
        $data['tax'] = $order->tax;
        $data['total'] = $order->total;
        $data['paymentMethod'] = $order->paymentMethod;
        $data['paymentStatus'] = $order->payment_status;

        $pdf = PDF::loadView('exportsPdf.invoiceOrder', [
            'data' => $data
        ]);
        $pdf->setPaper('b7', 'portrait');
        
        return $pdf->download("Factura #$order->reference.pdf");
    }

    public static function downloadClosing($data)
    {
        $pdf = PDF::loadView('exportsPdf.invoiceClosing', [
            'data' => $data
        ]);
        $pdf->setPaper('b7', 'portrait');
        
        return $pdf->download("Reporte cierre.pdf");
    }
}
