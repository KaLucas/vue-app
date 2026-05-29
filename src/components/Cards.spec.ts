import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from '@/stores/users'
import Cards from './Cards.vue'

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

describe('Cards', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Should create', () => {
    const wrapper = mount(Cards)

    expect(wrapper).toBeTruthy()
  })

  it('Should render cards content', async () => {
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

    const wrapper = mount(Cards)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="card-content"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="card-content"] > div')).toHaveLength(2)
  })
})
