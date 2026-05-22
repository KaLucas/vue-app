<script setup lang="ts">
import type { DatagridUsersList } from '@/models/user.model'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { Loader2, ChevronLeft, ChevronRight } from '@lucide/vue'

const store = useUsersStore()
const { users, loading, meta } = storeToRefs(store)

const columns = ref<{ key: keyof DatagridUsersList; label: string }[]>([
  { key: 'first_name', label: 'Nome' },
  { key: 'last_name', label: 'Sobrenome' },
  { key: 'email', label: 'E-mail' },
  { key: 'created_at', label: 'Criado em' },
  { key: 'updated_at', label: 'Atualizado em' },
])

onMounted(async () => {
  await store.fetchUsers({ page: 1 })
})

function changePage(page: number) {
  store.fetchUsers({ page })
}
</script>

<template>
  <Loader2 :size="64" class="spinning" v-if="loading" />
  <template v-else>
    <template v-if="users.length">
      <div class="table-wrapper flex">
        <table>
          <thead>
            <tr>
              <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td v-for="col in columns" :key="col.key">
                {{ user[col.key] }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination flex">
          <button class="flex" :disabled="meta.page === 1" @click="changePage(meta.page - 1)">
            <ChevronLeft />Anterior
          </button>
          <span>{{ meta.page }} / {{ meta.pages }}</span>
          <button
            class="flex"
            :disabled="meta.page === meta.pages"
            @click="changePage(meta.page + 1)"
          >
            Próxima <ChevronRight />
          </button>
        </div>
      </div>
    </template>

    <p class="empty" v-else>Resultado não encontrado.</p>
  </template>
</template>

<style lang="css" scoped>
.table-wrapper {
  flex-direction: column;
  gap: 20px;
  .pagination {
    gap: 20px;
    align-items: center;
    justify-content: flex-end;
    button {
      align-items: center;
      background-color: transparent;
      color: var(--text-primary);
      width: auto;
      gap: 5px;
    }
    span {
      display: block;
      font-size: 12px;
    }
  }
}
p {
  &.empty {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
