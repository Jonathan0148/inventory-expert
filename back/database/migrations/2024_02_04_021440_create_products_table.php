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
            $table->integer('brand_id')->unsigned()->nullable()->comment('ID de la marca');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->integer('shelf_id')->unsigned()->nullable()->comment('ID del estante donde se encuentra');
            $table->foreign('shelf_id')->references('id')->on('shelves')->onDelete('cascade');
            $table->integer('column_id')->unsigned()->nullable()->comment('ID de la columna donde se encuentra el producto');
            $table->foreign('column_id')->references('id')->on('columns')->onDelete('cascade');
            $table->integer('row_id')->unsigned()->nullable()->comment('ID de la fila donde se encuentra el producto');
            $table->foreign('row_id')->references('id')->on('rows')->onDelete('cascade');
            $table->string('reference', 100)->unique()->comment('Referencia');
            $table->string('name', 50)->comment('Nombre');
            $table->text('description')->nullable()->comment('Descripción');
            $table->text('applications')->nullable()->comment('Aplicaciones');
            $table->integer('measurement_unit')->default(0)->comment('Unidad de medida del producto: - 0: Si es por cantidad - 1: Si es por libra');
            $table->float('stock')->nullable()->comment('Cantidad de productos');
            $table->float('stock_min')->nullable()->default(5)->comment('Cantidad de productos minimo para alerta');
            $table->float('cost')->nullable()->default(0)->comment('Costo del producto');
            $table->float('price')->comment('Precio del producto');
            $table->boolean('is_original')->nullable()->comment('Si es original o no');
            $table->float('tax')->nullable()->default(0)->comment('Impuesto IVA');
            $table->float('discount')->nullable()->default(0)->comment('Descuento');
            $table->float('price_total')->comment('Precio total a la venta');
            $table->string('status', 255)->nullable()->default('in-stock')->comment('Estado del producto');
            $table->json('images')->nullable()->comment('Imagenes');
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
