/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PRODUCT: string
  readonly VITE_BASE_URL: string
  readonly VITE_RECAPTCHA_SITE_KEY : string
  readonly VITE_RECAPTCHA_SITE_KEY_DEV : string
  readonly VITE_PROCESS_ENV : string
  readonly VITE_COMPANY_LOGO : string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
