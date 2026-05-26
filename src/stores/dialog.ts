import type { DatagridUsersList } from '@/models/user.model'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const modalType = ref<'delete' | 'add-edit' | null>(null)
  const selectedUser = ref<DatagridUsersList | null>(null)

  function openModal(type: 'delete' | 'add-edit', user?: DatagridUsersList) {
    modalType.value = type
    selectedUser.value = user ?? null
  }

  function modalIsActive(type: 'delete' | 'add-edit') {
    return modalType.value === type
  }

  function closeModal() {
    modalType.value = null
  }

  return { modalIsActive, openModal, closeModal, selectedUser }
})
