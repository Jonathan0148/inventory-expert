<?php

namespace App\Helpers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class InvoiceHelper
{
    public static function download($data)
    {
        $dataPdf['logoLocal'] = $data['local']->logo;
        $dataPdf['nameLocal'] = $data['local']->store_name;
        $dataPdf['nitLocal'] = $data['local']->nit;
        $dataPdf['cellphoneLocal'] = $data['local']->cell_phone;
        $dataPdf['departmentLocal'] = $data['local']->department;
        $dataPdf['cityLocal'] = $data['local']->city;
        $dataPdf['directionLocal'] = $data['local']->address;
        $dataPdf['referenceSale'] = $data['sale']->reference;
        $dataPdf['date'] = $data['sale']->created_at->format('Y-m-d H:i:s');
        $fullName = Auth::user()->names.' '.Auth::user()->surnames;
        $dataPdf['seller'] = $fullName;
        $dataPdf['detailSail'] = $data['detailSail'];
        $dataPdf['subtotal'] = $data['sale']->subtotal;
        $dataPdf['tax'] = $data['sale']->tax;
        $dataPdf['total'] = $data['sale']->total;
        $dataPdf['paymentMethod'] = $data['sale']->paymentMethod;
        $reference = $data['sale']->reference;

        $pdf = PDF::loadView('exportsPdf.invoice', [
            'data' => $dataPdf
        ]);
        $contentHeight = $pdf->getDomPDF()->get_canvas()->get_height();
        $height = ($contentHeight-500);

        $pdf->setPaper(array(0, 0, 120, $height), 'portrait');
        
        return $pdf->download("Factura #$reference.pdf");
    }
}
