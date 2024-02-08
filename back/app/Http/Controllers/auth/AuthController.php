<?php

namespace App\Http\Controllers\auth;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
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
            
            $cookie = cookie('cookie_token', $token, 60 * 24);
            
            $modules = $this->getModules();
            
            return response([
                'success' => true,
                'token' => $token,
                'user' => $user,
                'modules' => $modules,
                'token_type' => 'bearer',
                'expires_in' => 60 * 24,
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
}