<?php

namespace App\Http\Controllers\settings;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use App\Models\settings\User;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
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

        $data = User::whereNot('users.id', Auth::user()->id)->where(function ($query) use ($term) {
            $query->where('names', 'like', "%$term%");
            $query->orWhere('surnames', 'like', "%$term%");
            $query->orWhere('email', 'like', "%$term%");
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
                'store_id' => 'required',
                'role_id' => 'required',
                'names' => 'required',
                'surnames' => 'nullable',
                'type_document' => 'required',
                'document' => 'required',
                'email' => 'required|email',
                'state' => 'required',
                'avatar' => 'nullable'
            ]);
            
            $data = User::create([
                'store_id' => $validatedData['store_id'],
                'role_id' => $validatedData['role_id'],
                'names' => $validatedData['names'],
                'surnames' => $validatedData['surnames'],
                'type_document' => $validatedData['type_document'],
                'document' => $validatedData['document'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['document'].strtolower(substr($validatedData['names'], 0, 1))),
                'state' => $validatedData['state'],
                'avatar' => $validatedData['avatar']
            ]);
            
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
        $data = User::find($id);

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
        $data = User::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $data->update([
                'role_id ' => $request->input('role_id '),
                'names' => $request->input('names'),
                'surnames' => $request->input('surnames'),
                'state' => $request->input('state'),
                'avatar' => $request->input('avatar')
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
        $data = User::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }
}