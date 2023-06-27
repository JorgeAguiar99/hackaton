<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CursosController extends Controller
{
    public function index()
    {
        // Busca todos os cursos
        $cursos = \App\Models\Cursos::all();

        // Retorna os dados em formato JSON
        return response()->json(["status" => "sucesso", "curso" => $cursos]);
    }

    public function show($id)
    {
        // Busca o curso pelo id
        try {
            $curso = \App\Models\Cursos::find($id);

            // Verifica se o curso foi encontrado
            empty($curso) ? throw new \Exception("Curso não encontrado!") : "";

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "curso" => $curso]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            // Valida os dados recebidos
            $request->validate([
                "nome" => "required",
                "coordenador" => "required",
                "duracao" => "required"
            ]);

            // Verifica se o curso já existe no banco de dados pelo nome
            $curso = \App\Models\Cursos::where("nome", $request->nome)->first();

            // Verifica se o curso foi encontrado e retorna um erro caso tenha sido
            !empty($curso) ? throw new \Exception("Um Curso com o nome: $curso->nome já está cadastrado!") : "";

            // Cria um novo curso com os dados recebidos
            $curso = \App\Models\Cursos::create($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Curso $curso->nome inserido com sucesso.", "curso" => $curso]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        // Valida os dados recebidos
        try {
            $request->validate([
                "nome" => "required",
                "coordenador" => "required",
                "duracao" => "required"
            ]);

            // Busca o curso pelo id
            $curso = \App\Models\Cursos::find($id);

            // Verifica se o curso foi encontrado
            empty($curso) ? throw new \Exception("O Curso $request->nome não foi encontrado!") : "";

            // Atualiza o curso com os dados recebidos
            $curso->update($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Curso $curso->nome atualizado com sucesso.", "curso" => $curso]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        // Busca o curso pelo id
        try {
            $curso = \App\Models\Cursos::find($id);

            // Verifica se o curso foi encontrado
            empty($curso) ? throw new \Exception("Curso não encontrado!") : "";

            // Remove o curso
            $curso->delete();

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Curso $curso->nome removido com sucesso."]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }
}
