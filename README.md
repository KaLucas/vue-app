# 🟢 Vue App

> Sistema de administração desenvolvido com Vue 3, Composition API e Pinia.

![E2E Tests](https://github.com/KaLucas/vue-app/actions/workflows/e2e.yml/badge.svg)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Acesso](#-acesso)
- [Como Usar](#️-como-usar)
- [Testes](#-testes)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contato](#-contato)

---

## 💡 Sobre o Projeto

**Vue App** é um sistema de administração web moderno, construído com Vue 3 e TypeScript. A aplicação oferece uma interface intuitiva para gerenciamento de usuários, utilizando a Composition API com `<script setup>`, gerenciamento de estado reativo com Pinia, tema light/dark via CSS custom properties e navegação entre páginas com Vue Router.

> ⚠️ **Nota:** Este projeto faz parte do meu portfólio pessoal e tem como objetivo demonstrar organização de código, boas práticas e domínio das tecnologias utilizadas. Ele representa o básico do que sei fazer — e está longe de ser o limite do meu conhecimento.

---

## 🚀 Tecnologias

### Core

- **[Vue 3](https://vuejs.org/)** — Framework para construção de interfaces web com Composition API
- **[TypeScript](https://www.typescriptlang.org/)** — Superset do JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido
- **[Vue Router 4](https://router.vuejs.org/)** — Roteamento com guard de autenticação

### UI & Estilo

- **[CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)** — Sistema de tema light/dark sem dependências externas
- **[@lucide/vue](https://lucide.dev/)** — Biblioteca de ícones moderna e tree-shakeable

### Estado & Formulários

- **[Pinia](https://pinia.vuejs.org/)** — Gerenciamento de estado global, substituto oficial do Vuex
- **[Composition API](https://vuejs.org/guide/extras/composition-api-faq)** — `ref`, `computed`, `onMounted`, `storeToRefs`

### HTTP & Estado Assíncrono

- **[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)** — Requisições HTTP nativas do browser

### Qualidade de Código

- **[ESLint](https://eslint.org/)** — Linting com OXLint e flat config
- **[Prettier](https://prettier.io/)** — Formatação automática de código

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/KaLucas/vue-app.git
```

### 2. Acesse a pasta do projeto

```bash
cd vue-app
```

### 3. Instale as dependências

```bash
npm install
```

---

## 🔑 Acesso

Para acessar o sistema, utilize as credenciais abaixo:

| Campo  | Valor             |
| ------ | ----------------- |
| E-mail | `admin@email.com` |
| Senha  | `123456`          |

---

## ▶️ Como Usar

### Iniciando o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

### Gerando build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`, prontos para deploy.

### Pré-visualizando o build de produção

```bash
npm run preview
```

---

## 🧪 Testes

O projeto conta com dois tipos de teste:

> 💡 **Nota:** A cobertura de testes foi desenvolvida com auxílio de IA, com revisão e validação de cada caso de teste para garantir que refletem o comportamento real da aplicação.

### Testes Unitários — Vitest

Utiliza o **[Vitest](https://vitest.dev/)** com **[@vue/test-utils](https://test-utils.vuejs.org/)**, cobrindo stores, guards e componentes isolados.

```bash
# Executa os testes unitários
npm run test:unit

# Interface visual no browser
npm run test:unit -- --ui
```

### Testes E2E — Cypress

Utiliza o **[Cypress](https://www.cypress.io/)** para testes end-to-end, cobrindo os principais fluxos da aplicação. Os testes são executados automaticamente via **[GitHub Actions](https://github.com/KaLucas/vue-app/actions/workflows/e2e.yml)** a cada push ou pull request na branch `master`.

```bash
# Abre a interface visual do Cypress
npx cypress open

# Executa em modo headless
npx cypress run
```

---

## 📁 Estrutura de Pastas

```
vue-app/
├── cypress/                   # Testes E2E
│   ├── e2e/
│   │   ├── auth/
│   │   ├── routes/
│   │   └── users/
│   ├── fixtures/              # Dados mockados
│   └── support/               # Comandos customizados
├── public/                    # Arquivos estáticos públicos
├── src/
│   ├── assets/
│   │   ├── base.css           # Variáveis base do Vue (--vt-c-*)
│   │   ├── main.css           # Estilos globais
│   │   └── theme.css          # Sistema de tema light/dark
│   ├── components/            # Componentes reutilizáveis
│   │   ├── dialogs/           # Modais (Delete, UserForm, DialogWindow)
│   │   ├── Cards.vue
│   │   ├── Sidebar.vue
│   │   ├── Snackbar.vue
│   │   ├── Table.vue
│   │   └── UsersList.vue
│   ├── config/                # Configuração de ambiente
│   ├── guards/                # Guard de autenticação
│   ├── models/                # Tipagens e interfaces de domínio
│   ├── router/                # Configuração de rotas
│   ├── stores/                # Stores Pinia (auth, dialog, snackbar, theme, users)
│   ├── utils/                 # Funções utilitárias
│   ├── views/                 # Páginas da aplicação
│   │   ├── DashboardView.vue
│   │   ├── LoginView.vue
│   │   └── MainView.vue
│   ├── App.vue                # Componente raiz
│   └── main.ts                # Ponto de entrada
├── env.d.ts                   # Tipagem das variáveis de ambiente
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## 📜 Scripts Disponíveis

| Comando             | Descrição                                          |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento na porta 5173 |
| `npm run build`     | Compila o TypeScript e gera o build de produção    |
| `npm run preview`   | Pré-visualiza o build de produção localmente       |
| `npm run lint`      | Executa o ESLint para análise estática do código   |
| `npm run format`    | Formata o código com Prettier                      |
| `npm run test:unit` | Executa os testes unitários com Vitest             |
| `npx cypress open`  | Abre a interface visual do Cypress                 |
| `npx cypress run`   | Executa os testes E2E em modo headless             |

---

## 📬 Contato

**Karina Lucas**

- 📧 [karina.lucas@gmail.com](mailto:karina.lucas@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/karinalucas/)
- 🐙 [GitHub](https://github.com/KaLucas)
