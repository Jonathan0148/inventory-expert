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
        Schema::create('customers', function (Blueprint $table) {
            $table->comment('Clientes del local o tienda');
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda')->default(1);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->string('full_name', 100)->comment('Nombre completo');
            $table->integer('type_document')->nullable()->comment('Tipo de documento: 0: Si es cédula de ciudadanía 1: Si es cédula de extranjería 2: Si es tarjeta de identidad 3: Si es pasaporte');
            $table->string('document', 30)->nullable()->unique()->comment('Número de documento');
            $table->string('cell_phone', 20)->nullable()->comment('Número de celular');
            $table->string('email', 100)->nullable()->comment('Número de celular');
            $table->integer('state')->default(1)->comment('Estado del cliente: 0: Si el cliente esta inactivo 1: Si el cliente esta activo 2: Si el cliente esta pendiente');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
