<?php

namespace App\Http\Controllers\contacts;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\contacts\Supplier;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
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

        $data = Supplier::select('suppliers.*', 'stores.store_name as storeName')
        ->join('stores', 'suppliers.store_id', '=', 'stores.id')
        ->where('store_id', Auth::user()->store_id)
        ->where(function ($query) use ($term) {
            $query->where('suppliers.business_name', 'like', "%$term%");
            $query->orWhere('suppliers.nit', 'like', "%$term%");
            $query->orWhere('suppliers.cell_phone', 'like', "%$term%");
            $query->orWhere('suppliers.email', 'like', "%$term%");
        })->orderBy('suppliers.id', 'DESC')->paginate($limit);

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
                'business_name' => 'nullable',
                'nit' => 'required',
                'cell_phone' => 'required',
                'landline' => 'nullable',
                'email' => 'required',
                'country' => 'required',
                'department' => 'required',
                'city' => 'required',
                'address' => 'required',
                'state' => 'required'
            ]);
            
            $data = Supplier::create($validatedData);
            
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
        $data = Supplier::find($id);
        
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
        $data = Supplier::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $data->update([
                'store_id' => $request->input('store_id'),
                'business_name' => $request->input('business_name'),
                'nit' => $request->input('nit'),
                'cell_phone' => $request->input('cell_phone'),
                'landline' => $request->input('landline'),
                'email' => $request->input('email'),
                'country' => $request->input('country'),
                'department' => $request->input('department'),
                'city' => $request->input('city'),
                'address' => $request->input('address'),
                'state' => $request->input('state')
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
        $data = Supplier::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }
}