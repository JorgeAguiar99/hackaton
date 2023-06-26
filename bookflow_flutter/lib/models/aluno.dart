class Aluno {
  int id;
  int ra;
  String nome;
  String endereco;
  String cidade;
  String uf;
  String telefone;
  int cursos_id;
  String cursos_nome;
 
  Aluno({
    required this.id,
    required this.ra,
    required this.nome,
    required this.endereco,
    required this.cidade,
    required this.uf,
    required this.telefone,
    required this.cursos_id,
    required this.cursos_nome,

  });

  factory Aluno.fromMap(Map<String, dynamic> mapa) {
    return Aluno(
      id: mapa['id'] ?? 0,
      ra: mapa['ra'] ?? 0,
      nome: mapa['nome'] ?? '',
      endereco: mapa['endereco'] ?? '',
      cidade: mapa['cidade'] ?? '',
      uf: mapa['uf'] ?? '',
      telefone: mapa['telefone'] ?? '',
      cursos_id: mapa['cursos_id'] ?? 0,
      cursos_nome: mapa['cursos_nome'] ?? '',
    );
  }

  static fromJson(e) {}
}
