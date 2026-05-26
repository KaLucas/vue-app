import type { DatagridUsersList } from '@/models/user.model'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const modalType = ref<'delete' | 'user-form' | null>(null)
  const selectedUser = ref<DatagridUsersList | null>(null)

  function openModal(type: 'delete' | 'user-form', user?: DatagridUsersList) {
    modalType.value = type
    selectedUser.value = user ?? null
  }

  function modalIsActive(type: 'delete' | 'user-form') {
    return modalType.value === type
  }

  function closeModal() {
    modalType.value = null
  }

  return { modalIsActive, openModal, closeModal, selectedUser }
})
