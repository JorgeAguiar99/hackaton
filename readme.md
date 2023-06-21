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
    