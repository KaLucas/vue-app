<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

function goToList() {
  router.push('/')
}

function handleLogin(email: string, password: string) {
  const success = store.login(email, password)

  if (success) {
    router.push('/admin/dashboard')
  } else {
    // mostrar erro pro usuário
    alert('erro')
  }
}
</script>

<template>
  <div class="flex admin-home">
    <div class="access-list">
      <button @click="goToList()">Acessar lista</button>
    </div>
    <div class="login-container flex">
      <img src="@/assets/vue-app.png" />
      <form class="flex" @submit.prevent="handleLogin(email, password)">
        <fieldset>
          <label for="email">Email*</label>
          <input type="email" title="email" v-model="email" />
        </fieldset>
        <fieldset>
          <label for="password">Senha*</label>
          <input type="password" title="password" v-model="password" />
        </fieldset>
        <button type="submit" class="base">Login</button>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.admin-home {
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  .access-list {
    margin-top: 24px;
    margin-right: 24px;
    justify-content: flex-end;
    display: flex;
    button {
      width: 130px;
      border-radius: 20px;
    }
  }
  .login-container {
    width: 300px;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: 16px;
    form {
      flex-direction: column;
      gap: 16px;
    }
  }
}
</style>
