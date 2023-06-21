<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alunos extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos
    protected $fillable = [
        'ra',
        'nome',
        'endereco',
        'cidade',
        'uf',
        'telefone',
        'cursos_id',
        'senha'
    ];

    // Remove o created_at e updated_at
    public $timestamps = false;
}
