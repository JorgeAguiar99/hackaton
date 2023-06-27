<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alunos;

class LoginController extends Controller
{
    public function show($ra)
    {
        // busca um aluno de acordo com o ra e retorna o objeto aluno correspondente
        $aluno = Alunos::where('ra', $ra)->first();

        // se o aluno não existir, retorna uma mensagem de erro
        if (empty($aluno)) {
            return response()->json(['status' => 'erro', 'mensagem' => 'Aluno não encontrado'], 401);
        }
        // se o aluno existir, retorna o objeto aluno
        return response()->json(['status' => 'sucesso', 'mensagem' => 'Aluno encontrado']);
    }
}
