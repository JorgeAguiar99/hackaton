import 'dart:convert';
import 'package:http/http.dart' as http;

class ClienteHttp {
  //async -> diz que o metodo é assincrono, funcionando como thread
  //sempre que o metodo for async, deve adicionar o Future<> no returno
  Future<dynamic> getJson(String link) async {
    //busca os dados da API, o await faz aguardar a execucao da thread
    var response = await http.get(Uri.parse(link));

    //pegando a resposta da API e decodificando o JSON
    return json.decode(response.body);
  }
}