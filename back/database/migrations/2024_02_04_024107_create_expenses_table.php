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
        Schema::create('expenses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda');
            $table->foreign('store_id')->references('id')->on('stores');
            $table->string('description', 255)->comment('Descrición del gasto');
            $table->float('value')->comment('Valor del gasto');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};