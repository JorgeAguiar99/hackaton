import 'package:flutter/material.dart';

class Funcoes {
  void showMensagem(BuildContext context, String titulo, String texto) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(titulo),
          content: Text(texto),
          actions: [
            ElevatedButton(
              onPressed: (){
                Navigator.pop(context);
              },
              child: const Text('OK')
            )
          ],
        );
      }
    );
  }
}