import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './LoginView.vue'

describe('LoginView', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  })

  beforeEach(() => {
    setActivePinia(createPinia())

    vi.spyOn(router, 'push').mockResolvedValue(undefined)
  })

  it('Should create', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('Should render login button', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const button = wrapper.find('[data-testid="login-button"]')

    expect(button.text()).toContain('Login')
  })

  it('Should disable button when form is invalid', () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    const button = wrapper.find('[data-testid="login-button"]').element as HTMLButtonElement

    expect(button.disabled).toBe(true)
  })

  it('Should enable button when form is valid', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('[data-testid="login-email"]').setValue('admin@email.com')
    await wrapper.find('[data-testid="login-password"]').setValue('123456')

    const button = wrapper.find('[data-testid="login-button"]').element as HTMLButtonElement

    expect(button.disabled).toBe(false)
  })

  it('Should redirect on valid login', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('[data-testid="login-email"]').setValue('admin@email.com')
    await wrapper.find('[data-testid="login-password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(router.push).toHaveBeenCalledWith('/admin/dashboard')
  })

  it('Should show error on invalid login', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('[data-testid="login-email"]').setValue('wrong@email.com')
    await wrapper.find('[data-testid="login-password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('E-mail ou senha inválidos.')
  })

  it('Should redirect to list page', async () => {
    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.find('[data-testid="redirect-button-list"]').trigger('click')

    expect(router.push).toHaveBeenCalledWith('/')
  })
})
