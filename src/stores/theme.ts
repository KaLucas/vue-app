import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function initTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function removeTheme() {
    localStorage.removeItem('theme')
    document.documentElement.setAttribute('data-theme', 'light')
  }

  return { theme, toggleTheme, initTheme, removeTheme }
})
