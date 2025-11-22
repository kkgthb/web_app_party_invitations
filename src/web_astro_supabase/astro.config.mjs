/// <reference types="astro/client" />
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_HELLO } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({});
