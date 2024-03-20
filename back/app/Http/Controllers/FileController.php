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
            $nombreOriginal = $archivo->getClientOriginalName();
            $extension = $archivo->getClientOriginalExtension();

            $nuevoNombre = md5(uniqid() . time()) . '.' . $extension;

            $archivo->storeAs('public/uploads', $nuevoNombre);

            $url = url('/storage/uploads/' . $nuevoNombre);
            
            return response()->json(['url' => $url, 'message' => 'Archivo guardado correctamente']);
        }else if ($request->hasFile('file')){
            $archivo = $request->file('file');
            $nombreOriginal = $archivo->getClientOriginalName();
            $extension = $archivo->getClientOriginalExtension();

            $nuevoNombre = md5(uniqid() . time()) . '.' . $extension;

            $archivo->storeAs('public/uploads', $nuevoNombre);

            $url = url('/storage/uploads/' . $nuevoNombre);
            
            return response()->json(['url' => $url, 'message' => 'Archivo guardado correctamente']);
        }

        return response()->json(['error' => 'No se adjuntó ningún archivo'], 400);
    }
}