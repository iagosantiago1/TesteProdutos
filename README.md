# TesteProdutos

Sistema web para gerenciamento de produtos e categorias de uma loja, desenvolvido com Spring Boot (backend), postgresql (Banco de dados) e HTML/CSS/JavaScript (frontend).

**O que foi utilizado no projeto?**

*Backend*

Java 21
Spring Boot 4.0.1
Spring Data JPA
Spring Web MVC
Spring Validation
Maven 4.0.0

*Frontend*

HTML5
CSS3
JavaScript (sem framework)

*Banco de Dados*

PostgreSQL
pgAdmin 4

**Como rodar o projeto?**

Pré-requisitos:
Java JDK 25.0.1
Maven 4.0.0
PostgreSQL 18
IntelliJ IDEA

**Configuração do Banco de dados**

1- Criar o banco:
CREATE DATABASE TesteP;

2- Executar o conteúdo do schema.sql e depois do consultas.sql.

**No Backend**

1- Verificar no arquivo application.yml se a senha do seu postgre está igual a do application.yml, se não estiver, altere para sua senha;

2- Quando rodar a aplicação o servidor deve roda em "localhost:8080";
Para teste use:
http://localhost:8080/produtos - Lista produtos
http://localhost:8080/categorias - Lista categorias


**No Frontend**

1- No VSCODE instale a extensão LiveServer;
2- Abra a pasta "frontend" no VSCODE;
3- Clique com botão direito em index.html;
4- Selecione "Open with Live Server" e ele será aberto no seu navegador.

Link do vídeo:
https://drive.google.com/file/d/1V5TkTtYRsB560PS0zPbKrRkXwgFZWNKh/view?usp=sharing

**Considerações**
Esse foi um projeto bem desafiador, principalmente na parte do backend, tive que pegar java quase que do zero pois não tinha muita familiaridade com a linguagem, quanto ao banco de dados e o frontend foi mais tranquilo.
Gostei muito de tentar resolver esse desafio e espero evoluir cada vez mais.

