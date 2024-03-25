<?php

namespace Database\Seeders;

use App\Models\inventory\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
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
                "store_id" => 1,
                "name" => "Fruver",
                "description" => "Categoría para clasificar todos los productos relacionados con frutas y verduras frescas, productos de plaza, frutas y otros similares."
            ],
            [
                "id" => 2,
                "store_id" => 1,
                "name" => "Huevos",
                "description" => "Categoría para clasificar todos los productos relacionados con los huevos y sus derivados."
            ],
            [
                "id" => 3,
                "store_id" => 1,
                "name" => "Otros",
                "description" => "Categoría para clasificar todos los productos que no pertenezcan a las categorías de frutas y verduras frescas (fruver) ni huevos, incluyendo productos como granos, productos de limpieza, cuidado personal y otros similares."
            ]
        ];

        // DB::table('roles')->truncate();

        foreach ($data as $fact){
            Category::create($fact);
        }
    }
}
