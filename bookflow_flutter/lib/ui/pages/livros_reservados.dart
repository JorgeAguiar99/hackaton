import 'package:bookflow_flutter/datasource/remote/livro_remote.dart';
import 'package:bookflow_flutter/models/livro.dart';
import 'package:bookflow_flutter/models/reservas.dart';
import 'package:bookflow_flutter/ui/pages/detalhes_page.dart';
import 'package:bookflow_flutter/ui/widgets/carregando.dart';
import 'package:bookflow_flutter/ui/widgets/item_lista_livro.dart';
import 'package:flutter/material.dart';
import 'package:bookflow_flutter/datasource/remote/reservas_remote.dart';

class LivrosReservadosPage extends StatefulWidget {
  final int alunos_id;

  const LivrosReservadosPage({Key? key, required this.alunos_id}) : super(key: key);

  @override
  State<LivrosReservadosPage> createState() => _LivrosReservadosPageState();
}

class _LivrosReservadosPageState extends State<LivrosReservadosPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.tv),
            SizedBox(width: 8),
            Text('Home'),
          ],
        ),
      ),
      backgroundColor: Colors.grey.shade400,
      body: FutureBuilder<List<Reservas>>(
        future: ReservasRemote().get(widget.alunos_id),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Carregando();
          } else if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data?.length ?? 0,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.all(4),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              DetalhesPage(snapshot.data![index] as Livro),
                        ),
                      );
                    },
                    child: ItemLista(snapshot.data![index] as Livro),
                  ),
                );
              },
            );
          } else {
            return const Text('Nenhuma reserva encontrada.');
          }
        },
      ),
    );
  }
}
