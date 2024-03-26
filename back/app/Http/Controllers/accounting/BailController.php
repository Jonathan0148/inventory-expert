<?php

namespace App\Http\Controllers\accounting;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\accounting\Bail;
use App\Models\accounting\Sale;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class BailController extends Controller
{
    /**
     * Muestra muchos registros.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = [];
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 10;
        $term = $request->get('term');
        $sale = $request->sale;

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $bails = Bail::select('bails.*')
            ->where('bails.sale_id', $sale)
            ->with(['sale', 'paymentMethod:id,name'])
            ->where(function ($query) use ($term) {
                $query->where('price', 'like', "%$term%");
            })->orderBy('id', 'DESC')->paginate($limit);

        $total_bails = Bail::select('bails.*')->where('bails.sale_id', $sale)->sum('bails.price');

        $sale = Sale::find($sale);

        $data['bails'] = $bails;
        $data['total_bails'] = $total_bails;
        $data['sale'] = $sale;

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
        $validateAmount = $this->validateAmount($request->sale_id, $request->price);
        if ($validateAmount) {
            return ResponseHelper::NoExits('No puedes hacer un abono que supere al total de la venta');
        }
        try {
            $data = Bail::create([
                'sale_id' => $request->input('sale_id'),
                'payment_type_id' => $request->input('payment_type_id'),
                'price' => $request->input('price')
            ]);

            $this->updateBailsSale($data);

            return ResponseHelper::CreateOrUpdate($data, 'Abono creado correctamente');
        } catch (\Throwable $th) {
            return ResponseHelper::Error($th, 'El abono no pudo ser creada');
        }
    }

    private function validateAmount($saleId, $price)
    {
        $data = Sale::where('id', $saleId)->first();
        if (($data->total_bails + $price) > $data->total) {
            return true;
        }
        return false;
    }

    private function updateBailsSale($bail)
    {
        $bails =  Bail::where('sale_id', $bail->sale_id)->sum('price');
        $sale = Sale::find($bail->sale_id);
        if ($bails == $sale->total) $sale->update(['status' => 1]);
        $sale->update(['total_bails' => $bails]);
    }

    /**
     * Elimina un registro.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Bail::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }
}