<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\settings\Module;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "id" => 1,
                "code" => 11,
                "name" => "Roles",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 2,
                "code" => 12,
                "name" => "Usuarios",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 3,
                "code" => 13,
                "name" => "Distribución del Local",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 4,
                "code" => 14,
                "name" => "Marcas",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 5,
                "code" => 15,
                "name" => "Categorías",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 6,
                "code" => 16,
                "name" => "Productos",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 7,
                "code" => 17,
                "name" => "Ventas",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 8,
                "code" => 18,
                "name" => "Gastos",
                "description" => "Descripción del módulo"
            ],
            [
                "id" => 9,
                "code" => 19,
                "name" => "Proveedores",
                "description" => "Descripción del módulo"
            ],
        ];

        // DB::table('modules')->truncate();

        foreach ($data as $fact){
            Module::create($fact);
        }
    }
}
