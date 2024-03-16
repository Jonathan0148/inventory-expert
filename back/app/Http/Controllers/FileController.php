<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * Class FileController
 * @package App\Http\Controllers
 */
class FileController extends Controller
{
    public function uploadFile(Request $request)
    {
        if ($request->hasFile('avatar')) {
            $archivo = $request->file('avatar');
            $nombreArchivo = $archivo->getClientOriginalName();
            $archivo->storeAs('public/uploads', $nombreArchivo);
            
            return response()->json(['message' => 'Archivo guardado correctamente']);
        }

        return response()->json(['error' => 'No se adjuntó ningún archivo'], 400);
    }
}