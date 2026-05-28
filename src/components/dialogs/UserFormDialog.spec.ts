import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'
import UserFormDialog from './UserFormDialog.vue'
import { useDialogStore } from '@/stores/dialog'

describe('UserFormDialog', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('Should create', () => {
    const wrapper = mount(UserFormDialog)
    expect(wrapper).toBeTruthy()
  })

  describe('Create user', () => {
    it('Should have empty form', async () => {
      const wrapper = mount(UserFormDialog)
      await wrapper.vm.$nextTick()

      expect(
        (wrapper.find('[data-testid="input-first-name"]').element as HTMLInputElement).value,
      ).toBe('')
      expect(
        (wrapper.find('[data-testid="input-last-name"]').element as HTMLInputElement).value,
      ).toBe('')
      expect((wrapper.find('[data-testid="input-email"]').element as HTMLInputElement).value).toBe(
        '',
      )
    })
  })

  describe('Edit user', () => {
    it('Should populate form with user data', async () => {
      const dialogStore = useDialogStore()
      dialogStore.selectedUser = {
        id: '1',
        first_name: 'Karina',
        last_name: 'Lucas',
        email: 'karina@email.com',
        created_at: '2026-05-11T19:29:33.993Z',
        updated_at: '2026-05-11T19:29:33.993Z',
      }
      const wrapper = mount(UserFormDialog)
      await wrapper.vm.$nextTick()

      expect(
        (wrapper.find('[data-testid="input-first-name"]').element as HTMLInputElement).value,
      ).toContain('Karina')
      expect(
        (wrapper.find('[data-testid="input-last-name"]').element as HTMLInputElement).value,
      ).toContain('Lucas')
      expect(
        (wrapper.find('[data-testid="input-email"]').element as HTMLInputElement).value,
      ).toContain('karina@email.com')
    })
  })
})
