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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('task','Api\TaskController@index');

Route::post('task/store','Api\TaskController@store');

Route::delete('task/delete/{id}','Api\TaskController@destroy');

Route::get('task/edit/{id}','Api\TaskController@edit');

Route::get('task/show/{id}','Api\TaskController@show');

Route::put('task/update/{id}','Api\TaskController@update');
