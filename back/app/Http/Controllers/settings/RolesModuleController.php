<?php

namespace App\Http\Controllers;

use App\RolesModule;
use Illuminate\Http\Request;

/**
 * Class RolesModuleController
 * @package App\Http\Controllers
 */
class RolesModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rolesModules = RolesModule::paginate();

        return view('roles-module.index', compact('rolesModules'))
            ->with('i', (request()->input('page', 1) - 1) * $rolesModules->perPage());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $rolesModule = new RolesModule();
        return view('roles-module.create', compact('rolesModule'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(RolesModule::$rules);

        $rolesModule = RolesModule::create($request->all());

        return redirect()->route('roles-modules.index')
            ->with('success', 'RolesModule created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rolesModule = RolesModule::find($id);

        return view('roles-module.show', compact('rolesModule'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $rolesModule = RolesModule::find($id);

        return view('roles-module.edit', compact('rolesModule'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  RolesModule $rolesModule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RolesModule $rolesModule)
    {
        request()->validate(RolesModule::$rules);

        $rolesModule->update($request->all());

        return redirect()->route('roles-modules.index')
            ->with('success', 'RolesModule updated successfully');
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $rolesModule = RolesModule::find($id)->delete();

        return redirect()->route('roles-modules.index')
            ->with('success', 'RolesModule deleted successfully');
    }
}
