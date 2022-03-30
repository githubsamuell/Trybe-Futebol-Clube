# Trybe-Futebol-Clube

Neste Projeto Coloquei em pratica parte do meu conhecimento adquirido no modulo de backend da Trybe.
Foi um projeto avaliativo e com prazo de entrega, onde foi proposto que a pessoa avaliada desenvolvesse
um backend que atendesse todas as necessidades de um frontend que precisava criar, salvar, ler e atualizar informaçoes
de uma tabela de um campeonato.

## Algumas coisas que tive que realizar
- Criar as rotas corretas utilizando o Express
- Implementar controle de autenticação com JWT
- Manipular um banco de dados MYSQL para criar, salvar ler e atualizar as informaçoes de forma correta
- Implementar o ORM Sequelize para ter mais controle com as informaçoes do banco
- Implementar os teste todo o codigo que foi produzido


## Stacks Utilizadas
* Node.js
* TypeScript
* Object-Oriented Programming
* Express
* MySQL
* Sequelize
* Docker
* Mocha + Chai + Sinon

# Rodando Localmente
Para rodar a API localmente certifique-se de ter Docker e Docker-Compose instalados em sua maquina.

Clone o projeto

  git clone git@github.com:githubsamuell/Trybe-Futebol-Clube.git
Entre no diretório do projeto

  cd Trybe-Futebol-Clube
Suba a orquestração de containers

  docker-compose up -d
A API estará pronta para uso quando a saída no seu terminal ficar assim (pode levar até 1 minuto)

  Creating tfc_database ... done
  Creating tfc_backend ... done
  Creating tfc_frontend ... done
Para encerrar a API basta executar o comando

  docker-compose down

