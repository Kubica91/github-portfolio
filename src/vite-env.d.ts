/* eslint-disable spaced-comment */

/// <reference types="vite/client" />

// Custom types for env variables
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
