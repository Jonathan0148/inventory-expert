<?php

namespace App\Http\Controllers\auth;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\settings\RolesModule;
use App\Models\settings\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    /**
     * Inicia una nueva sesión con token.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);
        
        if(Auth::attempt($credentials)){
            $userLog = Auth::user();

            $user = User::select('users.*', 'stores.state as stateStore')
            ->join('stores', 'users.store_id', '=', 'stores.id')
            ->where('users.id', $userLog->id)
            ->first();

            if($user->state == 0){
                return ResponseHelper::Unauthorized('Usuario inactivo');
            }elseif($user->state == 2){
                return ResponseHelper::Unauthorized('En espera de pago');
            }elseif($user->stateStore == 0){
                return ResponseHelper::Unauthorized('Local inactivo');
            }elseif($user->stateStore == 2){
                return ResponseHelper::Unauthorized('Local en espera de pago');
            }
            
            $token = $user->createToken('token')->plainTextToken;
            
            $cookie = cookie('cookie_token', $token, 360);
            
            return response([
                'success' => true,
                'token' => $token,
                'user' => $user,
                'modules' => $this->getModules(),
                'token_type' => 'bearer',
                'expires_in' => 360,
                'date' => Carbon::now()
            ], Response::HTTP_OK)->withoutCookie($cookie);
        }

        return ResponseHelper::Unauthorized('Credenciales incorrectas');
    }

    /**
     * Cierra la sesión.
     */
    public function logout()
    {
        $cookie = Cookie::forget('cookie_token');

        return response(Response::HTTP_OK)->withCookie($cookie);
    }

    /**
     * Trae los modulos del rol
     */
    public function getModules()
    {
        $modules = RolesModule::select('modules.id', 'modules.code', 'roles_modules.has_admin')
        ->join('modules', 'roles_modules.module_id', '=', 'modules.id')
        ->where(['selected' => '1', 'role_id' => Auth::user()->role_id])
        ->get();

        return $modules;
    }
}