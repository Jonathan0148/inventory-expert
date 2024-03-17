<?php

namespace Database\Seeders;

use App\Models\License;
use Illuminate\Database\Seeder;

class LicensesSeeder extends Seeder
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
                "description" => "Licencia predeterminada con 1 local, 3 roles y 5 usuarios",
                "number_of_stores" => 1,
                "number_of_roles" => 3,
                "number_of_users_active" => 5,
                "number_of_users" => 10
            ]
        ];

        // DB::table('stores')->truncate();

        foreach ($data as $fact){
            License::create($fact);
        }
    }
}