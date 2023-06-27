Backend + Banco de dados:

    Para instalar o projeto Laravel será necessário possuír os seguintes pacotes 
    instalados/configurados: php, composer, php-mysql, docker, docker-compose

    Instale as dependencias do projeto:
      - cd /backend
      - composer install
    
   
    Inicie o Banco de Dados:
      - cd /banco
      - sudo docker-compose up -d

    realize a criação das tabelas:
      - cd /backend
      - configure o arquivo .env com os dados do banco
      - php artisan migrate
    
    Realizando dump dos dados (opcional)
      - sudo docker exec -it mariadb bash
      - mariadb -u usuario -psenha biblioteca < dados.sql
    
    Inicie o serviço do laravel
      - php artisan serve

FrontEnd:

    Siga os passos abaixo para iniciar o projeto:

    1Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em nodejs.org.
    Abra o terminal ou prompt de comando na pasta raiz do projeto.
    Execute o seguinte comando para instalar as dependências do projeto:
    
    *npm install*

    Isso instalará os módulos do Node necessários para o projeto.
    Após a conclusão da instalação, execute o seguinte comando para iniciar o projeto em modo de desenvolvimento:
    
    *npm run dev*
    
    Isso iniciará o projeto e abrirá um servidor local para que você possa visualizá-lo no seu navegador.
    Acesse o projeto no seu navegador usando o seguinte endereço:
    
    http://localhost:3000
    
    Agora você poderá ver e interagir com o projeto em tempo real.
    Certifique-se que os passos anteriores para API foi realizado
    Certifique-se de manter o terminal ou prompt de comando aberto enquanto trabalha no projeto, pois ele exibirá informações relevantes, como erros ou mensagens de compilação.
