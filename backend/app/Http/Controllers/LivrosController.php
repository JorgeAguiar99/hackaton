<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LivrosController extends Controller
{
    public function index()
    {
        // Busca todos os livros do banco de dados
        $livros = \App\Models\Livros::all();

        // Buscar o nome do autor e da editora de cada livro e adiciona no array
        foreach ($livros as $livro) {
            $livro->autor = \App\Models\Autores::find($livro->autores_id)->nome;
            $livro->editora = \App\Models\Editoras::find($livro->editoras_id)->nome;
        }

        // Retorna os dados em formato JSON
        return response()->json(["status" => "sucesso", "livro" => $livros]);
    }

    public function show($id)
    {
        try {
            // Busca o livro pelo id
            $livro = \App\Models\Livros::find($id);

            // Verifica se o livro foi encontrado
            empty($livro) ? throw new \Exception("Livro não encontrado!") : "";

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "livro" => $livro]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        // Valida os dados recebidos
        try {
            $request->validate([
                "titulo" => "required",
                "subTitulo" => "required",
                "isbn" => "required",
                "autores_id" => "required",
                "editoras_id" => "required",
                "local" => "required",
                "ano" => "required"
            ]);

            // Cria um novo livro com os dados recebidos
            $livro = \App\Models\Livros::create($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Livro $livro->titulo inserido com sucesso.", "livro" => $livro]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        // Valida os dados recebidos
        try {
            $request->validate([
                "titulo" => "required",
                "subTitulo" => "required",
                "isbn" => "required",
                "autores_id" => "required",
                "editoras_id" => "required",
                "local" => "required",
                "ano" => "required"
            ]);

            // Busca o livro pelo id
            $livro = \App\Models\Livros::find($id);

            // Verifica se o livro foi encontrado
            empty($livro) ? throw new \Exception("Livro não encontrado!") : "";

            // Atualiza o livro com os dados recebidos
            $livro->update($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Livro $livro->titulo alterado com sucesso.", "livro" => $livro]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $livro = \App\Models\Livros::find($id);
            empty($livro) ? throw new \Exception("Livro não encontrado!") : "";

            // Deleta o livro
            $livro->delete();

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Livro $livro->titulo deletado com sucesso!", "livro" => $livro]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }
}
