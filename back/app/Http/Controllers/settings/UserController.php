<?php

namespace App\Http\Controllers\settings;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\License;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use App\Models\settings\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $status = $request->get('status');
        $role = $request->get('role');

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $sql = [];

        if (isset($status)) {
            $sql[] = ['users.state', '=', $status];
        }

        if (isset($role)) {
            $sql[] = ['users.role_id', '=', $role];
        }

        $data = User::whereNotIn('users.id', [Auth::user()->id])
            ->where($sql)
            ->select('users.id', 'users.avatar', DB::raw('concat(users.names, " ", users.surnames) as fullName'),'users.email', 'users.state', 'roles.name as nameRol', 'roles.is_super', 'stores.store_name as nameStore')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->join('stores', 'users.store_id', '=', 'stores.id')
            ->where('store_id', Auth::user()->store_id)
            ->where(function ($query) use ($term) {
                $query->where('users.names', 'like', "%$term%");
                $query->orWhere('users.surnames', 'like', "%$term%");
                $query->orWhere('users.document', 'like', "%$term%");
                $query->orWhere('users.email', 'like', "%$term%");
                $query->orWhere('roles.name', 'like', "%$term%");
            })->orderBy('users.id', 'DESC')
            ->paginate($limit);

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

            $validateLicense = License::first();
            $amountUsers = User::count();

            if ($amountUsers >= $validateLicense->number_of_users){
                return ResponseHelper::NoExits('Solo se permite la creación de '.$validateLicense->number_of_users.' usuarios');
            };
            
            if ($request->input('state') == 1){
                $amountUsersActive = User::where('state', 1)->count();
        
                if ($amountUsersActive >= $validateLicense->number_of_users_active){
                    return ResponseHelper::NoExits('El número máximo de usuarios activos permitidos es '.$validateLicense->number_of_users_active);
                };
            }

            if (User::where('document', $request->input('document'))->first()){
                return ResponseHelper::NoExits('El número de documento ya ha sido registrado');
            }

            if (User::where('email', $request->input('email'))->first()){
                return ResponseHelper::NoExits('El correo electrónico ya ha sido registrado');
            }

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

        if ($request->input('state') == 1){
            $validateLicense = License::first();
            $amountUsersActive = User::whereNot('id', $id)->where('state', 1)->count();
    
            if ($amountUsersActive >= $validateLicense->number_of_users_active){
                return ResponseHelper::NoExits('El número máximo de usuarios activos permitidos es '.$validateLicense->number_of_users_active);
            };
        }

        if (User::whereNot('id', $id)->where('document', $request->input('document'))->first()){
            return ResponseHelper::NoExits('El número de documento ya ha sido registrado');
        }

        if (User::whereNot('id', $id)->where('email', $request->input('email'))->first()){
            return ResponseHelper::NoExits('El correo electrónico ya ha sido registrado');
        }

        try {
            $data->update([
                'role_id' => $request->input('role_id'),
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

    /**
     * Muestra un registro.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUser()
    {
        $userLogin = Auth::user();

        $data = User::select('users.id', 'users.names', 'users.surnames', 'users.avatar', 'roles.name as role',  'roles.is_super')
        ->join('roles', 'users.role_id', '=', 'roles.id')
        ->where('users.id', $userLogin->id)
        ->first();
        
        return ResponseHelper::Get($data);
    }

     /**
     * validate password
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        try {
            $user = User::find($request->id);

            if( !Hash::check($request->password, $user->password) ) return ResponseHelper::Message('La contraseña actual no coindice');
            
            return ResponseHelper::Get($user);
        } catch (\Throwable $th) {
            return ResponseHelper::Error($th, 'La contraseña no pudo ser actualizada');
        }
    }

    /**
    * Change password
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
   public function changePassword(Request $request)
   {
       $data = $request->validate([
           'password' => 'required|confirmed|min:5',
       ]);

       try {
           User::where('id', $request->id)->update(['password' => Hash::make($request->password)]);

           return ResponseHelper::CreateOrUpdate($data, 'Contraseña actualizada correctamente');
       } catch (\Throwable $th) {
           return ResponseHelper::Error($th, 'La contraseña no pudo ser actualizada');
       }
   }
}