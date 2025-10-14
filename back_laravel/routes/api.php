<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::resource('usuarios', UserController::class);

Route::post('ingresar', [AuthController::class, 'ingresar']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('salir', [AuthController::class, "salir"]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
