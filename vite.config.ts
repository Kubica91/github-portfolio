/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { copyFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        {
            name: "spa-fallback",
            closeBundle() {
                const dist = resolve(__dirname, "dist");
                copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
            },
        },
    ],
    base: "/github-portfolio",
});
