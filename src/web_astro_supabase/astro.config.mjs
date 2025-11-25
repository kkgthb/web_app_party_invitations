/// <reference types="astro/client" />
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({
    mode: "standalone"
  }),
  output: "server",
});