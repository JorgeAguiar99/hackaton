import 'package:bookflow_flutter/datasource/remote/livro_remote.dart';
import 'package:bookflow_flutter/ui/pages/detalhes_page.dart';
import 'package:bookflow_flutter/ui/widgets/carregando.dart';
import 'package:bookflow_flutter/ui/widgets/item_lista_livro.dart';
import 'package:flutter/material.dart';

class LivrosReservadosPage extends StatefulWidget {
  const LivrosReservadosPage({Key? key}) : super(key: key);

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
        //backgroundColor: Color(0xFF000000),
      ),
      backgroundColor: Colors.grey.shade400,
      body: FutureBuilder(
        future: LivroRemote().get(),
        builder: (context, snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
            case ConnectionState.none:
              return const Carregando();
          }
          return ListView.builder(
            itemCount: snapshot.data?.length ?? 0,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.all(4),
                child: GestureDetector(
                  onTap: () {
                    Navigator.push(context,
                      MaterialPageRoute(
                        builder: (context) => DetalhesPage(snapshot.data![index])));
                  },
                  child: ItemLista(snapshot.data![index]),
                ),
              );
            }
          );
        },
      ),
    );
  }
}