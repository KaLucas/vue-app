<script setup lang="ts">
import type { DatagridUsersList } from '@/models/user.model'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { onMounted, ref, Teleport } from 'vue'
import { ChevronLeft, ChevronRight, Edit, Trash } from '@lucide/vue'
import { useDialogStore } from '@/stores/dialog'
import DeleteDialog from './dialogs/DeleteDialog.vue'
import DialogWindow from './dialogs/DialogWindow.vue'
import { formatDate } from '@/utils/format-date'
import UserFormDialog from './dialogs/UserFormDialog.vue'

const usersStore = useUsersStore()
const dialogStore = useDialogStore()
const { users, loading, meta } = storeToRefs(usersStore)

const columns = ref<{ key: keyof DatagridUsersList; label: string }[]>([
  { key: 'first_name', label: 'Nome' },
  { key: 'last_name', label: 'Sobrenome' },
  { key: 'email', label: 'E-mail' },
  { key: 'created_at', label: 'Criado em' },
  { key: 'updated_at', label: 'Atualizado em' },
])

const isDateColumn = (key: keyof DatagridUsersList) => {
  return key === 'created_at' || key === 'updated_at'
}

const formatCellValue = (user: DatagridUsersList, key: keyof DatagridUsersList) => {
  const value = user[key]

  if (isDateColumn(key)) {
    return formatDate(value)
  }

  return value
}

onMounted(async () => {
  await usersStore.fetchUsers({ page: 1 })
})

function changePage(page: number) {
  usersStore.fetchUsers({ page })
}
</script>

<template>
  <div class="table-wrapper flex">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th>Ações</th>
        </tr>
        <tr v-if="loading">
          <td :colspan="columns.length + 1" class="progress-cell">
            <div class="progress-bar">
              <div class="fill"></div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <template v-if="users.length">
          <tr v-for="user in users" :key="user.id">
            <td v-for="col in columns" :key="col.key">
              {{ formatCellValue(user, col.key) }}
            </td>
            <td>
              <div class="action-buttons flex">
                <Edit :size="20" @click="dialogStore.openModal('user-form', user)" />
                <Trash :size="20" @click="dialogStore.openModal('delete', user)" />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <p class="empty" v-if="!users.length && !loading">Resultado não encontrado.</p>

    <div class="pagination flex">
      <button
        type="button"
        class="flex"
        :disabled="meta.page === 1"
        @click="changePage(meta.page - 1)"
      >
        <ChevronLeft />Anterior
      </button>
      <span>{{ meta.page }} / {{ meta.pages }}</span>
      <button
        type="button"
        class="flex"
        :disabled="meta.page === meta.pages"
        @click="changePage(meta.page + 1)"
      >
        Próxima <ChevronRight />
      </button>
    </div>
  </div>
  <Teleport to="body">
    <DialogWindow v-if="dialogStore.modalIsActive('delete')">
      <DeleteDialog />
    </DialogWindow>
    <DialogWindow v-if="dialogStore.modalIsActive('user-form')">
      <UserFormDialog />
    </DialogWindow>
  </Teleport>
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
  table {
    border-collapse: collapse;
    width: 100%;
    td,
    th {
      border: 1px solid var(--vt-c-white-mute);
      padding: 8px;
    }

    tr {
      &:nth-child(even) {
        background-color: var(--vt-c-white-mute);
      }
    }

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: var(--highlight);
      color: white;
    }
    .action-buttons {
      gap: 10px;
      cursor: pointer;
    }
    p {
      &.empty {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-top: 100px;
      }
    }
  }
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 3px;
  background: var(--surface-primary);
  overflow: hidden;
  margin-top: 8px;
  .fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    background: var(--brand);
    animation: progress-bar-move 1.5s linear infinite;
  }
}

@keyframes progress-bar-move {
  from {
    left: -30%;
  }

  to {
    left: 100%;
  }
}
</style>
