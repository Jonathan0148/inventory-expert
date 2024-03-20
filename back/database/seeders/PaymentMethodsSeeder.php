<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $methods = [
            [
                "id" => 1,
                "name" => "Efectivo"
            ],
            [
                "id" => 2,
                "name" => "Nequi"
            ],
            [
                "id" => 3,
                "name" => "Daviplata"
            ],
            [
                "id" => 4,
                "name" => "Bancolombia"
            ],
        ];


        foreach ($methods as $method){
            PaymentMethod::create($method);
        }
    }
}
