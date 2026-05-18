import { defineStore } from 'pinia'
import { ref } from 'vue'

const USER = {
  email: 'admin@email.com',
  password: '123456',
}

export const useAuthStore = defineStore('auth', () => {
  const auth = ref(!!localStorage.getItem('token'))

  function login(email: string, password: string) {
    if (email === USER.email && password === USER.password) {
      localStorage.setItem('token', 'fake-token')
      auth.value = true
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem('token')
    auth.value = false
  }

  return { auth, login, logout }
})
