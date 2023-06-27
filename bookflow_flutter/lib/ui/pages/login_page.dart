import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:bookflow_flutter/ui/pages/home_page.dart';
import 'package:bookflow_flutter/datasource/remote/reservas_remote.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _raController = TextEditingController();
  String _errorMessage = '';

  Future<void> _login() async {
    final url = Uri.parse('http://127.0.0.1:8000/alunos');
    final response = await http.get(url);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data['status'] == 'sucesso') {
        final alunoList = data['aluno'] as List<dynamic>;
        final aluno = alunoList.firstWhere(
          (a) => a['ra'] == int.tryParse(_raController.text),
          orElse: () => null,
        );
        if (aluno != null) {
          final alunoId = aluno['id'];
          // Redirecionar para a HomePage e passar os dados do aluno como argumento
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => HomePage(aluno: aluno)),
          );
          return;
        }
      }
    }
    setState(() {
      _errorMessage = 'RA inválido. Tente novamente.';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _raController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'RA',
              ),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _login,
              child: Text('Entrar'),
            ),
            SizedBox(height: 8.0),
            Text(
              _errorMessage,
              style: TextStyle(
                color: Colors.red,
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
