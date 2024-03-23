<?php

namespace App\Http\Controllers\inventory;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\inventory\Product;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
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
        $category = $request->get('category');
        $brand = $request->get('brand');

        $sql = [];

        if (isset($status)) {
            $sql[] = ['products.status', '=', $status];
        }
        if (isset($brand)) {
            $sql[] = ['products.brand_id', '=', $brand];
        }

        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        $data = Product::where($sql)->select('products.*', 'stores.store_name as storeName', 'brands.name as brand')
        ->join('stores', 'products.store_id', '=', 'stores.id')
        ->leftjoin('brands', 'products.brand_id', '=', 'brands.id')
        ->where('products.store_id', Auth::user()->store_id)
        ->where(function ($query) use ($term) {
            $query->where('products.name', 'like', "%$term%");
            $query->orWhere('products.reference', 'like', "%$term%");
        })
        ->with(['categories' => function ($query) { 
            $query->select('categories.id as category_id','categories.name as name_category');
        }])
        ->where(function ($query) use ($category) {
            if(isset($category)){
                $query->whereHas('categories', function ($query) use ($category) { 
                    if(isset($category)) $query->where('products_categories.category_id', $category);
                });
            }
        })
        ->orderBy('products.id', 'DESC')->paginate($limit);

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
            $price = $request->input('price');
            $discount = $request->input('discount');
            $tax = $request->input('tax');
            $price_total = $price - ($price * $discount / 100) + ($price * $tax / 100);

            $product = Product::where('reference', $request->input('reference'))->first();

            if ($product) {
                return ResponseHelper::NoExits('Ya existe un producto con esta referencia');
            }

            $data = Product::create([
                'store_id' => $request->input('store_id'),
                'brand_id' => $request->input('brand_id'),
                'shelf_id' => $request->input('shelf_id'),
                'column_id' => $request->input('column_id'),
                'row_id' => $request->input('row_id'),
                'reference' => $request->input('reference'),
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'applications' => $request->input('applications'),
                'measurement_unit' => $request->input('measurement_unit'),
                'stock' => $request->input('stock'),
                'stock_min' => $request->input('stock_min'),
                'cost' => $request->input('cost'),
                'price'=> $price,
                'is_original' => $request->input('is_original'),
                'tax' => $tax,
                'discount' => $discount,
                'price_total' => $price_total,
                'status' => $request->input('status'),
                'images' => $request->input('images'),
                'barcode' => $request->input('barcode')
            ]);
            
            $data->categories()->sync($request->categories);
            
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
        $data = Product::select('products.*','brands.name as brand', 'shelves.name as section', 'columns.name as column', 'rows.name as row')
        ->leftjoin('brands', 'products.brand_id', '=', 'brands.id')
        ->leftjoin('shelves', 'products.shelf_id', '=', 'shelves.id')
        ->leftjoin('columns', 'products.column_id', '=', 'columns.id')
        ->leftjoin('rows', 'products.row_id', '=', 'rows.id')
        ->with(['categories' => function ($query) { 
            $query->select('categories.id as category_id','categories.name as name_category');
        }])
        // ->withSum('sales_detail','amount')
        ->find($id);
        
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
        $data = Product::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $price = $request->input('price');
            $discount = $request->input('discount');
            $tax = $request->input('tax');
            $price_total = $price - ($price * $discount / 100) + ($price * $tax / 100);
            
            $data->update([
                'store_id' => $request->input('store_id'),
                'brand_id' => $request->input('brand_id'),
                'shelf_id' => $request->input('shelf_id'),
                'column_id' => $request->input('column_id'),
                'row_id' => $request->input('row_id'),
                'reference' => $request->input('reference'),
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'applications' => $request->input('applications'),
                'measurement_unit' => $request->input('measurement_unit'),
                'stock' => $request->input('stock'),
                'stock_min' => $request->input('stock_min'),
                'cost' => $request->input('cost'),
                'price' => $price,
                'is_original' => $request->input('is_original'),
                'tax' => $tax,
                'discount' => $discount,
                'price_total' => $price_total,
                'status' => $request->input('status'),
                'images' => $request->input('images'),
                'barcode' => $request->input('barcode')
            ]);

            if($data->categories) $data->categories()->detach();
            $data->categories()->attach($request->input('categories'));

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
        $data = Product::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }

    /**
     * Genera una referencia aleatoria
     */
    public function getReference()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        $length = 15;

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return ResponseHelper::Get($randomString);
    }
}