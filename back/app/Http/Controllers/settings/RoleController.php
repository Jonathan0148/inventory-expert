<?php

namespace App\Http\Controllers\settings;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\settings\Module;
use Illuminate\Pagination\Paginator;
use App\Models\settings\Role;
use App\Models\settings\User;
use Illuminate\Support\Facades\DB;

/**
 * Class RoleController
 * @package App\Http\Controllers
 */
class RoleController extends Controller
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

        $data = Role::where(function ($query) use ($term) {
            $query->where('name', 'like', "%$term%");
            $query->orWhere('description', 'like', "%$term%");
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
                'name' => 'required',
                'description' => 'nullable',
                'modules' => 'required'
            ]);
            $data = Role::create($validatedData);
            $data->modules()->sync(@$request->modules);
            
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
        $role = Role::find($id);

        $modules = Module::select('modules.id', 'modules.name', 'roles_modules.has_admin', 'roles_modules.selected')
        ->join('roles_modules', function($join) use ($id)
        {
            $join->on('modules.id', '=', 'roles_modules.module_id');
            $join->on('role_id', '=', DB::raw("$id"));
        })
        ->get();

        $data['role'] = $role;
        $data['modules'] = $modules;
        
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
        $data = Role::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $data->update([
                'name' => $request->input('name'),
                'description' => $request->input('description')
            ]);

            if($data->modules) $data->modules()->detach();
            $data->modules()->attach(@$request->modules);

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
        $data = Role::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $users = User::where('role_id', $id)->get();

        if (sizeof($users)){
            return ResponseHelper::NoExits('No es posible eliminar el rol ya que tiene usuarios asociados');
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }

     /**
     * Display a listing of the modules.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getModules()
    {
        $data = Module::all();

        return ResponseHelper::Get($data);
    }
}