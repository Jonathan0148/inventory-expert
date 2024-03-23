<?php

namespace App\Http\Controllers\inventory;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\inventory\Brand;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class BrandController extends Controller
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

        $data = Brand::select('brands.*', 'stores.store_name as storeName')
        ->join('stores', 'brands.store_id', '=', 'stores.id')
        ->where('store_id', Auth::user()->store_id)
        ->where(function ($query) use ($term) {
            $query->where('brands.name', 'like', "%$term%");
            $query->orWhere('brands.description', 'like', "%$term%");
        })->orderBy('brands.id', 'DESC')->paginate($limit);

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
                'name' => 'required',
                'description' => 'nullable'
            ]);
            
            $data = Brand::create($validatedData);
            
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
        $data = Brand::find($id);
        
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
        $data = Brand::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $data->update([
                'store_id' => $request->input('store_id'),
                'name' => $request->input('name'),
                'description' => $request->input('description')
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
        $data = Brand::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }
}