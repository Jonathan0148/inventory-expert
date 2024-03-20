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
                "store_name" => "Supermercado La Familia",
                "slogan" => "¡Calidad y ahorro para tu hogar!",
                "nit" => "900.123.456-7",
                "cell_phone" => "+573001234567",
                "landline" => "+5712345678",
                "email" => "info@superfamilia.com",
                "country" => "Colombia",
                "department" => "Cundinamarca",
                "city" => "Bogotá",
                "address" => "Carrera 12 #34-56",
                "state" => 1
            ]
        ];

        // DB::table('stores')->truncate();

        foreach ($data as $fact){
            Store::create($fact);
        }
    }
}