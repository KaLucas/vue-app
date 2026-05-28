import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSnackbarStore } from './snackbar'

describe('Snackbar Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Should be created', () => {
    const snackbar = useSnackbarStore()

    expect(snackbar).toBeTruthy()
  })

  it('Should show snackbar with success message', () => {
    const snackbar = useSnackbarStore()

    snackbar.showSnackbar('Success message', 'success')

    expect(snackbar.text).toBe('Success message')
    expect(snackbar.type).toBe('success')
    expect(snackbar.isShowSnackbar).toBe(true)
  })

  it('Should show snackbar with error message', () => {
    const snackbar = useSnackbarStore()

    snackbar.showSnackbar('Error message', 'error')

    expect(snackbar.text).toBe('Error message')
    expect(snackbar.type).toBe('error')
    expect(snackbar.isShowSnackbar).toBe(true)
  })

  it('Should hide snackbar', () => {
    const snackbar = useSnackbarStore()

    snackbar.showSnackbar('Test', 'success')
    snackbar.hideSnackbar()

    expect(snackbar.isShowSnackbar).toBe(false)
  })
})
