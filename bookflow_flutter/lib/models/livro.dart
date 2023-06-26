class Livro {
  int id;
  String titulo;
  String subTitulo;
  String isbn;
  int autores_id;
  int editoras_id;
  String local;
  int ano;

  Livro({
    required this.id,
    required this.titulo,
    required this.subTitulo,
    required this.isbn,
    required this.autores_id,
    required this.editoras_id,
    required this.local,
    required this.ano,
  });

  factory Livro.fromMap(Map<String, dynamic> mapa) {
    return Livro(
      id: mapa['id'] ?? 0,
      titulo: mapa['titulo'] ?? '',
      subTitulo: mapa['subTitulo'] ?? '',
      isbn: mapa['isbn'] ?? '',
      autores_id: mapa['autores_id'] ?? 0,
      editoras_id: mapa['editoras_id'] ?? 0,
      local: mapa['local'] ?? '',
      ano: mapa['ano'] ?? 0,
    );
  }
}
