<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import Table from './Table.vue'
import { Plus } from '@lucide/vue'

const dialogStore = useDialogStore()
</script>

<template>
  <section>
    <div class="top-section flex">
      <h2>Lista de Usuários</h2>
      <button type="button" class="border-radius flex" @click="dialogStore.openModal('user-form')">
        <Plus :size="20" />
        Cadastrar novo
      </button>
    </div>
    <Table />
  </section>
</template>

<style lang="css" scoped>
section {
  padding: 16px;
  width: 100%;
  .top-section {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    button {
      width: 170px;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  }
}
</style>
