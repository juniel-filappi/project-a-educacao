# Arquitetura utilizada
O projeto foi inteiro desenvolvido utilizando o typescript, no backend utilizei o NestJS e sua estrutura de módulos, controllers e services, no front utilizei o VueJS com o Vuetify para a estilização dos componentes.

# Lista de bibliotecas
## Back-end
### dependencies
- `@prisma/client`: Usado para servir como Models;
- `bcryptjs`: Usado para encriptar a senha do usuário;
- `class-transformer`: Usado para transformar os dados da dto;
- `zod`: Usado para fazer a validação dos dados;

### dev-dependencies
- `@nestjs/cli`: CLI do framework NestJS para scaffolding e gerenciamento de projetos;
- `@nestjs/schematics`: Ferramentas de geração de código e scaffolding para projetos NestJS;
- `@nestjs/testing`: Utilitários para testes unitários e e2e em projetos NestJS;
- `@swc/core`: Compilador de alto desempenho para TypeScript e JavaScript;
- `@types/bcryptjs`: Tipagens do bcryptjs;
- `@types/express`: Tipagens do Express;
- `@types/node`: Tipagens para funcionalidades do Node.js;
- `@types/passport-jwt`: Tipagens para integração do Passport com JWT;
- `@types/supertest`: Tipagens para a biblioteca de testes HTTP Supertest;
- `@typescript-eslint/eslint-plugin`: Plugin ESLint para suporte a regras TypeScript;
- `@typescript-eslint/parser`: Parser para ESLint com suporte a TypeScript;
- `@vitest/coverage-v8`: Ferramenta de cobertura de código para Vitest usando V8;
- `dotenv`: Gerenciamento de variáveis de ambiente a partir de arquivos `.env`;
- `eslint`: Ferramenta para análise de código estático e linting;
- `eslint-config-prettier`: Configuração para desabilitar regras conflitantes entre ESLint e Prettier;
- `eslint-plugin-prettier`: Plugin para integrar Prettier ao ESLint;
- `prettier`: Ferramenta de formatação de código;
- `prisma`: ORM para banco de dados com suporte a TypeScript;
- `source-map-support`: Suporte a mapas de fonte para facilitar debugging;
- `supertest`: Biblioteca para testes HTTP;
- `ts-loader`: Loader para compilar TypeScript usando o Webpack;
- `ts-node`: Execução de arquivos TypeScript diretamente no Node.js;
- `tsconfig-paths`: Suporte a paths customizados no TypeScript;
- `typescript`: Compilador TypeScript;
- `unplugin-swc`: Plugin para integrar SWC a ferramentas como Vite e Rollup;
- `vitest`: Framework para testes unitários e e2e.


## Front-end
### dependencies
- `@mdi/font`: Pacote de fontes para Material Design Icons;
- `@vuelidate/core`: Biblioteca de validação leve para Vue 3;
- `@vuelidate/validators`: Conjunto de validadores prontos para uso com o Vuelidate;
- `axios`: Cliente HTTP para realizar requisições;
- `core-js`: Polyfills para compatibilidade com APIs modernas do JavaScript;
- `lodash`: Biblioteca utilitária para manipulação de dados, arrays, objetos, strings, etc.;
- `maska`: Biblioteca para máscaras de entrada em formulários;
- `mitt`: Biblioteca leve para gerenciamento de eventos (EventEmitter);
- `roboto-fontface`: Fontes Roboto para inclusão em projetos;
- `vue`: Framework JavaScript para criação de interfaces reativas;
- `vuetify`: Biblioteca de componentes UI baseados em Material Design para Vue 3.

### dev-dependencies
- `@eslint/js`: Configurações e funcionalidades principais do ESLint baseadas em JavaScript;
- `@tsconfig/node22`: Arquivo de configuração padrão do TypeScript para Node.js 22;
- `@types/lodash`: Tipagens para a biblioteca Lodash;
- `@types/node`: Tipagens para APIs do Node.js;
- `@vitejs/plugin-vue`: Plugin para integração do Vue.js com o Vite;
- `@vue/eslint-config-typescript`: Configuração padrão do ESLint para projetos Vue com TypeScript;
- `@vue/tsconfig`: Configuração de TypeScript otimizada para projetos Vue;
- `cypress`: Framework de testes end-to-end para aplicações web;
- `eslint`: Ferramenta de linting para JavaScript e TypeScript;
- `eslint-plugin-vue`: Regras específicas para Vue.js no ESLint;
- `npm-run-all2`: Utilitário para executar múltiplos scripts npm em paralelo ou sequência;
- `pinia`: Biblioteca de gerenciamento de estado para Vue.js;
- `sass`: Compilador para a linguagem de estilos Sass;
- `sass-embedded`: Versão embedded do compilador Sass;
- `typescript`: Compilador para TypeScript;
- `unplugin-auto-import`: Plugin para autoimportar APIs sem necessidade de declarações explícitas;
- `unplugin-fonts`: Plugin para gerenciar fontes no Vite;
- `unplugin-vue-components`: Plugin para importar componentes Vue automaticamente;
- `unplugin-vue-router`: Plugin para geração automática de rotas baseadas na estrutura de arquivos;
- `vite`: Ferramenta de construção rápida e desenvolvimento para aplicações modernas;
- `vite-plugin-vue-layouts`: Plugin para gerenciamento automático de layouts em projetos Vue;
- `vite-plugin-vuetify`: Plugin para integração de Vuetify em projetos Vite;
- `vue-router`: Biblioteca de roteamento oficial para Vue.js;
- `vue-tsc`: Ferramenta para verificação de tipos TypeScript em projetos Vue.

# O que você melhoraria se tivesse mais tempo
- Implementado mais testes no front;