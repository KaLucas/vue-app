import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { useThemeStore } from './stores/theme'

const app = createApp(App)
app.use(router)

app.use(createPinia())
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
