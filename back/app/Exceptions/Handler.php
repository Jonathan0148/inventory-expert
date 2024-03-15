<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Function
     */
    public function render($request, \Throwable $exception)
    {
        if ($exception instanceof AuthenticationException) {
            return response()->json(['error' => 'No estas autorizado'], 401);
        }

        if ($exception instanceof NotFoundHttpException) {
            return response()->json(['error' => 'Ruta no encontrada'], 404);
        }

        if ($exception instanceof ModelNotFoundException) {
            return response()->json(['error' => 'Recurso no encontrado'], 404);
        }

        return parent::render($request, $exception);
    }
}
