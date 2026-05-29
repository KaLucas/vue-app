import { describe, it, expect, beforeEach } from 'vitest'
import { authGuard } from '@/guards/auth.guard'

describe('Auth Guard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Should redirect to /admin if not authenticated', () => {
    const result = authGuard({ name: 'dashboard' } as any)

    expect(result).toEqual({ name: 'admin' })
  })

  it('Should redirect to /dashboard if already authenticated', () => {
    localStorage.setItem('token', 'fake-token')
    const result = authGuard({ name: 'admin' } as any)

    expect(result).toEqual({ name: 'dashboard' })
  })

  it('Should allow access if authenticated', () => {
    localStorage.setItem('token', 'fake-token')
    const result = authGuard({ name: 'dashboard' } as any)

    expect(result).toBeUndefined()
  })
})
