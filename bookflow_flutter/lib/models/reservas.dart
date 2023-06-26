class Reservas {
  int id;
  int aluno_id;
  int livros_id;
  String dataInicio;
  String dataFim;
  String observacao;
  String livros_nome;
  String alunos_nome;

  Reservas({
    required this.id,
    required this.aluno_id,
    required this.livros_id,
    required this.dataInicio,
    required this.dataFim,
    required this.observacao,
    required this.livros_nome,
    required this.alunos_nome,

  });

  factory Reservas.fromMap(Map<String, dynamic> mapa) {
    return Reservas(
      id: mapa['id'] ?? 0,
      aluno_id: mapa['aluno_id'] ?? 0,
      livros_id: mapa['livros_id'] ?? 0,
      dataInicio: mapa['dataInicio'] ?? '',
      dataFim: mapa['dataFim'] ?? '',
      observacao: mapa['observacao'] ?? '',
      livros_nome: mapa['livros_nome'] ?? '',
      alunos_nome: mapa['alunos_nome'] ?? '',
    );
  }
}
