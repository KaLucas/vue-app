# CLAUDE.md — vue-app

## Sobre o projeto

Sistema de administração com listagem e CRUD de usuários, construído com Vue 3, TypeScript e Vite.

---

## Estrutura de pastas

```
src/
├── assets/
│   ├── base.css           # Variáveis base do Vue (--vt-c-*)
│   ├── main.css           # Estilos globais
│   └── theme.css          # Tema light/dark com data-theme
├── components/
│   ├── Cards.vue
│   ├── Sidebar.vue        # Exibe total de usuários e logout
│   ├── Sidebar.spec.ts
│   ├── Snackbar.vue       # Notificação global (success/error)
│   ├── Table.vue
│   ├── UsersList.vue      # Tabela com paginação
│   └── dialogs/
│       ├── DeleteDialog.vue
│       ├── DeleteDialog.spec.ts
│       ├── DialogWindow.vue
│       ├── UserFormDialog.vue
│       └── UserFormDialog.spec.ts
├── config/
│   └── environment.ts     # Variáveis de ambiente via import.meta.env
├── guards/
│   └── auth.guard.ts      # Redireciona sem token / se já logado
├── models/
│   └── user.model.ts      # User, DatagridUsersList, GetUsersResponse
├── router/
│   └── index.ts           # Rotas: /, /admin, /admin/dashboard
├── stores/
│   ├── auth.ts            # login(), logout(), isAuthenticated
│   ├── auth.spec.ts
│   ├── dialog.ts          # openModal(), closeModal(), selectedUser
│   ├── snackbar.ts        # showSnackbar(), hideSnackbar(), isShowSnackbar
│   ├── snackbar.spec.ts
│   ├── theme.ts           # toggleTheme(), initTheme()
│   ├── theme.spec.ts
│   ├── users.ts           # fetchUsers(), addUser(), updateUser(), deleteUser()
│   └── users.spec.ts
├── utils/
│   └── format-date.ts
├── views/
│   ├── DashboardView.vue
│   ├── DashboardView.spec.ts
│   ├── LoginView.vue
│   ├── LoginView.spec.ts
│   ├── Main.spec.ts
│   └── MainView.vue
├── App.vue                # RouterView + Snackbar global via Teleport
└── main.ts                # Inicializa app, pinia, router e initTheme()
```

---

## Stack

- **Vue 3** com Composition API e `<script setup>`
- **TypeScript**
- **Vite 8**
- **Pinia** — gerenciamento de estado
- **Vue Router 4** — roteamento com guard de autenticação
- **@lucide/vue** — ícones
- **Cypress** — testes E2E
- **Vitest** + **@vue/test-utils** — testes unitários

---

## Convenções

- Sem ponto e vírgula (`;`)
- Sem aspas simples — usar aspas duplas no template, simples no TS
- Arquivos de teste junto ao componente/store: `Sidebar.spec.ts` ao lado de `Sidebar.vue`
- `data-testid` em todos os elementos testados
- Stores usam Composition API (`defineStore` com função)
- CSS com variáveis do tema (`--bg-primary`, `--text-primary`, `--brand`, etc.)
- Tema controlado via `data-theme` no `<html>` (`light` | `dark`)

---

## Tema

Duas camadas de variáveis CSS:

1. **`base.css`** — variáveis do Vue (`--vt-c-white`, `--vt-c-black`, `--vt-c-indigo`, etc.)
2. **`theme.css`** — variáveis semânticas por tema (`[data-theme='light']` e `[data-theme='dark']`)

Variáveis semânticas disponíveis: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-card-variant`, `--surface-primary`, `--surface-secondary`, `--surface-container`, `--text-primary`, `--text-secondary`, `--text-muted`, `--text-on-brand`, `--brand`, `--brand-hover`, `--brand-active`, `--brand-container`, `--accent`, `--accent-hover`, `--border`, `--border-variant`, `--highlight`, `--highlight-soft`

---

## Testes unitários

Rodar: `npm run test:unit`

Padrão:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})
```

- Stores: setar estado diretamente antes do `mount`
- Componentes: usar `wrapper.find('[data-testid="..."]')`
- Sem `TestBed`, `ComponentFixture` ou `HttpTestingController` (isso é Angular)

---

## Testes E2E

Rodar: `npm run test:e2e:dev`

Fixtures em `cypress/fixtures/`:

- `users-list.json` — página 1, `meta.pages: 2`
- `users-list-page-2.json` — página 2

Comandos customizados em `cypress/support/commands.ts`:

- `cy.login()` — seta token no localStorage e visita `/admin/dashboard`
- `cy.logout()` — limpa o localStorage

---

## Autenticação

- Token salvo em `localStorage` como `'token'`
- Guard redireciona `/admin/dashboard` → `/admin` se sem token
- Guard redireciona `/admin` → `/admin/dashboard` se já autenticado
- Credenciais mock: `admin@email.com` / `123456`

---

## API

- Base URL via `VITE_API_URL` no `.env`
- Headers via `createApiHeaders()` em `config/environment.ts`
- `project_id` enviado como query param em todos os requests
- Fetch nativo (sem axios)
- Erros tratados com `if (!response.ok) throw new Error()`
