<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useUsersStore } from '@/stores/users'
import { Loader2 } from '@lucide/vue'

const dialogStore = useDialogStore()
const usersStore = useUsersStore()
const user = dialogStore.selectedUser

async function handleDelete() {
  await usersStore.deleteUser(user?.id as string)

  dialogStore.closeModal()
}
</script>

<template>
  <form role="dialog" @submit.prevent>
    <h3>
      Deseja deletar o usuário <span>{{ user?.first_name }} {{ user?.last_name }}</span
      >?
    </h3>
    <div class="dialog-actions flex">
      <button @click="dialogStore.closeModal()" class="border-radius">Cancelar</button>
      <button
        class="border-radius"
        @click="handleDelete()"
        :class="{ disabled: usersStore.loading }"
      >
        <Loader2 :size="16" class="spinning" v-if="usersStore.loading" />
        <template v-else>Confirmar</template>
      </button>
    </div>
  </form>
</template>

<style lang="css">
h3 {
  span {
    font-weight: bold;
  }
}
.dialog-actions {
  margin-top: 10px;
  gap: 20px;
  .spinning {
    margin: 0 auto;
  }
}
</style>
