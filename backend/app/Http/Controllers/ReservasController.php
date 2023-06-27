<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReservasController extends Controller
{
    public function index()
    {
        // Busca todos os reservas
        $reservas = \App\Models\Reservas::all();

        // Loop para tratamento de dados
        foreach ($reservas as $reserva) {
            // Busca o nome do livro que é uma FK de reserva
            $reserva->livros_nome = \App\Models\Livros::find($reserva->livros_id)->titulo;

            // Busca o nome do aluno que é uma FK de reserva
            $reserva->alunos_nome = \App\Models\Alunos::find($reserva->alunos_id)->nome;
        }

        // Retorna os dados em formato JSON
        return response()->json(["status" => "sucesso", "reserva" => $reservas]);
    }

    public function show($id)
    {
        // Busca o reserva pelo id
        try {
            $reserva = \App\Models\Reservas::find($id);

            // Verifica se o reserva foi encontrado
            empty($reserva) ? throw new \Exception("Reserva não encontrada!") : "";

            // Busca o nome do livro que é uma FK de reserva
            $reserva->livros_nome = \App\Models\Livros::find($reserva->livros_id)->titulo;

            // Busca o nome do aluno que é uma FK de reserva
            $reserva->alunos_nome = \App\Models\Alunos::find($reserva->alunos_id)->nome;

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "reserva" => $reserva]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }


    public function buscar(Request $request)
    {
        $reservas = \App\Models\Reservas::query()
            ->join("alunos", "reservas.alunos_id", "=", "alunos.id")
            ->join("livros", "reservas.livros_id", "=", "livros.id");

        if ($request->has("aluno")) {
            $nomeAluno = $request->input("aluno");
            $reservas->where("alunos.nome", "LIKE", "%" . $nomeAluno . "%");
        }

        if ($request->has("livro")) {
            $tituloLivro = $request->input("livro");
            $reservas->where("livros.titulo", "LIKE", "%" . $tituloLivro . "%");
        }

        if (!$request->has("aluno") && !$request->has("livro")) {
            return response()->json(["status" => "erro", "mensagem" => "Nenhum parâmetro de busca fornecido."]);
        }

        $reservas = $reservas->select("reservas.*", "alunos.nome as nome_aluno", "livros.titulo as titulo_livro")
            ->get();

        // verifica se a busca retornou algum resultado e retorna um erro caso não tenha retornado nada
        if (count($reservas) == 0) {
            return response()->json(["status" => "erro", "mensagem" => "Nenhum resultado encontrado com esses parâmetros."]);
        }

        // remove os dados desnecessários do array
        foreach ($reservas as $reserva) {
            unset($reserva->alunos_id);
            unset($reserva->livros_id);
            unset($reserva->ra);
            unset($reserva->endereco);
            unset($reserva->cidade);
            unset($reserva->uf);
            unset($reserva->telefone);
            unset($reserva->senha);
            unset($reserva->cursos_id);
        }

        // retorna os dados da reserva em formato JSON com o nome do aluno e do livro apenas
        return response()->json(["status" => "sucesso", "reserva" => $reservas]);
    }


    public function store(Request $request)
    {
        try {
            // Valida os dados recebidos
            $request->validate([
                "alunos_id" => "required",
                "livros_id" => "required",
                "dataInicio" => "required",
                "dataFim" => "required"
            ]);

            // Verifica se o reserva já existe no banco de dados pelo aluno_id e livro_id
            $reserva = \App\Models\Reservas::where("alunos_id", $request->alunos_id)->where("livros_id", $request->livros_id)->first();

            if (!empty($reserva)) {
                // Busca o nome do livro que é uma FK de reserva
                $reserva->livros_nome = \App\Models\Livros::find($reserva->livros_id)->titulo;

                // Busca o nome do aluno que é uma FK de reserva
                $reserva->alunos_nome = \App\Models\Alunos::find($reserva->alunos_id)->nome;

                // Retorna um erro caso o reserva já exista
                throw new \Exception("Uma reserva do livro: ($reserva->livros_nome) já existe para o aluno: ($reserva->alunos_nome)!");
            }

            // Cria um novo reserva com os dados recebidos
            $reserva = \App\Models\Reservas::create($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Reserva $reserva->nome inserida com sucesso.", "reserva" => $reserva]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        // Valida os dados recebidos
        try {
            $request->validate([
                "alunos_id" => "required",
                "livros_id" => "required",
                "dataInicio" => "required",
                "dataFim" => "required"
            ]);

            // Busca o reserva pelo id
            $reserva = \App\Models\Reservas::find($id);

            // Verifica se o reserva foi encontrado
            empty($reserva) ? throw new \Exception("A reserva $request->nome não foi encontrada!") : "";

            // Atualiza o reserva com os dados recebidos
            $reserva->update($request->all());

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Reserva $reserva->nome atualizada com sucesso.", "reserva" => $reserva]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        // Busca o reserva pelo id
        try {
            $reserva = \App\Models\Reservas::find($id);

            // Verifica se o reserva foi encontrado
            empty($reserva) ? throw new \Exception("Reserva não encontrado!") : "";

            // Remove o reserva
            $reserva->delete();

            // Retorna os dados em formato JSON
            return response()->json(["status" => "sucesso", "mensagem" => "Reserva $reserva->nome removida com sucesso."]);
        } catch (\Throwable $th) {
            return response()->json(["status" => "erro", "mensagem" => $th->getMessage()]);
        }
    }
}
