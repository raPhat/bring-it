<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'username' => $faker->userName,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'birth_date' => $faker->date,
        'phone' => $faker->tollFreePhoneNumber,
        'critizen_id' => $faker->phoneNumber,
        'role' => $faker->randomElement($array = array ('MEMBER','BUYER','SHIPPER','SELLER','ADMIN')),
        'remember_token' => str_random(10),
    ];
});
