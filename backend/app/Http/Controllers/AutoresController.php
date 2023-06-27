<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AutoresController extends Controller
{
    public function index()
    {
        // Busca todos os autores
        $autores = \App\Models\Autores::all();

        // Retorna os dados em formato JSON
        return response()->json(["status" => "sucesso", "autor" => $autores]);
    }

    public function show($id)
    {
        try {
            // Busca o autor pelo id
            $autor = \App\Models\Autores::find($id);

            // Verifica se o autor foi encontrado
            empty($autor) ? throw new \Exception("Autor não encontrado!") : "";

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "autor" => $autor]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try {
            // Valida os dados recebidos
            $request->validate([
                "nome" => "required"
            ]);

            // Verifica se o autor já existe no banco de dados pelo nome
            $autor = \App\Models\Autores::where("nome", $request->nome)->first();

            // Verifica se o autor foi encontrado e retorna um erro caso tenha sido
            !empty($autor) ? throw new \Exception("Um autor com o nome: $autor->nome já está cadastrado!") : "";

            // Cria um novo autor com os dados recebidos
            $autor = \App\Models\Autores::create($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Autor $autor->nome inserido com sucesso.", "autor" => $autor]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Valida os dados recebidos
            $request->validate([
                "nome" => "required"
            ]);

            // Busca o autor pelo id
            $autor = \App\Models\Autores::find($id);

            // Verifica se o autor foi encontrado
            empty($autor) ? throw new \Exception("Autor não encontrado!") : "";

            // Atualiza o autor com os dados recebidos
            $autor->update($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Autor $autor->nome atualizado com sucesso.", "autor" => $autor]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            // Busca o autor pelo id
            $autor = \App\Models\Autores::find($id);

            // Verifica se o autor foi encontrado
            empty($autor) ? throw new \Exception("Autor não encontrado!") : "";

            // Deleta o autor
            $autor->delete();

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Autor $autor->nome deletado com sucesso."]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }
}
