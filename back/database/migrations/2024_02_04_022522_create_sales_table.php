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
        Schema::create('sales', function (Blueprint $table) {
            $table->comment('Ventas del local o tienda');
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda')->default(1);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->integer('customer_id')->unsigned()->nullable()->comment('ID del cliente');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->integer('payment_type_id')->unsigned()->comment('ID del tipo de pago');
            $table->foreign('payment_type_id')->references('id')->on('payment_methods')->onDelete('cascade');
            $table->dateTime('date')->comment('Fecha de la venta');
            $table->string('reference', 200)->unique()->comment('Referencia de la venta');
            $table->integer('status')->default(0)->comment('Estado de la venta: 0: Pagada 1: Pendiente 2: Abonado');
            $table->integer('total_bails')->nullable();
            $table->float('subtotal')->comment('Subtotal de la venta');
            $table->float('tax')->default(0)->comment('Impuesto IVA');
            $table->float('total')->comment('Total de la venta');
            $table->text('observations')->nullable()->comment('Observaciones de la venta');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
