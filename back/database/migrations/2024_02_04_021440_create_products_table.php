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
        Schema::create('products', function (Blueprint $table) {
            $table->comment('Productos del local o tienda');
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda')->default(1);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->integer('category_id')->unsigned()->nullable()->comment('ID de la categoria');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->integer('brand_id')->unsigned()->nullable()->comment('ID de la marca');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->integer('row_id')->unsigned()->nullable()->comment('ID de la fila donde se encuentra el producto');
            $table->foreign('row_id')->references('id')->on('rows')->onDelete('cascade');
            $table->string('reference', 100)->unique()->comment('Referencia');
            $table->string('name', 50)->comment('Nombre');
            $table->string('description', 255)->nullable()->comment('Descripción');
            $table->integer('measurement_unit')->defult(0)->comment('Unidad de medida del producto: - 0: Si es por cantidad - 1: Si es por libra - 2: Si es por kilo - 3: Si es por longitud');
            $table->integer('stock')->nullable()->comment('Cantidad de productos');
            $table->integer('stock_min')->nullable()->defult(5)->comment('Cantidad de productos minimo para alerta');
            $table->float('cost')->nullable()->defult(0)->comment('Costo del producto');
            $table->float('price')->comment('Precio del producto');
            $table->boolean('is_original')->nullable()->comment('Si es original o no');
            $table->float('tax')->nullable()->defult(0)->comment('Impuesto IVA');
            $table->float('discount')->nullable()->defult(0)->comment('Descuento');
            $table->float('price_total')->comment('Precio total a la venta');
            $table->string('image_1', 255)->nullable()->comment('Imagen 1');
            $table->string('image_2', 255)->nullable()->comment('Imagen 2');
            $table->string('image_3', 255)->nullable()->comment('Imagen 3');
            $table->string('barcode', 255)->nullable()->comment('Código de barras');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
