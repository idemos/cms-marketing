<?php

use Illuminate\Http\Request;

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

Route::group(['prefix' => 'auth'], function () {

    Route::post('signup', 'AuthController@signup');
    Route::post('login', 'AuthController@login');
    //Route::post('login', function(){
    //	dd('aaaa');
    //});
  
    //Route::group(['middleware' => 'auth:api'], function() {
        
        Route::get('logout', 'AuthController@logout');
        // Route::get('user', 'AuthController@user');
        Route::resource('user', 'UserController');
    //});
});
