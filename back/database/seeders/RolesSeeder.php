<?php

namespace Database\Seeders;

use App\Models\settings\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
     /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "id" => 1,
                "name" => "Administrador",
                "description" => "Rol encargado de la administración"
            ]
        ];

        // DB::table('roles')->truncate();

        foreach ($data as $fact){
            Role::create($fact);
        }
    }
}
