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
        Schema::create('rows', function (Blueprint $table) {
            $table->comment('Filas de las columnas');
            $table->increments('id');
            $table->integer('shelf_id')->unsigned()->comment('ID del estante donde se encuentra');
            $table->foreign('shelf_id')->references('id')->on('shelves')->onDelete('cascade');
            $table->string('name', 40)->comment('Nombre');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rows');
    }
};
