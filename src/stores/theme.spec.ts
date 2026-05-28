import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useThemeStore } from './theme'

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    localStorage.clear()

    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    localStorage.clear()

    document.documentElement.setAttribute('data-theme', 'light')
  })

  it('Should create', () => {
    const theme = useThemeStore()

    expect(theme).toBeTruthy()
  })

  it('Should start with light theme by default', () => {
    const theme = useThemeStore()

    expect(theme.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('Should toggle to dark mode', () => {
    const theme = useThemeStore()

    theme.toggleTheme()

    expect(theme.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('Should toggle back to light mode', () => {
    const theme = useThemeStore()

    // Dark
    theme.toggleTheme()

    // Back to light
    theme.toggleTheme()

    expect(theme.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('Should initialize theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')

    const theme = useThemeStore()

    theme.initTheme()

    expect(theme.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('Should remove theme', () => {
    const theme = useThemeStore()

    theme.toggleTheme()
    theme.removeTheme()

    expect(localStorage.getItem('theme')).toBeNull()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
