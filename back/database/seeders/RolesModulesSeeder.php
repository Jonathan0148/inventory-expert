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
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 2,
                "role_id" => 1,
                "module_id" => 2,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 3,
                "role_id" => 1,
                "module_id" => 3,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 4,
                "role_id" => 1,
                "module_id" => 4,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 5,
                "role_id" => 1,
                "module_id" => 5,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 6,
                "role_id" => 1,
                "module_id" => 6,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 7,
                "role_id" => 1,
                "module_id" => 7,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 8,
                "role_id" => 1,
                "module_id" => 8,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 9,
                "role_id" => 1,
                "module_id" => 9,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 10,
                "role_id" => 1,
                "module_id" => 10,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 11,
                "role_id" => 1,
                "module_id" => 11,
                "has_admin" => true,
                "selected" => true
            ],
            [
                "id" => 12,
                "role_id" => 1,
                "module_id" => 12,
                "has_admin" => true,
                "selected" => true
            ]
        ];

        // DB::table('roles_modules')->truncate();

        foreach ($data as $fact){
            RolesModule::create($fact);
        }
    }
}