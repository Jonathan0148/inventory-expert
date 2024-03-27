<?php

namespace App\Http\Controllers\settings;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\License;
use Illuminate\Pagination\Paginator;
use App\Models\settings\Store;

/**
 * Class StoreController
 * @package App\Http\Controllers
 */
class StoreController extends Controller
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

        $data = Store::where(function ($query) use ($term) {
            $query->where('store_name', 'like', "%$term%");
            $query->orWhere('nit', 'like', "%$term%");
            $query->orWhere('cell_phone', 'like', "%$term%");
            $query->orWhere('landline', 'like', "%$term%");
            $query->orWhere('email', 'like', "%$term%");
            $query->orWhere('country', 'like', "%$term%");
            $query->orWhere('department', 'like', "%$term%");
            $query->orWhere('city', 'like', "%$term%");
            $query->orWhere('address', 'like', "%$term%");
        })->orderBy('id', 'DESC')->paginate($limit);

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
                'store_name' => 'required',
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

            $validateLicense = License::first();
            $amountLocals = Store::where('state', 1)->count();

            if ($amountLocals >= $validateLicense->number_of_stores){
                switch ($validateLicense->number_of_stores) {
                    case 1:
                        return ResponseHelper::NoExits('Solo se permite la creación de 1 local');
                        break;
                    default:
                        return ResponseHelper::NoExits('Solo se permite la creación de '.$validateLicense->number_of_stores.' locales');
                        break;
                }
            };

            $data = Store::create($validatedData);
            
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
        $data = Store::find($id);

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
        $data = Store::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        if ($request->input('state') == 0 || $request->input('state') == 2){
            $amountLocals = Store::where('state', 1)->count();
            if ($amountLocals <= 1){
                return ResponseHelper::NoExits('Es necesario que al menos un local permanezca activo para poder acceder al sistema correctamente. Por favor, asegúrese de dejar al menos un local activo antes de continuar');
            }
        }

        try {
            $data->update([
                'store_name' => $request->input('store_name'),
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
        $data = Store::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        // $data->delete();

        return ResponseHelper::NoExits('No es posible eliminar locales en este momento');
    }

    /**
     * Muestra muchos registros.
     *
     * @return \Illuminate\Http\Response
     */
    public function availableLocals(Request $request)
    {
        $data = [];
        $page = $request->get('page') ? $request->get('page') : 1;
        $limit = $request->get('limit') ? $request->get('limit') : 10;
        $term = $request->get('term');

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $data = Store::where('state', 1)->where(function ($query) use ($term) {
            $query->where('store_name', 'like', "%$term%");
            $query->orWhere('nit', 'like', "%$term%");
            $query->orWhere('cell_phone', 'like', "%$term%");
            $query->orWhere('landline', 'like', "%$term%");
            $query->orWhere('email', 'like', "%$term%");
            $query->orWhere('country', 'like', "%$term%");
            $query->orWhere('department', 'like', "%$term%");
            $query->orWhere('city', 'like', "%$term%");
            $query->orWhere('address', 'like', "%$term%");
        })->orderBy('id', 'DESC')->paginate($limit);

        return ResponseHelper::Get($data);
    }

    /**
     * Muestra muchos registros.
     */
    public function validateLocal()
    {
        $validateLicense = License::first();

        if ($validateLicense) $validateLicense = $validateLicense->number_of_stores;

        return ResponseHelper::Get($validateLicense);
    }

    public function infoStore()
    {
        $data = Store::first();
        
        return ResponseHelper::Get($data);
    }
}