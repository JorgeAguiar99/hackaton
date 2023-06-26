import 'package:bookflow_flutter/ui/pages/home_page.dart';
import 'package:bookflow_flutter/ui/pages/login_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    title: 'Consumindo API',
    home: LoginPage(),
    debugShowCheckedModeBanner: false,
  ));
}

