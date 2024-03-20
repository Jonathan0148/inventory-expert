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
        Schema::create('licenses', function (Blueprint $table) {
            $table->comment('Parametrización según licencia del usuario');
            $table->increments('id');
            $table->text('description')->comment('Descripción de la licencia');
            $table->integer('number_of_stores')->comment('Cantidad de locales permitidos');
            $table->integer('number_of_roles')->comment('Cantidad de roles permitidos');
            $table->integer('number_of_users_active')->comment('Cantidad de usuarios activos permitidos');
            $table->integer('number_of_users')->comment('Cantidad de usuarios permitidos');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
