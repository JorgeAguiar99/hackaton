<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livros extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos
    protected $fillable = [
        'titulo',
        'subTitulo',
        'isbn',
        'autores_id',
        'editoras_id',
        'local',
        'ano'
    ];

    // Remove o created_at e updated_at
    public $timestamps = false;
}
