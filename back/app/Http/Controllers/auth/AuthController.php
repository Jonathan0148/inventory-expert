<?php

namespace App\Http\Controllers\auth;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\settings\Role;
use App\Models\settings\RolesModule;
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
            $user = Auth::user();
            
            $token = $user->createToken('token')->plainTextToken;
            
            $cookie = cookie('cookie_token', $token, 1440);
            
            return response([
                'success' => true,
                'token' => $token,
                'user' => $user,
                'modules' => $this->getModules(),
                'token_type' => 'bearer',
                'expires_in' => 1440,
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
        $modules = RolesModule::select('modules.id', 'modules.code')
        ->join('modules', 'roles_modules.module_id', '=', 'modules.id')
        ->where(['selected' => '1', 'role_id' => Auth::user()->role_id])
        ->get();

        return $modules;
    }
}