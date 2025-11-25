/// <reference types="astro/client" />
import { defineConfig } from "astro/config";
import vercelServerless from '@astrojs/vercel/serverless';

export default defineConfig({
  adapter: vercelServerless(),
  output: "server",
});