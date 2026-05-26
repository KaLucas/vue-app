<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { Loader2 } from '@lucide/vue'

const usersStore = useUsersStore()
const { users, loading } = storeToRefs(usersStore)

onMounted(async () => {
  await usersStore.fetchUsers()
})
</script>

<template>
  <Loader2 :size="64" class="spinning" v-if="loading" />
  <main v-else>
    <div class="card-wrapper">
      <div class="card-content">
        <div class="card border" v-for="user in users" :key="user.id">
          <h3>{{ user.first_name }} {{ user.last_name }}</h3>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped>
main {
  .card-wrapper {
    width: 1200px;
    margin: 0 auto;
    .card-content {
      padding: 48px 24px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      .card {
        border-radius: 8px;
        padding: 16px 16px 24px 16px;
        background-color: var(--color-background-soft);
        h3 {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
