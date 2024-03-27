<?php

namespace App\Http\Controllers\contacts;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Models\accounting\Sale;
use App\Models\contacts\Customer;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
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

        $data = Customer::select('customers.*', 'stores.store_name as storeName')
        ->join('stores', 'customers.store_id', '=', 'stores.id')
        ->where('store_id', Auth::user()->store_id)
        ->where(function ($query) use ($term) {
            $query->where('customers.full_name', 'like', "%$term%");
            $query->orWhere('customers.type_document', 'like', "%$term%");
            $query->orWhere('customers.document', 'like', "%$term%");
            $query->orWhere('customers.cell_phone', 'like', "%$term%");
            $query->orWhere('customers.email', 'like', "%$term%");
        })->orderBy('customers.id', 'DESC')->paginate($limit);

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
                'full_name' => 'nullable',
                'type_document' => 'required',
                'document' => 'required',
                'cell_phone' => 'nullable',
                'email' => 'required',
                'state' => 'required'
            ]);
            
            $data = Customer::create($validatedData);
            
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
        $data = Customer::find($id);
        
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
        $data = Customer::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }
        try {
            $data->update([
                'store_id' => $request->input('store_id'),
                'full_name' => $request->input('full_name'),
                'type_document' => $request->input('type_document'),
                'document' => $request->input('document'),
                'cell_phone' => $request->input('cell_phone'),
                'email' => $request->input('email'),
                'state' => $request->input('state')
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
        $data = Customer::find($id);

        if (!$data) {
            return ResponseHelper::NoExits('No existe información con el id '.  $id);
        }

        $sale = Sale::where('customer_id', $id)->first();
        
        if ($sale) {
            return ResponseHelper::NoExits('No es posible eliminar al cliente debido a que está asociado con ventas existentes');
        }

        $data->delete();

        return ResponseHelper::Delete('Información eliminada correctamente');
    }

    public function getForDocuments(Request $request)
    {
        $document = @$request->document;
        $type_document = @$request->type_document;
        
        $data = Customer::select('full_name','type_document','document','cell_phone','id as customer_id')
        ->where(['document' => $document, 'type_document' => $type_document])
        ->first();
        
        if($data) $data['client_exists'] = true;

        return ResponseHelper::Get($data);
    }
}