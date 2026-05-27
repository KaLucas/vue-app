import type { RouteLocationNormalized } from 'vue-router'

export function authGuard(to: RouteLocationNormalized) {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  if (to.name === 'dashboard' && !isAuthenticated) {
    return { name: 'admin' }
  }

  if (to.name === 'admin' && isAuthenticated) {
    return { name: 'dashboard' }
  }
}
