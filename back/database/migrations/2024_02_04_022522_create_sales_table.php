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
            $table->integer('store_id')->unsigned()->comment('ID de la tienda');
            $table->foreign('store_id')->references('id')->on('stores');
            $table->integer('customer_id')->unsigned()->comment('ID del cliente');
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->integer('reference')->unique()->comment('Referencia de la venta');
            $table->integer('payment_type')->default(0)->comment('Tipo de pago: 0: Efectivo 1: Bancolombia 2: Daviplata 3: Otro');
            $table->integer('state')->default(0)->comment('Estado de la venta: 0: Pagada 1: Pendiente 2: Abonado');
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
