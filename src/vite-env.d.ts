/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PRODUCT: string
  readonly VITE_BASE_URL
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
