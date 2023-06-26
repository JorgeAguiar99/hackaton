import 'package:flutter/material.dart';

class Carregando extends StatelessWidget {
  const Carregando({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: SizedBox(
        width: 200,
        height: 200,
        child: CircularProgressIndicator(
          valueColor: AlwaysStoppedAnimation<Color>(Colors.black),
          strokeWidth: 5,
        ),
      ),
    );
  }
}