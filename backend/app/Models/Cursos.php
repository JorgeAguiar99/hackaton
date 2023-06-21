<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cursos extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos
    protected $fillable = [
        'nome',
        'coordenador',
        'duracao'
    ];

    public $timestamps = false;
}
