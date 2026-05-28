import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from './auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('Should return false with invalid credentials', () => {
    const auth = useAuthStore()

    expect(auth.login('wrong@email.com', '123456')).toBe(false)
  })

  it('Should return true with valid credentials', () => {
    const auth = useAuthStore()

    expect(auth.login('admin@email.com', '123456')).toBe(true)
  })

  it('Should set token on valid login', () => {
    const auth = useAuthStore()

    auth.login('admin@email.com', '123456')

    expect(localStorage.getItem('token')).toBe('fake-token')
  })

  it('Should remove token on logout', () => {
    const auth = useAuthStore()

    auth.login('admin@email.com', '123456')
    auth.logout()

    expect(localStorage.getItem('token')).toBeNull()
  })

  it('Should set auth=true on valid login', () => {
    const auth = useAuthStore()

    auth.login('admin@email.com', '123456')

    expect(auth.auth).toBe(true)
  })

  it('Should set auth=false on logout', () => {
    const auth = useAuthStore()

    auth.login('admin@email.com', '123456')
    auth.logout()

    expect(auth.auth).toBe(false)
  })
})
