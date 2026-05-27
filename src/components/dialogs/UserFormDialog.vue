<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useUsersStore } from '@/stores/users'
import { Loader2 } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

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

const isFormValid = computed(() => !!form.value.first_name && !!form.value.email)

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
    <h2 data-testid="user-form-title">
      {{ user?.id ? 'Editar usuário' : 'Cadastrar novo usuário' }}
    </h2>
    <div class="dialog-content flex">
      <input
        type="text"
        class="border"
        placeholder="Nome"
        v-model="form.first_name"
        required
        data-testid="input-first-name"
      />
      <input
        type="text"
        class="border"
        placeholder="Sobrenome"
        v-model="form.last_name"
        data-testid="input-last-name"
      />
      <input
        type="email"
        class="border"
        placeholder="E-mail"
        v-model="form.email"
        required
        data-testid="input-email"
      />
    </div>
    <div class="dialog-actions flex">
      <button
        type="button"
        class="border-radius"
        @click="dialogStore.closeModal()"
        :class="{ disabled: loading }"
        :disabled="!isFormValid"
      >
        Cancelar
      </button>
      <button
        class="border-radius"
        type="submit"
        :class="{ disabled: loading || !isFormValid }"
        :disabled="!isFormValid"
      >
        <Loader2 :size="16" class="spinning" v-if="loading" />
        <template v-else>{{ user?.id ? 'Salvar' : 'Criar' }}</template>
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
