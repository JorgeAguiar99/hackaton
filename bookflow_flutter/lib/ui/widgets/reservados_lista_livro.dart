import 'package:bookflow_flutter/models/reservas.dart';
import 'package:flutter/material.dart';

class ItemLista extends StatelessWidget {
  final Reservas reservas;

  const ItemLista(this.reservas, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              reservas.livros_nome,
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Reservado em: ${reservas.dataInicio}',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 8),
            Text(
              'Reservado até: ${reservas.dataFim}',
              style: const TextStyle(fontSize: 16),
            ),
             Text(
              'Reservado por: ${reservas.alunos_nome}',
              style: const TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }
}
