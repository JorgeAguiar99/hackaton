
import 'package:bookflow_flutter/infra/cliente_http.dart';
import 'package:bookflow_flutter/models/livro.dart';

class LivroRemote {
final link = "http://127.0.0.1:8000/livros";

  Future<List<Livro>> get() async {
    var dados = await ClienteHttp().getJson(link);
      List<dynamic> lista = dados['livro'];

    return lista.map((e) => Livro.fromMap(e)).toList();
  }
}
