import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import Main from './MainView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from '@/stores/users'

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

describe('Main', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('Should create', () => {
    const wrapper = mount(Main)
    expect(wrapper).toBeTruthy()
  })

  it('Should render title', async () => {
    const usersStore = useUsersStore()
    usersStore.users = mockData
    usersStore.meta = { page: 1, limit: 10, total: 2, pages: 1 }

    const wrapper = mount(Main)

    await wrapper.vm.$nextTick()
    console.log('wrapper', wrapper.find('h2'))

    expect(wrapper.find('h2').text()).toBe('Usuários cadastrados')
  })
})
