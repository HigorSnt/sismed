<h1 align="center">
  <p>👨‍⚕️ Sistema de Agendamento de Consultas 🩺</p>
</h1>

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

## :bookmark: Sobre

Este é uma API que visa auxiliar pacientes e médicos no agendamento de consultas e na criação de prontuários que são gerados a cada consulta, onde o médico ao longo da consulta pode informar os sintomas relatados pelo paciente e o que lhe foi receitado, facilitando o acompanhamento do mesmo.

## :boom: Utilização

1. Inicialmente é necessário realizar o clone do repositório:

```bash
  git clone https://github.com/HigorSnt/sismed.git
```

2. Em seguida, entre na pasta gerada pelo passo anterior e execute os seguintes comandos:

```bash
  # Antes de tudo é necessário baixar as dependências descritas no package.json
  $ npm install
  # Antes de iniciar a aplicação gere o banco de dados e as tabelas
  $ npm run knex:migrate
  # Para executar a aplicação:
  $ npm run dev
  # Para executar os testes:
  $ npm run test
```

## 🛣 Rotas

As rotas presentes na aplicação serão descritas abaixo:

### `/doctor`

<ul>
  <li>
    <strong>POST</strong>: rota responsável por criar um médico no banco de dados.
    Exemplo de execução:</br>
    <pre>
    <code>
    { 
      "crm": "1111",
      "name": "Vitor Martin Augusto Viana",
      "email": "vitormartinaugustoviana_@cressem.com.br",
      "password": "7q6eYdq8Fh"
    }
    </code>
    </pre>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna todos os médicos cadastrados.
  </li>
</ul>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<style>
  ul {
    list-style-type: none;
    margin-left: 40px;
  }
  strong {
    font-size: 15px;
  }
</style>
