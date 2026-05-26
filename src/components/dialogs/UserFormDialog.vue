<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useUsersStore } from '@/stores/users'
import { Loader2 } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const dialogStore = useDialogStore()
const usersStore = useUsersStore()
const { loading } = storeToRefs(usersStore)
const { selectedUser: user } = storeToRefs(dialogStore)

const form = ref({
  first_name: user.value?.first_name ?? '',
  last_name: user.value?.last_name ?? '',
  email: user.value?.email ?? '',
})

watch(
  user,
  (value) => {
    if (!value) return

    form.value = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
    }
  },
  { immediate: true },
)
async function handleSubmit() {
  if (loading.value) return

  if (user.value?.id) {
    await usersStore.updateUser(form.value, user.value.id)
  } else {
    await usersStore.createUser(form.value)
  }

  dialogStore.closeModal()
}
</script>

<template>
  <form role="dialog" @submit.prevent="handleSubmit">
    <h3>{{ user?.id ? 'Editar usuário' : 'Cadastrar novo usuário' }}</h3>
    <div class="dialog-content flex">
      <input type="text" class="border" placeholder="Nome" v-model="form.first_name" required />
      <input type="text" class="border" placeholder="Sobrenome" v-model="form.last_name" />
      <input type="email" class="border" placeholder="E-mail" v-model="form.email" required />
    </div>
    <div class="dialog-actions flex">
      <button
        type="button"
        class="border-radius"
        @click="dialogStore.closeModal()"
        :class="{ disabled: loading }"
      >
        Cancelar
      </button>
      <button class="border-radius" type="submit" :class="{ disabled: loading }">
        <Loader2 :size="16" class="spinning" v-if="loading" />
        <template v-else>{{ user?.id ? 'Editar' : 'Salvar' }}</template>
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
.dialog-content {
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  .user-data {
    gap: 10px;
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
