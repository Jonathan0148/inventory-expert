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
                "names" => "Vanessa",
                "surnames" => "Bohorquez",
                "type_document" => 1,
                "document" => "1073241045",
                "email" => "vaneb09@hotmail.es",
                'password' => Hash::make('1073241045'.strtolower(substr('Vanessa', 0, 1))),
                'avatar' => "/assets/images/avatars/16.png",
                "state" => 1
            ]
        ];

        // DB::table('users')->truncate();

        foreach ($data as $fact){
            User::create($fact);
        }
    }
}