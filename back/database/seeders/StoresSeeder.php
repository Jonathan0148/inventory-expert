<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\settings\Store;

class StoresSeeder extends Seeder
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
                "store_name" => "Minimercado LanaRanja |||",
                "slogan" => "Eslogan de la tienda",
                "nit" => "12345678-9",
                "cell_phone" => "3214501006",
                "landline" => "3214501006",
                "email" => "LanaRanja@gmail.com",
                "country" => "Colombia",
                "department" => "DC",
                "city" => "Bogotá",
                "address" => "Cra 103a #20b-17 Local 1",
                "state" => 1
            ]
        ];

        // DB::table('stores')->truncate();

        foreach ($data as $fact){
            Store::create($fact);
        }
    }
}