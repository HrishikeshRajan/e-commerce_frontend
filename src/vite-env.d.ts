/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PRODUCT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
