<script setup lang="ts">
import Cards from '@/components/Cards.vue'
import router from '@/router'
import { useThemeStore } from '@/stores/theme'
import { Moon, Sun } from '@lucide/vue'

const ThemeStore = useThemeStore()

function handleRedirect() {
  router.push('/admin')
}
</script>

<template>
  <header class="flex">
    <h2>Usuários cadastrados</h2>
    <div class="actions-header flex">
      <button class="icon" @click="ThemeStore.toggleTheme()">
        <Moon :size="21" v-if="ThemeStore.theme === 'light'" />
        <Sun :size="21" v-else />
      </button>
      <div class="redirect-button-list">
        <button class="redirect" @click="handleRedirect()">Acessar admin</button>
      </div>
    </div>
  </header>
  <Cards />
</template>

<style lang="css" scoped>
header {
  height: 65px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--highlight);
  border-bottom: 1px solid var(--color-border);
  padding: 0 24px;
  h2 {
    color: var(--text-on-brand);
    font-weight: bold;
  }
  .actions-header {
    flex-direction: row;
    gap: 16px;
    align-items: center;
    button {
      &.icon {
        color: var(--text-on-brand);
        background-color: transparent;
      }
      &.redirect {
        width: 130px;
        border-radius: 20px;
      }
    }
  }
}
</style>
