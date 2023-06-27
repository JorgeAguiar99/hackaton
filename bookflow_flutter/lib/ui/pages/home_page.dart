import 'package:bookflow_flutter/ui/pages/livros.dart';
import 'package:bookflow_flutter/ui/pages/livros_reservados.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  final dynamic aluno;

  const HomePage({Key? key, required this.aluno}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Minha Home Page'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => LivrosPage(),
                ),
              );
            },
            child: Text('Ir para Livros'),
          ),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => LivrosReservadosPage(alunos_id: widget.aluno['id']),
                ),
              );
            },
            child: Text('Ir para Livros Reservados'),
          ),
          Spacer(), // Ocupa todo o espaço disponível acima dos dados do aluno
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    'ID: ${widget.aluno['id']}',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Aluno: ${widget.aluno['nome']}',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'RA: ${widget.aluno['ra']}',
                    style: TextStyle(fontSize: 16),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Cidade: ${widget.aluno['cidade']}',
                    style: TextStyle(fontSize: 16),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Telefone: ${widget.aluno['telefone']}',
                    style: TextStyle(fontSize: 16),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Curso: ${widget.aluno['cursos_nome']}',
                    style: TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
