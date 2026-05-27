<template>
  <div class="modal-wrapper" aria-modal="true" role="dialog" tabindex="-1">
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
