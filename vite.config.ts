/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), checker({ typescript: true })],
    base: "/github-portfolio",
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/tests/setup.ts",
        coverage: {
            provider: "v8",
            all: false,
        },
    },
});
