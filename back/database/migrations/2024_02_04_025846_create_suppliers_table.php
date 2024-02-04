<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda');
            $table->foreign('store_id')->references('id')->on('stores');
            $table->string('business_name', 100)->comment('Razón social');
            $table->string('nit', 100)->comment('Nit');
            $table->string('cell_phone', 20)->comment('Celular');
            $table->string('landline', 40)->nullable()->comment('Teléfono fijo');
            $table->string('email', 100)->comment('Coreo electrónico');
            $table->string('country', 50)->comment('País');
            $table->string('department', 50)->comment('Departamento');
            $table->string('city', 50)->comment('Ciudad o municipio');
            $table->string('address', 100)->comment('Dirección');
            $table->integer('state')->default(1)->comment('Estado del proveedor: 0: Si se corta relación con proveedor 1: Si el proveedor esta activo 2: Si el proveedor esta retirado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
