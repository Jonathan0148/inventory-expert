<?php

use App\Http\Controllers\accounting\BailController;
use App\Http\Controllers\accounting\ExpenseController;
use App\Http\Controllers\accounting\SaleController;
use App\Http\Controllers\settings\StoreController;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\contacts\CustomerController;
use App\Http\Controllers\reports\ReportController;
use App\Http\Controllers\contacts\SupplierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\inventory\BrandController;
use App\Http\Controllers\inventory\CategoryController;
use App\Http\Controllers\inventory\ColumnController;
use App\Http\Controllers\inventory\LosseController;
use App\Http\Controllers\inventory\ProductController;
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

Route::controller(StoreController::class)->group(function () {
    Route::get('infoStore', 'infoStore');
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(AuthController::class)->group(function (){
        Route::get('logout', 'logout');
    });

    Route::controller(DashboardController::class)->prefix('dashboard')->group(function (){
        Route::post('getSales', 'getSales');
        Route::post('getCountSales', 'getCountSales');
        Route::get('getCountProducts', 'getCountProducts');
        Route::post('getValueProducts', 'getValueProducts');
        Route::get('getTopProducts', 'getTopProducts');
        Route::post('getPriceProducts', 'getPriceProducts');
        Route::get('getCountUsers', 'getCountUsers');
        Route::get('getRecentSales', 'getRecentSales');
        Route::get('getTopClients', 'getTopClients');
        Route::get('getTopDebtors', 'getTopDebtors');
    });

    Route::prefix('settings')->group(function() {
        Route::controller(StoreController::class)->prefix('stores')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
            Route::get('availableLocals', 'availableLocals');
            Route::get('validateLocal', 'validateLocal');
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

        Route::controller(ProductController::class)->prefix('products')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
            Route::get('getReference', 'getReference');
            Route::get('consultAvailability/{id}', 'consultAvailability');
            Route::post('importExcel', 'importExcel');
            Route::post('searchProduct', 'searchProduct');
        });

        Route::controller(LosseController::class)->prefix('losses')->group(function () {
            Route::get('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
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
            Route::post('getForDocuments', 'getForDocuments');
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

        Route::controller(SaleController::class)->prefix('sales')->group(function () {
            Route::post('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
            Route::get('getReference', 'getReference');
            Route::get('getPaymentMethods', 'getPaymentMethods');
            Route::get('downloadInvoice/{id}', 'downloadInvoice');
        });

        Route::controller(BailController::class)->prefix('bails')->group(function () {
            Route::post('index', 'index');
            Route::post('create', 'create');
            Route::get('show/{id}', 'show');
            Route::post('edit/{id}', 'edit');
            Route::delete('destroy/{id}', 'destroy');
        });
    });

    Route::controller(ReportController::class)->prefix('reports')->group(function (){
        Route::post('closingDayling', 'closingDayling');
    });
});