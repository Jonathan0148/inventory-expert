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
        Schema::create('audits', function (Blueprint $table) {
            $table->comment('Auditoria de los usuarios');
            $table->increments('id');
            $table->integer('user_id')->unsigned()->comment('ID del usuario que ejecuto alguna acción');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->text('description')->comment('Descripción de la auditoria');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audits');
    }
};
