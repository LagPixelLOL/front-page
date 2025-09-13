import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import {consoleForwardPlugin} from "vite-console-forward-plugin"

// https://vite.dev/config/
export default defineConfig({
    base: "/front-page",
    plugins: [react(), tailwindcss(), consoleForwardPlugin()],
    server: {host: true, port: 12345, allowedHosts: true},
})
