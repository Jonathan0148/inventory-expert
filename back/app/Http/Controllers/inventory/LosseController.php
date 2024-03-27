<?php

namespace App\Http\Controllers\inventory;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\inventory\Losse;
use App\Models\inventory\Product;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class LosseController extends Controller
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

        $data = Losse::select('losses.*', 'stores.store_name as storeName', 'products.name as productName')
        ->join('stores', 'losses.store_id', '=', 'stores.id')
        ->join('products', 'losses.product_id', '=', 'products.id')
        ->where('losses.store_id', Auth::user()->store_id)
        ->where(function ($query) use ($term) {
            $query->where('losses.description', 'like', "%$term%");
            $query->orWhere('products.name', 'like', "%$term%");
        })->orderBy('losses.id', 'DESC')->paginate($limit);

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
                'product_id' => 'required',
                'amount' => 'required',
                'description' => 'nullable'
            ]);
            
            $data = Losse::create($validatedData);

            $product = Product::where('id', $request->input('product_id'))->first();
            $stock = $product->stock - $request->input('amount');
            $status = $this->newStatusProduct($stock, $product->stock_min);
            $product->update(['stock' => $stock, 'status' => $status]);
            
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
        $data = Losse::find($id);
        
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
        $data = Losse::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $data->update([
                'store_id' => $request->input('store_id'),
                'product_id' => $request->input('product_id'),
                'amount' => $request->input('amount'),
                'description' => $request->input('description')
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
        $data = Losse::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $product = Product::where('id', $data->product_id)->first();
        $stock = $product->stock + $data->amount;
        $status = $this->newStatusProduct($stock, $product->stock_min);
        $product->update(['stock' => $stock, 'status' => $status]);

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }

    private function newStatusProduct(Int $stock, Int $minStock): string
    {
        $newStatus = 'in-stock';
        if ($minStock >= $stock) {
            $newStatus = 'low-stock';
        }
        if ($stock == 0) {
            $newStatus = 'out-stock';
        }
        return $newStatus;
    }
}