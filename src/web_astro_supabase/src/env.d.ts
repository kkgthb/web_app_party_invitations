/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_HELLO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
