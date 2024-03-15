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
                "names" => "Jonathan",
                "surnames" => "Bohorquez",
                "type_document" => 1,
                "document" => "1003527670",
                "email" => "bohorquezvillamiljonathan@gmail.com",
                'password' => Hash::make('1003527670'.strtolower(substr('Jonathan', 0, 1))),
                "state" => 1
            ]
        ];

        // DB::table('users')->truncate();

        foreach ($data as $fact){
            User::create($fact);
        }
    }
}