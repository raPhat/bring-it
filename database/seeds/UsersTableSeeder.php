<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'tester',
            'email' => 'tester@mail.com',
            'password' => bcrypt('testtest'),
            'first_name' => 'admin',
            'last_name' => 'tester',
            'role' => 'ADMIN'
        ]);

        factory(App\User::class, 50)->create();
    }
}
