<?php

use App\Http\Controllers\accounting\ExpenseController;
use App\Http\Controllers\settings\StoreController;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\contacts\CustomerController;
use App\Http\Controllers\contacts\SupplierController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\inventory\BrandController;
use App\Http\Controllers\inventory\CategoryController;
use App\Http\Controllers\inventory\ColumnController;
use App\Http\Controllers\inventory\RowController;
use App\Http\Controllers\inventory\ShelveController;
use App\Http\Controllers\settings\RoleController;
use App\Http\Controllers\settings\UserController;
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

Route::controller(FileController::class)->group(function (){
    Route::post('upload-file', 'uploadFile');
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(AuthController::class)->group(function (){
        Route::get('logout', 'logout');
    });

    Route::prefix('settings')->group(function() {
        Route::controller(StoreController::class)->prefix('stores')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
            Route::get('availableLocals', 'availableLocals');
        });
        
        Route::controller(RoleController::class)->prefix('roles')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
            Route::get('getModules', 'getModules');
        });
        
        Route::controller(UserController::class)->prefix('users')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
            Route::get('getUser', 'getUser');
            Route::post('validatePassword', 'validatePassword');
            Route::put('changePassword', 'changePassword');
        });
    });

    Route::prefix('inventory')->group(function() {
        Route::controller(CategoryController::class)->prefix('categories')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
        });

        Route::controller(BrandController::class)->prefix('brands')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
        });

        Route::prefix('distribution-local')->group(function (){
            Route::controller(ShelveController::class)->prefix('shelves')->group(function (){
                Route::get('index', 'index');
                Route::post('create', 'create');
                Route::get('show/{id}', 'show');
                Route::post('edit/{id}', 'edit');
                Route::delete('destroy/{id}', 'destroy');
                Route::post('getRowsSelect', 'getRowsSelect');
                Route::post('getColumnsSelect', 'getColumnsSelect');
    
            });
            Route::controller(ColumnController::class)->prefix('columns')->group(function (){
                Route::post('index', 'index');
                Route::post('create', 'create');
                Route::get('show/{id}', 'show');
                Route::post('edit/{id}', 'edit');
                Route::delete('destroy/{id}', 'destroy');
            });
            Route::controller(RowController::class)->prefix('rows')->group(function (){
                Route::post('index', 'index');
                Route::post('create', 'create');
                Route::get('show/{id}', 'show');
                Route::post('edit/{id}', 'edit');
                Route::delete('destroy/{id}', 'destroy');
            });
        });
    });

    Route::prefix('contacts')->group(function() {
        Route::controller(SupplierController::class)->prefix('providers')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
        });

        Route::controller(CustomerController::class)->prefix('customers')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
        });
    });

    Route::prefix('accounting')->group(function() {
        Route::controller(ExpenseController::class)->prefix('expenses')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
        });
    });
});