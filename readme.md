Backend + Banco de dados:

    Para instalar o projeto Laravel será necessário possuír os seguintes pacotes 
    instalados/configurados: php, composer, php-mysql, docker, docker-compose

    Instale as dependencias do projeto:
      - composer install
    
    configure o arquivo .env com os dados do banco
   
    Inicie o Banco de Dados:
      - docker-compose up -d

    realize a criação das tabelas:
      - php artisan migrate
    
    Realizando dump dos dados (opcional)
      - docker exec -it mariadb bash
    
    Inicie o serviço do laravel
      - php artisan serve
    