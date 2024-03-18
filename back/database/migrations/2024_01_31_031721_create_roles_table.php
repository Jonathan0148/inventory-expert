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
        Schema::create('roles', function (Blueprint $table) {
            $table->comment('Roles registrados en el sistema');
            $table->increments('id');
            $table->string('name', 40)->comment('Nombre');
            $table->text('description')->nullable()->comment('Descripción');
            $table->boolean('is_super')->default(false)->comment('Si el rol es super admin');
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
