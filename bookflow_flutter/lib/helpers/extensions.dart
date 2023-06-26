//criando uma extensao da classe string
//  os metodos que forem criados serao adicionados na classe string
extension StringExtension on String {
  //criando uma funcao toInt para transformar a string em um inteiro
  int toInt({int vlrPadrao = 0}) {
    try {
      return int.parse(this); //converte a string em inteiro
    } on Exception catch (_) {
      return vlrPadrao; //se der erro no parse, retornar o valor padrao
    }
  }
}