/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

const copyWebIfcWasm = () => {
    const targetDir = resolve(__dirname, "public", "wasm");
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

    const sourceDir = resolve(__dirname, "node_modules", "web-ifc");
    for (const file of ["web-ifc.wasm", "web-ifc-mt.wasm"]) {
        const source = resolve(sourceDir, file);
        if (existsSync(source)) copyFileSync(source, resolve(targetDir, file));
    }
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        {
            name: "copy-web-ifc-wasm",
            buildStart() {
                copyWebIfcWasm();
            },
        },
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
