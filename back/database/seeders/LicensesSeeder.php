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
                "description" => "Licencia predeterminada con 1 local, 5 roles y 10 usuarios",
                "number_of_stores" => 1,
                "number_of_roles" => 5,
                "number_of_users_active" => 10,
                "number_of_users" => 20
            ]
        ];

        // DB::table('stores')->truncate();

        foreach ($data as $fact){
            License::create($fact);
        }
    }
}