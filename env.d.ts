/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_KEY: string
  readonly VITE_ENV: string
  readonly VITE_PROJECT_ID: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
