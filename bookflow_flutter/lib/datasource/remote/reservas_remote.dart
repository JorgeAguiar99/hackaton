
import 'package:bookflow_flutter/infra/cliente_http.dart';
import 'package:bookflow_flutter/models/reservas.dart';

class ReservasRemote {
  final link = "http://127.0.0.1:8000/reservas";

  Future<List<Reservas>> get(int alunos_id) async {
    var dados = await ClienteHttp().getJson(link);
    List<dynamic> lista = dados['reserva'];

    List<Reservas> reservas = lista
        .map((e) => Reservas.fromMap(e))
        .where((reserva) => reserva.alunos_id == alunos_id)
        .toList();

    return reservas;
  }
}
