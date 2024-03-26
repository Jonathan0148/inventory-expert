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
        Schema::create('bails', function (Blueprint $table) {
            $table->comment('Balance de las ventas');
            $table->increments('id');
            $table->integer('sale_id')->unsigned()->comment('ID de la venta');
            $table->foreign('sale_id')->references('id')->on('sales')->onDelete('cascade');
            $table->integer('payment_type_id')->unsigned()->comment('ID del tipo de pago');
            $table->foreign('payment_type_id')->references('id')->on('payment_methods')->onDelete('cascade');
            $table->float('price')->comment('Valor del abono');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_balances');
    }
};
