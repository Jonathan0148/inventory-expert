<?php

namespace Database\Seeders;

use App\Models\accounting\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodsSeeder extends Seeder
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
                "name" => "Efectivo"
            ],
            [
                "id" => 2,
                "name" => "Nequi",
            ],
            [
                "id" => 3,
                "name" => "Daviplata",
            ],
            [
                "id" =>4,
                "name" => "Bancolombia",
            ],
        ];

        // DB::table('roles')->truncate();

        foreach ($data as $fact){
            PaymentMethod::create($fact);
        }
    }
}
