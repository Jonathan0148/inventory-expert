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
                "store_name" => "Nómbre",
                "nit" => "Número NIT",
                "cell_phone" => "Celular",
                "landline" => "Teléfono fijo",
                "email" => "Correo electrónico",
                "country" => "Colombia",
                "department" => "Bogotá DC",
                "city" => "Bogotá DC",
                "address" => "Dirección",
                "state" => 1
            ]
        ];

        // DB::table('stores')->truncate();

        foreach ($data as $fact){
            Store::create($fact);
        }
    }
}