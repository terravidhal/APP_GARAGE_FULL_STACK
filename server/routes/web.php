<?php

use App\Http\Controllers\ReparationController;
use App\Http\Controllers\TechnicienController;
use App\Http\Controllers\VehiculeController;
use Illuminate\Support\Facades\Route;


/*
Route::get('/', function () {
    return view('welcome');
}); */

Route::resource('vehicules', VehiculeController::class);
Route::resource('reparations', ReparationController::class);
Route::resource('techniciens', TechnicienController::class);

/*
Route::get('/', function () {
    return redirect()->route('vehicules.index');
});
*/

Route::get('/garagehome', function () {
    return view('garagehome');
})->name('garagehome');

Route::get('/', function () {
    return redirect()->route('garagehome');
});
