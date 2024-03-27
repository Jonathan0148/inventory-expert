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
        } elseif ($request->hasFile('file')) {
            $archivo = $request->file('file');
        } else {
            return response()->json(['error' => 'No se adjuntó ningún archivo'], 400);
        }

        $extension = $archivo->getClientOriginalExtension();
        $nuevoNombre = md5(uniqid() . time()) . '.' . $extension;
        $archivo->storeAs('uploads', $nuevoNombre);
        $url = url('/storage/uploads/' . $nuevoNombre);

        return response()->json(['url' => $url, 'message' => 'Archivo guardado correctamente']);
    }
}