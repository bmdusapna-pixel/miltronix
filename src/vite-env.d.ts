/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_BUILDER_KEY: string;
  readonly VITE_BASE_URL: string;
  // add more variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
