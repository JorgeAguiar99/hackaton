<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AlunosController extends Controller
{
    public function index()
    {
        // Busca todos os alunos
        $alunos = \App\Models\Alunos::all();

        // Loop para tratamento de dados
        foreach ($alunos as $aluno) {
            // Busca o nome do curso que é uma FK de aluno
            $aluno->cursos_nome = \App\Models\Cursos::find($aluno->cursos_id)->nome;
        }


        // Retorna os dados em formato JSON
        return response()->json(["status" => "sucesso", "aluno" => $alunos]);
    }

    public function show($id)
    {
        // Busca o aluno pelo id
        try {
            $aluno = \App\Models\Alunos::find($id);

            // Verifica se o aluno foi encontrado
            empty($aluno) ? throw new \Exception("Aluno não encontrado!") : "";

            // Busca o nome do curso que é uma FK de aluno
            $aluno->cursos_nome = \App\Models\Cursos::find($aluno->cursos_id)->nome;

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "aluno" => $aluno]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            // Valida os dados recebidos
            $request->validate([
                "ra" => "required",
                "nome" => "required",
                "endereco" => "required",
                "cidade" => "required",
                "uf" => "required",
                "telefone" => "required",
                "cursos_id" => "required"
            ]);

            // Verifica se o aluno já existe no banco de dados pelo nome
            $aluno = \App\Models\Alunos::where("nome", $request->nome)->first();

            // Verifica se o aluno foi encontrado e retorna um erro caso tenha sido
            !empty($aluno) ? throw new \Exception("Um Curso com o nome: $aluno->nome já está cadastrado!") : "";

            // Cria um novo aluno com os dados recebidos
            $aluno = \App\Models\Alunos::create($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Aluno $aluno->nome inserido com sucesso.", "aluno" => $aluno]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        // Valida os dados recebidos
        try {
            $request->validate([
                "ra" => "required",
                "nome" => "required",
                "endereco" => "required",
                "cidade" => "required",
                "uf" => "required",
                "telefone" => "required",
                "cursos_id" => "required"
            ]);

            // Busca o aluno pelo id
            $aluno = \App\Models\Alunos::find($id);

            // Verifica se o aluno foi encontrado
            empty($aluno) ? throw new \Exception("Aluno não encontrado!") : "";

            // Atualiza o aluno com os dados recebidos
            $aluno->update($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Aluno $aluno->nome atualizado com sucesso.", "aluno" => $aluno]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        // Busca o aluno pelo id
        try {
            $aluno = \App\Models\Alunos::find($id);

            // Verifica se o aluno foi encontrado
            empty($aluno) ? throw new \Exception("Aluno não encontrado!") : "";

            // Remove o aluno
            $aluno->delete();

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Aluno $aluno->nome removido com sucesso."]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }
}
