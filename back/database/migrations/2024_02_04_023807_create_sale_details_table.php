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
        Schema::create('sale_details', function (Blueprint $table) {
            $table->comment('Detalle de las ventas');
            $table->increments('id');
            $table->integer('sale_id')->unsigned()->comment('ID de la venta');
            $table->foreign('sale_id')->references('id')->on('sales')->onDelete('cascade');
            $table->integer('product_id')->unsigned()->comment('ID del producto');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->float('amount')->comment('Cantidad de producto');
            $table->float('price')->comment('Valor del producto');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_details');
    }
};
