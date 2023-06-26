import 'package:bookflow_flutter/ui/pages/livros.dart';
import 'package:bookflow_flutter/ui/pages/livros_reservados.dart';
import 'package:flutter/material.dart';


class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}
class _HomePageState extends State<HomePage> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Minha Home Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
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
                    builder: (context) => LivrosReservadosPage(),
                  ),
                );
              },
              child: Text('Ir para Livros Reservados'),
            ),
          ],
        ),
      ),
    );
  }
}
