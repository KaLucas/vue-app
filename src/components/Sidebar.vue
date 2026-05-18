<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()

function handleLogout() {
  store.logout()
  router.push('/admin')
}
</script>

<template>
  <div><button @click="handleLogout()">Logout</button></div>
</template>
