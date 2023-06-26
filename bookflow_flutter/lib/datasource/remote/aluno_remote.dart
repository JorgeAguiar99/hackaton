
import 'package:bookflow_flutter/infra/cliente_http.dart';
import 'package:bookflow_flutter/models/aluno.dart';

class AlunoRemote {
final link = "http://127.0.0.1:8000/alunos";

  Future<List<Aluno>> get() async {
    var dados = await ClienteHttp().getJson(link);
      List<dynamic> lista = dados['aluno'];

    return lista.map((e) => Aluno.fromMap(e)).toList();
  }
}
