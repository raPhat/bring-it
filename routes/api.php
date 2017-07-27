<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'LoginController@loginByAPI');
Route::post('/register', 'RegisterController@registerByAPI');

Route::middleware(['auth:api'])->group(function () {
    // Users
    Route::get('/users/me', 'UserController@me');
    Route::get('/users', 'UserController@index');
    Route::post('/users', 'UserController@store');
    Route::patch('/users/{user}', 'UserController@update');
    Route::delete('/users/{user}', 'UserController@destroy');

    // Shops
    Route::get('/shops', 'ShopController@index');
    Route::post('/shops', 'ShopController@store');
    Route::patch('/shops/{shop}', 'ShopController@update');
    Route::delete('/shops/{shop}', 'ShopController@destroy');

});
Route::post('/images', 'ImageController@store');
