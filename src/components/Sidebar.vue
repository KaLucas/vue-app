<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'
import { formatDate } from '@/utils/format-date'
import { LogOut, Users } from '@lucide/vue'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const usersStore = useUsersStore()
const { users, meta } = storeToRefs(usersStore)

function handleLogout() {
  authStore.logout()
  router.push('/admin')
}
</script>

<template>
  <aside data-testid="sidebar-component">
    <div class="sidebar-wrapper flex">
      <div class="top-sidebar">
        <div class="user-summary-card flex" data-testid="user-summary-card">
          <div class="users-data flex">
            <Users />
            <p class="users-title">Total de usuários</p>
          </div>
          <p class="users-total" data-testid="sidebar-count">{{ meta.total }}</p>
          <p class="users-last-update">Último cadastro: {{ formatDate(users[0]?.created_at) }}</p>
        </div>
      </div>
      <div class="bottom-sidebar">
        <div class="logout">
          <button
            type="button"
            class="border-radius flex"
            @click="handleLogout()"
            data-testid="logout-button"
          >
            <LogOut />Logout
          </button>
        </div>
        <div class="img-wrapper">
          <img src="@/assets/vue-app.png" alt="Vue App Logo" class="logo" />
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="css" scoped>
aside {
  min-width: 270px;
  min-height: 100vh;
  border-right: 1px solid var(--color-border);
  .sidebar-wrapper {
    min-height: 100vh;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;
    .top-sidebar {
      p {
        color: var(--color-text);
      }
      .user-summary-card {
        flex: 1;
        box-sizing: border-box;
        border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--border) 30%, transparent);
        padding: 24px;
        flex-direction: column;
        .users-data {
          flex-direction: row;
          align-items: center;
          gap: 10px;
          .lucide-users-icon {
            color: var(--brand);
            line-height: normal;
          }
          p {
            font-size: 15px;
          }
        }
        .users-total {
          font-size: 34px;
          font-weight: bold;
          opacity: 1;
        }
        .users-last-update {
          font-size: 14px;
        }
      }
    }
    .bottom-sidebar {
      .logout {
        margin-bottom: 32px;
        align-items: center;
        button {
          font-size: 16px;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: green;
        }
      }
      .img-wrapper {
        border-top: 1px solid var(--color-border);
        padding: 16px;
        img {
          display: block;
          width: 120px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
