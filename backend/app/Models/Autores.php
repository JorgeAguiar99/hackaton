<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autores extends Model
{
    use HasFactory;

    // Campos que podem ser preenchidos
    protected $fillable = [
        'nome',
        'telefone',
        'endereco',
        'cidade',
        'uf',
        'autores_id',
        'editoras_id'
    ];

    // Remove o created_at e updated_at
    public $timestamps = false;
}
