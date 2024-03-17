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
                "description" => "Licensia predeterminada con 1 local",
                "number_of_premises" => 1,
            ]
        ];

        // DB::table('stores')->truncate();

        foreach ($data as $fact){
            License::create($fact);
        }
    }
}