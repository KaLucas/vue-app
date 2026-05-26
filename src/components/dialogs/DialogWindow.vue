<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useUsersStore } from '@/stores/users'

const dialogStore = useDialogStore()
const usersStore = useUsersStore()

const handleClose = () => {
  if (!usersStore.loading) return

  dialogStore.closeModal()
}
</script>

<template>
  <div class="modal-wrapper" aria-modal="true" role="dialog" tabindex="-1" @click="handleClose">
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  .inner {
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: fit-content;
  }
}
</style>
