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
        Schema::create('stores', function (Blueprint $table) {
            $table->comment('Tiendas o locales que tiene el cliente');
            $table->increments('id');
            $table->string('store_name', 100)->comment('Nombre de la tienda');
            $table->text('slogan')->comment('Eslogan de la tienda');
            $table->string('nit', 100)->comment('Nit de la tienda');
            $table->string('cell_phone', 20)->comment('Celular');
            $table->string('landline', 40)->nullable()->comment('Teléfono fijo');
            $table->string('email', 100)->comment('Correo electrónico');
            $table->string('country', 50)->comment('País');
            $table->string('department', 50)->comment('Departamento');
            $table->string('city', 50)->comment('Ciudad');
            $table->string('address', 100)->comment('Dirección');
            $table->integer('state')->default(1)->comment('Estado del local: 0: Si el local esta inactivo 1: Si el local esta activo 2: Si el local esta pendiente de pago');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
