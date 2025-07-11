<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::resource('appointments', AppointmentController::class);
Route::resource('patients', PatientController::class);

// Rutas adicionales si necesitas APIs
Route::prefix('api')->group(function () {
    Route::get('/appointments/today', [AppointmentController::class, 'today']);
    Route::get('/patients/search', [PatientController::class, 'search']);
});
