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
                "name" => "Super Administrador",
                "description" => "Rol super administrador con todos los permisos",
                "is_super" => true
            ]
        ];

        // DB::table('roles')->truncate();

        foreach ($data as $fact){
            Role::create($fact);
        }
    }
}
