import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardView from './DashboardView.vue'

describe('Dashboard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Should create', () => {
    const wrapper = mount(DashboardView)
    expect(wrapper).toBeTruthy()
  })

  it('Should render sidebar and users list', () => {
    const wrapper = mount(DashboardView)
    expect(wrapper.find('[data-testid="sidebar-component"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="users-list-component"]').exists()).toBe(true)
  })
})
