<?php

namespace App\Http\Controllers\accounting;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\accounting\PaymentMethod;
use App\Models\accounting\Sale;
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
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 10;
        $term = $request->get('term');

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $data = Sale::select('sales.*', 'sales.store_name as storeName')
        ->join('sales', 'expenses.store_id', '=', 'sales.id')
        ->where('store_id', Auth::user()->store_id)
        ->where(function ($query) use ($term) {
            $query->orWhere('sales.reference', 'like', "%$term%");
        })->orderBy('sales.id', 'DESC')->paginate($limit);

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
        try {
            $validatedData = $request->validate([
                'store_id' => 'required',
                'description' => 'required',
                'value' => 'required'
            ]);
            
            $data = Sale::create($validatedData);
            
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
        $data = Sale::find($id);
        
        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
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
        try {
            $data->update([
                'store_id' => $request->input('store_id'),
                'description' => $request->input('description'),
                'value' => $request->input('value')
            ]);

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

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }

    /**
     * Genera una referencia aleatoria
     */
    public function getReference()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        $length = 15;

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return ResponseHelper::Get($randomString);
    }

    /**
     * Get payment method all
     */
    public function getPaymentMethods()
    {
        $paymentMethods = PaymentMethod::all();

        return ResponseHelper::Get($paymentMethods);
    } 
}