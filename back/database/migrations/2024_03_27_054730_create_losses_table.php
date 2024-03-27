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
        Schema::create('losses', function (Blueprint $table) {
            $table->comment('Perdidas de los productos');
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda')->default(1);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->integer('product_id')->unsigned()->comment('ID del producto');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->float('amount')->comment('Cantidad de producto');
            $table->text('description')->nullable()->comment('Descripción');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('losses');
    }
};
