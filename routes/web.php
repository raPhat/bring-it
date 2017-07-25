<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/user-management', 'UserController@all')->middleware('auth');
Route::get('/user-management/create', 'UserController@create')->middleware('auth');
Route::get('/user-management/{user}', 'UserController@show')->middleware('auth');
Route::get('/user-management/{user}/edit', 'UserController@edit')->middleware('auth');

Route::get('/shop-management/create/{user}', 'ShopController@createWithUser')->middleware('auth');
