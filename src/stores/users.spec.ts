import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from './users'

describe('Users Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.restoreAllMocks()
  })

  it('Should fetch users', async () => {
    const store = useUsersStore()

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            data: {
              email: 'ana@email.com',
              first_name: 'Ana',
              last_name: 'Silva',
            },
            created_at: '2025-01-01',
            updated_at: '2025-01-01',
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          pages: 1,
        },
      }),
    } as Response)

    await store.fetchUsers()

    expect(store.users).toHaveLength(1)

    expect(store.users[0]).toEqual({
      id: '1',
      email: 'ana@email.com',
      first_name: 'Ana',
      last_name: 'Silva',
      created_at: '2025-01-01',
      updated_at: '2025-01-01',
    })

    expect(store.meta.total).toBe(1)
  })

  it('Should create user', async () => {
    const store = useUsersStore()

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 1,
          },
        }),
      } as Response)

    await store.createUser({
      first_name: 'Ana',
      last_name: 'Silva',
      email: 'ana@email.com',
    })

    expect(fetch).toHaveBeenCalled()
  })

  it('Should update user', async () => {
    const store = useUsersStore()

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 1,
          },
        }),
      } as Response)

    await store.updateUser(
      {
        first_name: 'Ana',
        last_name: 'Silva',
        email: 'ana@email.com',
      },
      '1',
    )

    expect(fetch).toHaveBeenCalled()
  })

  it('Should delete user', async () => {
    const store = useUsersStore()

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          meta: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 1,
          },
        }),
      } as Response)

    await store.deleteUser('1')

    expect(fetch).toHaveBeenCalled()
  })

  it('Should set loading during request', async () => {
    const store = useUsersStore()

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          pages: 1,
        },
      }),
    } as Response)

    const promise = store.fetchUsers()

    expect(store.loading).toBe(true)

    await promise

    expect(store.loading).toBe(false)
  })

  it('Should handle fetch error', async () => {
    const store = useUsersStore()

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('API Error'))

    await store.fetchUsers()

    expect(store.loading).toBe(false)
  })
})
