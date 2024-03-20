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
        Schema::create('products_categories', function (Blueprint $table) {
            $table->comment('Relación muchos a muchos de productos y categorias');
            $table->increments('id');
            $table->integer('product_id')->unsigned()->comment('ID del producto');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->integer('category_id')->unsigned()->comment('ID de la categoría');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_categories');
    }
};
