import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    allowedHosts: [
      "2548-103-17-36-245.ngrok-free.app",
      "tulsa-queries-such-rhythm.trycloudflare.com",
    ],
  },
});
