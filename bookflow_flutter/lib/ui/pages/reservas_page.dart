import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ReservasPage extends StatefulWidget {
  final int alunoId;

  const ReservasPage({Key? key, required this.alunoId}) : super(key: key);

  @override
  State<ReservasPage> createState() => _ReservasPageState();
}

class _ReservasPageState extends State<ReservasPage> {
  List<dynamic> reservas = [];

  @override
  void initState() {
    super.initState();
    _fetchReservas();
  }

  Future<void> _fetchReservas() async {
    final url = Uri.parse('http://127.0.0.1:8000/reservas');
    final response = await http.get(url);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data['status'] == 'sucesso') {
        setState(() {
          reservas = data['reserva'];
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reservas'),
      ),
      body: ListView.builder(
        itemCount: reservas.length,
        itemBuilder: (context, index) {
          final reserva = reservas[index];
          if (reserva['alunos_id'] == widget.alunoId) {
            return ListTile(
              title: Text(reserva['livros_nome']),
              subtitle: Text('Data de início: ${reserva['dataInicio']}, Data de fim: ${reserva['dataFim']}'),
            );
          } 
        },
      ),
      
    );
  }
}
