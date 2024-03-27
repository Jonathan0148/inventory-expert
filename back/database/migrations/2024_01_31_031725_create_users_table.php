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
        Schema::create('users', function (Blueprint $table) {
            $table->comment('Usuarios registrados en el sistema');
            $table->increments('id');
            $table->integer('store_id')->unsigned()->comment('ID de la tienda')->default(1);
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->integer('role_id')->unsigned()->comment('ID del rol');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
            $table->string('names', 50)->comment('Nombres');
            $table->string('surnames', 60)->comment('Apellidos');
            $table->integer('type_document')->comment('Tipo de documento: 0: Si es cédula de ciudadanía 1: Si es cédula de extranjería 2: Si es tarjeta de identidad 3: Si es pasaporte');
            $table->string('document', 30)->unique()->comment('Número de documento');
            $table->string('email', 100)->unique()->comment('Correo electrónico');
            $table->string('password', 255)->comment('Contraseña');
            $table->integer('state')->default(1)->comment('Estado del usuario: 0: Si el usuario esta inactivo 1: Si el usuario esta activo 2: Si la empresa esta pendiente de pago');
            $table->string('avatar', 255)->nullable()->comment('Avatar del usuario');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes()->comment('Fecha de borrado lógico');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
