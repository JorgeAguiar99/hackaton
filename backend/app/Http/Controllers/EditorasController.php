<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EditorasController extends Controller
{
    public function index()
    {
        // Busca todos os editoras
        $editoras = \App\Models\Editoras::all();

        // Retorna os dados em formato JSON
        return response()->json(["status" => "sucesso", "editora" => $editoras]);
    }

    public function show($id)
    {
        // Busca o editora pelo id
        try {
            $editora = \App\Models\Editoras::find($id);

            // Verifica se o editora foi encontrado
            empty($editora) ? throw new \Exception("Editora não encontrada!") : "";

            // Busca o nome do editora que é uma FK de editora
            $editora->cursos_nome = \App\Models\Editoras::find($editora->cursos_id)->nome;

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "editora" => $editora]);
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
                "endereco" => "required",
                "cidade" => "required",
                "uf" => "required",
                "telefone" => "required"
            ]);

            // Verifica se o editora já existe no banco de dados pelo nome
            $editora = \App\Models\Editoras::where("nome", $request->nome)->first();

            // Verifica se o editora foi encontrado e retorna um erro caso tenha sido
            !empty($editora) ? throw new \Exception("Uma editora com o nome: $editora->nome já está cadastrada!") : "";

            // Cria um novo editora com os dados recebidos
            $editora = \App\Models\Editoras::create($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Editora $editora->nome inserida com sucesso.", "editora" => $editora]);
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
                "endereco" => "required",
                "cidade" => "required",
                "uf" => "required",
                "telefone" => "required"
            ]);

            // Busca o editora pelo id
            $editora = \App\Models\Editoras::find($id);

            // Verifica se o editora foi encontrado
            empty($editora) ? throw new \Exception("A editora $request->nome não foi encontrada!") : "";

            // Atualiza o editora com os dados recebidos
            $editora->update($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Editora $editora->nome atualizada com sucesso.", "editora" => $editora]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        // Busca o editora pelo id
        try {
            $editora = \App\Models\Editoras::find($id);

            // Verifica se o editora foi encontrado
            empty($editora) ? throw new \Exception("Editora não encontrado!") : "";

            // Remove o editora
            $editora->delete();

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Editora $editora->nome removida com sucesso."]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }
}
