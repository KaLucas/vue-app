<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

defineProps<{
  text: string
  type: 'error' | 'success'
}>()

const emit = defineEmits(['close'])

let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  timer = setTimeout(() => emit('close'), 5000)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="snackbar" :class="type">
    <p>{{ text }}</p>
  </div>
</template>

<style lang="css" scoped>
.snackbar {
  width: 300px;
  min-height: 50px;
  color: var(--vt-c-black-soft);
  padding: 10px 20px;
  border-radius: 8px;
  position: absolute;
  bottom: 50px;
  &.error {
    background-color: #ffebee;
  }
  &.success {
    background-color: var(--light-green-3);
  }
}
</style>
