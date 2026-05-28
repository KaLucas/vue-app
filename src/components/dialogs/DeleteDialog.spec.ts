import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'
import DeleteDialog from './DeleteDialog.vue'
import { mount } from '@vue/test-utils'
import { useDialogStore } from '@/stores/dialog.ts'

describe('DeleteDialog', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('Should create', () => {
    const wrapper = mount(DeleteDialog)
    expect(wrapper).toBeTruthy()
  })

  it('Should display user name on dialog title', async () => {
    const dialogStore = useDialogStore()
    dialogStore.selectedUser = {
      id: '1',
      first_name: 'Karina',
      last_name: 'Lucas',
      email: 'karina@email.com',
      created_at: '2026-05-11T19:29:33.993Z',
      updated_at: '2026-05-11T19:29:33.993Z',
    }

    const wrapper = mount(DeleteDialog)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-testid="delete-title"]').text()).toContain('Karina')
    expect(wrapper.find('[data-testid="delete-title"]').text()).toContain('Lucas')
  })
})
