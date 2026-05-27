import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const text = ref('')
  const type = ref<'error' | 'success'>('success')
  const isShowSnackbar = ref(false)

  function showSnackbar(message: string, snackbarType: 'error' | 'success') {
    text.value = message
    type.value = snackbarType
    isShowSnackbar.value = true
  }

  function hideSnackbar() {
    isShowSnackbar.value = false
  }

  return { text, type, isShowSnackbar, showSnackbar, hideSnackbar }
})
