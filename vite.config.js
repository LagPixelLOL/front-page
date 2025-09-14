import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import {consoleForwardPlugin} from "vite-console-forward-plugin"

// https://vite.dev/config/
export default defineConfig(({command, mode}) => {
    const isDev = command === "serve" || mode === "development";
    console.log(`Development mode: ${isDev}`);
    return {
        base: "/front-page",
        plugins: [
            react(),
            tailwindcss(),
            isDev && consoleForwardPlugin(),
        ].filter(Boolean),
        server: {host: true, port: 12345, allowedHosts: true},
    }
})
