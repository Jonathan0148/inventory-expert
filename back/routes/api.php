<?php

use App\Http\Controllers\settings\StoreController;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\settings\RoleController;
use App\Http\Controllers\settings\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('login', 'login');
});

Route::controller(StoreController::class)->prefix('stores')->group(function () {
    Route::get('index', 'index');
    Route::post('create', 'create');
    Route::get('show/{id}', 'show');
    Route::put('edit/{id}', 'edit');
    Route::delete('destroy/{id}', 'destroy');
});

Route::controller(RoleController::class)->prefix('roles')->group(function () {
    Route::get('index', 'index');
    Route::post('create', 'create');
    Route::get('show/{id}', 'show');
    Route::put('edit/{id}', 'edit');
    Route::delete('destroy/{id}', 'destroy');
});

Route::controller(UserController::class)->prefix('users')->group(function () {
    Route::get('index', 'index');
    Route::post('create', 'create');
    Route::get('show/{id}', 'show');
    Route::put('edit/{id}', 'edit');
    Route::delete('destroy/{id}', 'destroy');
});