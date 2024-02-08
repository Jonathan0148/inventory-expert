<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class AuthenticateWithSanctum
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('sanctum')->check()) {
            throw new AuthenticationException(
                'Unauthenticated.', ['sanctum']
            );
        }

        return $next($request);
    }
}