<h1 align="center">
  <p>👨‍⚕️ Sistema de Agendamento de Consultas 🩺</p>
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/HigorSnt/sismed?style=flat-square">
  <img alt="GitHub" src="https://img.shields.io/github/license/HigorSnt/sismed?style=flat-square">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/HigorSnt/ecoleta?style=flat-square">
  <img alt="Jest" src="https://jestjs.io/img/jest-badge.svg"></br>
  <a href="https://insomnia.rest/run/?label=sismed&uri=https%3A%2F%2Fraw.githubusercontent.com%HigorSnt%2Fsismed%2Fmaster%2F.github%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

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

### 🚏 `/doctor`

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
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "crm": "1111"
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna todos os médicos cadastrados.
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        [
          {
            "name": "Vitor Martin Augusto Viana",
            "email": "vitormartinaugustoviana_@cressem.com.br",
            "crm": "1111"
          },
          {
            "name": "Luciano Pilla Pinto",
            "email": "luciano@gmail.com",
            "crm": "4785"
          }
        ]
      </code>
      </pre>
    </details>
  </li>
</ul>

### 🚏 `/patient`

<ul>
  <li>
    <strong>POST</strong>: rota responsável por criar um paciente no banco de dados.
    Exemplo de execução:</br>
    <pre>
    <code>
      {
        "name": "Raissa Oliveira",
        "email": "raissacarvalhooliveira@rhyta.com",
        "password": "Rohng3ien"
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "email": "raissacarvalhooliveira@rhyta.com"
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: esta rota retorna todos os pacientes cadastrados.
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        [
          {
            "name": "Higor",
            "email": "higor@gmail.com"
          },
          {
            "name": "Raissa Oliveira",
            "email": "raissacarvalhooliveira@rhyta.com"
          }
        ]
      </code>
      </pre>
    </details>
  </li>
</ul>

### 🚏 `/login`

<ul>
  <li>
    <strong>POST</strong>: esta rota é a responsável por realizar o login. Porém, existe duas formas de login: o paciente realiza seu login utilizando o <strong>email</strong> e senha cadastrados, enquanto que o médico realiza o login pelo seu <strong>CRM</strong> e senha cadastrados.
    Exemplo de execução para um <i>paciente</i>:</br>
    <pre>
    <code>
      {
        "email": "raissacarvalhooliveira@rhyta.com",
        "password": "Rohng3ien"
      }
    </code>
    </pre></br>
    Exemplo de execução para um <i>médico</i>:</br>
    <pre>
    <code>
      {
        "crm": "1111",
        "password": "7q6eYdq8Fh"
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado para ambas requisições</summary>
      <pre>
      <code>
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTEiLCJjYXRlZ29yeSI6ImRvY3RvciIsImlhdCI6MTU5NTM1MTkwOH0.Bic4lw1qY3-qVWkWonQNrpXNoOP7H7GEMWRewvA37bQ"
        }
      </code>
      </pre>
    </details>
  </li>
</ul>

> ⚠️ Todas as próximas rotas fazem uso do token jwt originado da rota de login. 
> Portanto, é necessário colocar o token no cabeçalho da requisição http.

### 🚏 `/appointment`

<ul>
  <li>
    <strong>POST</strong>: rota que permite aos pacientes marcarem consultas. <i>Apenas pacientes conseguem realizar essa operação!</i>
    Exemplo de execução:</br>
    <pre>
    <code>
      {
        "doctor": {
          "crm": "1111",
          "name": "Vitor Martin Augusto Viana"
        },	
        "date": "31-07-2020 07:00:00"
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 2,
          "doctor_crm": "1111",
          "patient_id": "raissacarvalhooliveira@rhyta.com",
          "date": "31-07-2020 07:00:00"
        }
      </code>
      </pre>
    </details>
  </li>
</ul>

### 🚏 `/appointment/:id`

<ul>
  <li>
    <strong>PATCH</strong>: rota que permite aos pacientes e médicos atualizarem as informações das consultas. <i>Pacientes apenas podem marcar a consulta como concluída e alterar a data da mesma, enquanto que o médico além de concluir a consulta, também pode realizar uma descrição dos sintomas relatados durante a consulta médica e o que foi prescrito para o paciente.</i></br>
    Para realizar a atualização da consulta deve-se passar apenas o que será atualizado.</br>
    Exemplo de execução:</br>
    <pre>
    <code>
      {
        "symptoms": "febre e tosse",
        "prescription": "Xarope 3x ao dia"
      }
    </code>
    </pre>
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
          "id": 1,
          "doctor_crm": "1111",
          "patient_id": "higor@gmail.com",
          "date": "31-07-2020 07:00:00",
          "symptoms": "febre e tosse",
          "prescription": "Xarope 3x ao dia",
          "done": 0
        }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>GET</strong>: rota que permite ao paciente e médico todas as informações relativas da consulta com o id passado na rota.
    <details>
      <summary markdown="span">Resultado</summary>
      <pre>
      <code>
        {
        "id": 1,
        "doctor_crm": "1111",
        "patient_id": "higor@gmail.com",
        "date": "31-07-2020 07:00:00",
        "symptoms": "febre e tosse",
        "prescription": "Xarope 3x ao dia",
        "done": 0
      }
      </code>
      </pre>
    </details>
  </li>
  <li>
    <strong>DELETE</strong>: rota que permite ao paciente excluir a consulta registrada com o id correspondente ao passado como parâmetro na rota.<br>
    Como resultado é retornado apenas um código <code>200</code> caso sucesso.
  </li>
</ul>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
