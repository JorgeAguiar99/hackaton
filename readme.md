# Projeto Backend + Banco de Dados

Este projeto consiste em uma aplicação Laravel com um banco de dados. Siga as instruções abaixo para configurar e executar o projeto.

## Configuração do Backend + Banco de Dados

Antes de iniciar o projeto Laravel, certifique-se de possuir os seguintes pacotes instalados/configurados: `php`, `composer`, `php-mysql`, `docker` e `docker-compose`.

### Instalação das dependências do projeto

Navegue até a pasta do backend no terminal:

cd backend/


Execute o comando a seguir para instalar as dependências:

composer install


### Inicialização do Banco de Dados

Navegue até a pasta do banco no terminal:

cd banco/


Execute o seguinte comando para iniciar o banco de dados usando o Docker Compose:

sudo docker-compose up -d


### Criação das tabelas

Volte para a pasta do backend:

cd backend/

Configure o arquivo `.env` com os dados do banco.

Execute o seguinte comando para criar as tabelas:

php artisan migrate


### Realização do dump dos dados (opcional)

Caso seja necessário, siga as etapas a seguir para realizar o dump dos dados:

sudo docker exec -it mariadb bash
mariadb -u usuario -psenha biblioteca < dados.sql


### Inicialização do serviço Laravel

Na pasta do backend, execute o seguinte comando para iniciar o servidor Laravel:

php artisan serve


## Configuração do FrontEnd

Siga os passos abaixo para configurar e executar o projeto FrontEnd:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org).

2. Abra o terminal ou prompt de comando na pasta raiz do projeto.

3. Execute o seguinte comando para instalar as dependências do projeto:

npm install

4. Após a conclusão da instalação, execute o seguinte comando para iniciar o projeto em modo de desenvolvimento:

npm run dev

Isso iniciará o projeto e abrirá um servidor local para que você possa visualizá-lo no seu navegador. Acesse o projeto em seu navegador usando o seguinte endereço: http://localhost:3000

Certifique-se de que os passos anteriores para o Backend e Banco de Dados foram realizados corretamente.

Certifique-se de manter o terminal ou prompt de comando aberto enquanto trabalha no projeto, pois ele exibirá informações relevantes, como erros ou mensagens de compilação.


