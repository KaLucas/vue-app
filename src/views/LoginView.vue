<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Snackbar from '@/components/Snackbar.vue'
import { useThemeStore } from '@/stores/theme'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const showError = ref(false)
const themeStore = useThemeStore()

themeStore.removeTheme()

const isFormValid = computed(() => !!email.value && !!password.value)

function goToList() {
  router.push('/')
}

function handleLogin() {
  const success = authStore.login(email.value, password.value)

  if (success && isFormValid) {
    router.push('/admin/dashboard')
  } else {
    showError.value = true
  }
}
</script>

<template>
  <div class="flex admin-home">
    <div class="access-list">
      <button type="button" @click="goToList()" data-testid="redirect-button-list">
        Acessar lista
      </button>
    </div>
    <div class="login-container flex">
      <img src="@/assets/vue-app.png" width="100%" height="auto" />
      <form class="flex" @submit.prevent="handleLogin()">
        <fieldset>
          <label for="email">Email*</label>
          <input
            class="border"
            id="email"
            type="email"
            title="email"
            v-model="email"
            required
            data-testid="login-email"
          />
        </fieldset>
        <fieldset>
          <label for="password">Senha*</label>
          <input
            class="border"
            id="password"
            type="password"
            title="password"
            v-model="password"
            required
            data-testid="login-password"
          />
        </fieldset>
        <button
          type="submit"
          class="border-radius"
          :class="{ disabled: !isFormValid }"
          :disabled="!isFormValid"
          data-testid="login-button"
        >
          Login
        </button>
      </form>
      <Snackbar
        v-if="showError"
        text="E-mail ou senha inválidos."
        type="error"
        @close="showError = false"
      />
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
    max-width: 100%;
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
