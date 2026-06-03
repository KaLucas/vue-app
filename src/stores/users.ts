import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_CONFIG, createApiHeaders } from '../config/environment'
import type {
  DatagridUsersList,
  GetUsersParams,
  GetUsersResponse,
  UserFormData,
} from '@/models/user.model'
import { useSnackbarStore } from './snackbar'

const baseUrl = `${API_CONFIG.baseUrl}collections/users/records`

export const useUsersStore = defineStore('users', () => {
  const users = ref<DatagridUsersList[]>([])
  const meta = ref({ page: 1, limit: 10, total: 0, pages: 1 })
  const loading = ref(false)
  const error = ref(false)
  const snackbarStore = useSnackbarStore()

  const fetchUsers = async (params?: GetUsersParams) => {
    loading.value = true
    error.value = false
    try {
      const url = new URL(baseUrl)
      url.searchParams.set('project_id', String(API_CONFIG.projectId))
      if (params?.page) url.searchParams.set('page', String(params.page))
      if (params) url.searchParams.set('limit', '10')

      const response = await fetch(url.toString(), {
        headers: createApiHeaders(),
      })
      const data: GetUsersResponse = await response.json()
      users.value = data.data.map((user) => ({
        id: user.id,
        email: user.data.email,
        first_name: user.data.first_name,
        last_name: user.data.last_name,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }))
      meta.value = data.meta
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
    loading.value = true
    try {
      const url = new URL(`${baseUrl}/${id}`)
      url.searchParams.set('project_id', String(API_CONFIG.projectId))

      const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: createApiHeaders(),
      })

      if (!response.ok) throw new Error()

      snackbarStore.showSnackbar('Usuário deletado com sucesso.', 'success')
      await fetchUsers({ page: meta.value.page })
    } catch {
      snackbarStore.showSnackbar('Erro ao deletar usuário.', 'error')
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (data: UserFormData, id: string) => {
    loading.value = true
    try {
      const url = new URL(`${baseUrl}/${id}`)
      url.searchParams.set('project_id', String(API_CONFIG.projectId))

      const response = await fetch(url.toString(), {
        method: 'PUT',
        body: JSON.stringify({
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          },
        }),
        headers: createApiHeaders(),
      })

      if (!response.ok) throw new Error()

      snackbarStore.showSnackbar('Usuário salvo com sucesso.', 'success')
      await fetchUsers({ page: meta.value.page })
    } catch (error) {
      snackbarStore.showSnackbar('Erro ao salvar usuário.', 'error')
    } finally {
      loading.value = false
    }
  }

  const createUser = async (data: UserFormData) => {
    loading.value = true
    try {
      const url = new URL(`${baseUrl}`)
      url.searchParams.set('project_id', String(API_CONFIG.projectId))

      const response = await fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          },
        }),
        headers: createApiHeaders(),
      })

      if (!response.ok) throw new Error()

      snackbarStore.showSnackbar('Usuário criado com sucesso.', 'success')
      await fetchUsers({ page: meta.value.page })
    } catch (error) {
      snackbarStore.showSnackbar('Erro ao criar novo usuário.', 'error')
    } finally {
      loading.value = false
    }
  }

  return { users, loading, fetchUsers, meta, deleteUser, updateUser, createUser, error }
})
