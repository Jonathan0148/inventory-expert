<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\settings\RolesModule;

class RolesModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "id" => 1,
                "role_id" => 1,
                "module_id" => 1,
            ],
            [
                "id" => 2,
                "role_id" => 1,
                "module_id" => 2,
            ],
            [
                "id" => 3,
                "role_id" => 1,
                "module_id" => 3,
            ],
            [
                "id" => 4,
                "role_id" => 1,
                "module_id" => 4,
            ],
            [
                "id" => 5,
                "role_id" => 1,
                "module_id" => 5,
            ],
            [
                "id" => 6,
                "role_id" => 1,
                "module_id" => 6,
            ],
            [
                "id" => 7,
                "role_id" => 1,
                "module_id" => 7,
            ],
            [
                "id" => 8,
                "role_id" => 1,
                "module_id" => 8,
            ],
            [
                "id" => 9,
                "role_id" => 1,
                "module_id" => 9,
            ]
        ];

        // DB::table('roles_modules')->truncate();

        foreach ($data as $fact){
            RolesModule::create($fact);
        }
    }
}