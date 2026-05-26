<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useUsersStore } from '@/stores/users'
import { Loader2 } from '@lucide/vue'
import { storeToRefs } from 'pinia'

const dialogStore = useDialogStore()
const usersStore = useUsersStore()
const { loading } = storeToRefs(usersStore)
const { selectedUser: user } = storeToRefs(dialogStore)

async function handleDelete() {
  if (loading.value || !user.value?.id) return

  await usersStore.deleteUser(user.value?.id as string)
  dialogStore.closeModal()
}
</script>

<template>
  <form role="dialog" @submit.prevent="handleDelete">
    <h3>
      Deseja deletar o usuário <span>{{ user?.first_name }} {{ user?.last_name }}</span
      >?
    </h3>
    <div class="dialog-actions flex">
      <button
        type="button"
        class="border-radius"
        @click="dialogStore.closeModal()"
        :class="{ disabled: loading }"
      >
        Cancelar
      </button>
      <button type="submit" class="border-radius" :class="{ disabled: loading }">
        <Loader2 :size="16" class="spinning" v-if="loading" />
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
