# 🗺 Ed Tech

<h1 align="center">
   <a href="https://nestjs.com" target="_blank" rel="noopener">Nest.JS</a> | <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.JS</a> 
</h1>

<p align="center">
  <img alt="Develop by" src="https://img.shields.io/badge/Develop%20&%20Made%20by-Juniel-blue?style=flat&logo=Awesome-Lists">
  <img alt="GitHub last commit" src="https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg?logo=typescript">
</p>

<h3 align="center">
  <a href="#-sobre">Sobre o projeto</a>
  <span> · </span>
  <a href="#-tecnologias-utilizadas">Tecnologias utilizadas</a>
  <span> · </span>
  <a href="#-primeiros-passos">Primeiros passos</a>
  <span> · </span>
  <a href="#-padroes-contribuir">Padrões do projeto</a>
</h3>

## 💭 Sobre

O código consiste em uma aplicação onde seja possível realizar a matrícula dos alunos na turma de programação web da instituição `Edtech`.

---

## 👨‍💻 Tecnologias Utilizadas

- <a href="https://nestjs.com" target="_blank" rel="noopener">Nest.JS</a>;
- <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.JS</a>;
- <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">TypeScript</a>.
- <a href="https://vuetifyjs.com" target="_blank" rel="noopener">Vuetify</a>.
- <a href="https://www.prisma.io/" target="_blank" rel="noopener">Prisma 10</a>.
- <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite.JS</a>.
- <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>.

---

## ⁉ Primeiros passos

### 🤔 Pré-requisitos

Para conseguir utilizar o projeto e contribuir nele, basta seguir as instruções abaixo:

- O **<a href="https://nodejs.org/en/" target="_blank" rel="noopener">Node.js</a>** é **OBRIGATÓRIO** para executar esse projeto e é **RECOMENDADO** usar a versão LTS.
- O **<a href="https://www.npmjs.com/" target="_blank" rel="noopener">NPM</a>** ou **<a href="https://yarnpkg.com/" target="_blank" rel="noopener">Yarn</a>** são **OBRIGATÓRIO** para o gerenciamento dos pacotes da aplicação.
- O **<a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a>** é **OBRIGATÓRIO** para o controle de versão do projeto.

---

### 📝 Passo a passo

Primeiro clone o repositório em seu computador, por meio do terminal utilizando o comando:

1. Clonando o repositório

```sh
  # Clone o repositório
  $ git clone https://github.com/juniel-filappi/project-a-educacao.git
  # Entre na pasta raiz da aplicação
  $ cd project-a-educacao
```

2. Iniciando o Projeto

```sh
  # Instale as dependências da aplicação web
  $ cd web && yarn # ou npm install
  # Execute o comando abaixo para iniciar o projeto
  $ yarn dev

  # Instale as dependências da aplicação api
  $ cd api && yarn # ou npm install
  # Execute o comando abaixo para iniciar o servidor
  $ yarn dev
```
---
## 💯 Padrões do projeto

- SOLID
- MVC
- Repository Pattern

 ---
### Documentação da arquitetura
O projeto esta dividido em:
- **Modules**
- **Shared**
- **Helpers**

## Modules
Os módulos são responsáveis por agrupar as funcionalidades da aplicação. Cada módulo possui uma pasta com os seguintes arquivos:
- **Controller**: responsável por receber as requisições e enviar as respostas.
- **Service**: responsável por tratar as regras de negócio.
- **Repository**: responsável por realizar as operações no banco de dados.
## Shared
Criado para receber as dto's e decorators que são compartilhados entre os módulos.
## Helpers
Criado para desenvolver funções que podem ser reutilizadas em várias partes do código, visando manter a base do código organizada e legível.

---
### 🚧 Lista de Atividades

#### TO DO API
- [x] Adding ORM `Prisma 10`.
- [x] Create `Auth` module.
- [x] Create `Student` module.
- [x] Use `SOLID` Architecture.
- [x] Configure `JWT` for authentication.
- [x] Create `Middleware` authenticate.
- [x] Create `swagger` documentation.
- [x] Create tests e2e.


#### TO DO WEB
- [x] Install `vuetify` and config theme colors.
- [x] Create Login page.
- [x] Create Register page.
- [x] Create Dashboard page.
- [x] Create Students page.
- [x] Configure `vue-router`.
- [x] Configure `cypress` and automatized tests.
- [x] Create middleware authenticate private routes.
- [x] Adding `sweet-alert2` for return messages in application.
- [x] Install axios and configure `api.ts`

---

<sup> Feito com 💙 por 👾<a href="https://github.com/juniel-filappi/" target="_blank" rel="noopener">Juniel</a> ® 2024.</sup>
