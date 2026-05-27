<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSnackbarStore } from '@/stores/snackbar'
import Snackbar from '@/components/Snackbar.vue'
const snackbarStore = useSnackbarStore()
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <Snackbar
      v-if="snackbarStore.isShowSnackbar"
      :text="snackbarStore.text"
      :type="snackbarStore.type"
      @close="snackbarStore.hideSnackbar()"
    />
  </Teleport>
</template>
