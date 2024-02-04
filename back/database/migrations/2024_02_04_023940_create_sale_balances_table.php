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
        Schema::create('sale_balances', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sale_id')->unsigned()->comment('ID de la venta');
            $table->foreign('sale_id')->references('id')->on('sales');
            $table->float('value')->comment('Valor del abono');
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
