<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\settings\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            [
                "id" => 1,
                "store_id" => 1,
                "role_id" => 1,
                "names" => "Admin",
                "surnames" => "Admin",
                "type_document" => 1,
                "document" => "12345",
                "email" => "admin@gmail.com",
                'password' => Hash::make("12345a"),
                "state" => 0
            ]
        ];

        // DB::table('users')->truncate();

        foreach ($data as $fact){
            User::create($fact);
        }
    }
}