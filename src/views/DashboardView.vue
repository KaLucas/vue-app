<script setup lang="ts">
import UsersList from '@/components/UsersList.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <main class="flex">
    <Sidebar />
    <UsersList />
  </main>
</template>

<style lang="css" scoped>
main {
  flex-direction: row;
}
</style>
