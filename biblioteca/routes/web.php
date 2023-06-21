<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// criar rotas para controller AlunosController

Route::resource('alunos', 'App\Http\Controllers\AlunosController');
Route::resource('livros', 'App\Http\Controllers\LivrosController');
Route::resource('autores', 'App\Http\Controllers\AutoresController');
Route::resource('cursos', 'App\Http\Controllers\CursosController');
Route::resource('editoras', 'App\Http\Controllers\EditorasController');
Route::get('reservas/buscar', 'App\Http\Controllers\ReservasController@buscar');
Route::resource('reservas', 'App\Http\Controllers\ReservasController');

