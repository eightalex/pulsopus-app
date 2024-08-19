import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: true,
      port: 5173,
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: './src/assets/*',
            dest: 'images',
          },
          {
            src: './src/fonts/*',
            dest: 'fonts',
          },
        ],
      }),
      VitePWA({
        devOptions: { enabled: true },
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['images/*', 'fonts/*'],
        manifest: {
          id: '/',
          name: 'pulsopus',
          short_name: 'pulsopus short_name',
          description: 'pulsopus description',
          start_url: '/',
          display: 'standalone',
          background_color: '#000',
          theme_color: '#000',
          lang: 'en',
          scope: '/',
          orientation: 'portrait',
          display_override: ['fullscreen', 'window-controls-overlay'],
          categories: ['business', 'personalization', 'productivity'],
          icons: [
            {
              src: 'images/image/pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png'
            },
            {
              src: 'images/image/pwa-144x144.png',
              sizes: '144x144',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'images/image/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'images/image/pwa-256x256.png',
              sizes: '256x256',
              type: 'image/png'
            },
            {
              src: 'images/image/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': '/src'
      },
    },
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key]);
        return prev;
      }, {} as Record<string, string>),
    },
  };
});
