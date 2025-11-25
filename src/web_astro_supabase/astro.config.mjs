/// <reference types="astro/client" />
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import vercelServerless from '@astrojs/vercel/serverless';

const adapter = process.env.VERCEL
  ? vercelServerless()
  : node({ mode: "standalone" });

export default defineConfig({
  adapter,
  output: "server",
});