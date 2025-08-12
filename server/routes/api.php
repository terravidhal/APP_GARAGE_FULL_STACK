<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehiculeController;
use App\Http\Controllers\Api\ReparationController;
use App\Http\Controllers\Api\TechnicienController;

Route::apiResource('vehicules', VehiculeController::class);
Route::apiResource('reparations', ReparationController::class);
Route::apiResource('techniciens', TechnicienController::class);
