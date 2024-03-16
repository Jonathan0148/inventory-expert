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
        Schema::create('roles_modules', function (Blueprint $table) {
            $table->comment('Relación muchos a muchos con roles y módulos');
            $table->increments('id');
            $table->integer('role_id')->unsigned()->comment('ID del rol');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->integer('module_id')->unsigned()->comment('ID del modulo');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->boolean('has_admin')->nullable()->comment('Si el módulo seleccionado tiene permiso para administrar');
            $table->boolean('selected')->comment('Si el rol tiene permiso para el módulo');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles_modules');
    }
};
