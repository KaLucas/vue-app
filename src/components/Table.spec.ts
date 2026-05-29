import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from '@/stores/users'
import Table from './Table.vue'

const mockData = [
  {
    id: 'ec5dfe28',
    first_name: 'Ana',
    last_name: 'Marina',
    email: 'ana@email.com',
    created_at: '2026-05-11T19:29:33.993Z',
    updated_at: '2026-05-11T19:29:33.993Z',
  },
  {
    id: 'da73f9be',
    first_name: 'José',
    last_name: 'Silveira',
    email: 'jose@email.com',
    created_at: '2026-05-08T21:54:22.250Z',
    updated_at: '2026-05-11T19:22:04.907Z',
  },
]

describe('Table', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Should create', () => {
    const wrapper = mount(Table)
    expect(wrapper).toBeTruthy()
  })

  it('Should render table data', async () => {
    const usersStore = useUsersStore()

    vi.spyOn(usersStore, 'fetchUsers').mockImplementation(async () => {
      usersStore.users = mockData
      usersStore.meta = {
        page: 1,
        limit: 10,
        total: 2,
        pages: 1,
      }
      usersStore.loading = false
    })

    const wrapper = mount(Table)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="users-list-result"]').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr')).toHaveLength(2)
  })
})
