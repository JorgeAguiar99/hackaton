<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservas extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos
    protected $fillable = [
        'data',
        'alunos_id',
        'livros_id',
        'dataInicio',
        'dataFim',
        'observacao'
    ];

    // remove os campos de tempo
    public $timestamps = false;
}
