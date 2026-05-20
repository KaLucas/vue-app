import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_CONFIG, createApiHeaders } from '../config/environment'
import type { DatagridUsersList, User } from '@/models/user.model'

interface GetUsersResponse {
  data: User[]
  meta: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const baseUrl = API_CONFIG.baseUrl

export const useUsersStore = defineStore('users', () => {
  const users = ref<DatagridUsersList[]>([])
  const meta = ref({ page: 1, limit: 10, total: 0, pages: 1 })
  const loading = ref(false)

  const fetchUsers = async (page = 1) => {
    loading.value = true
    try {
      const url = new URL(`${baseUrl}collections/users/records`)
      url.searchParams.set('page', String(page))
      url.searchParams.set('limit', String(meta.value.limit))

      const response = await fetch(url.toString(), { headers: createApiHeaders() })
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
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return { users, loading, fetchUsers, meta }
})
