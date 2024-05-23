// vite.config.ts
import react from "file:///Users/macbook/Desktop/dev/pulsopus/pulsopus-app/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig, loadEnv } from "file:///Users/macbook/Desktop/dev/pulsopus/pulsopus-app/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///Users/macbook/Desktop/dev/pulsopus/pulsopus-app/node_modules/vite-plugin-pwa/dist/index.js";
import { viteStaticCopy } from "file:///Users/macbook/Desktop/dev/pulsopus/pulsopus-app/node_modules/vite-plugin-static-copy/dist/index.js";
import svgr from "file:///Users/macbook/Desktop/dev/pulsopus/pulsopus-app/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///Users/macbook/Desktop/dev/pulsopus/pulsopus-app/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: true,
      port: 5173
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      viteStaticCopy({
        targets: [
          {
            src: "./src/assets/*",
            dest: "images"
          },
          {
            src: "./src/fonts/*",
            dest: "fonts"
          }
        ]
      }),
      VitePWA({
        devOptions: { enabled: true },
        registerType: "autoUpdate",
        injectRegister: "auto",
        includeAssets: ["images/*", "fonts/*"],
        manifest: {
          id: "/",
          name: "pulsopus",
          short_name: "pulsopus short_name",
          description: "pulsopus description",
          start_url: "/",
          display: "standalone",
          background_color: "#000",
          theme_color: "#000",
          lang: "en",
          scope: "/",
          orientation: "portrait",
          display_override: ["fullscreen", "window-controls-overlay"],
          categories: ["business", "personalization", "productivity"],
          icons: [
            {
              src: "images/image/pwa-64x64.png",
              sizes: "64x64",
              type: "image/png"
            },
            {
              src: "images/image/pwa-144x144.png",
              sizes: "144x144",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "images/image/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "images/image/pwa-256x256.png",
              sizes: "256x256",
              type: "image/png"
            },
            {
              src: "images/image/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        "@": "/src"
      }
    },
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key]);
        return prev;
      }, {})
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjYm9vay9EZXNrdG9wL2Rldi9wdWxzb3B1cy9wdWxzb3B1cy1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWNib29rL0Rlc2t0b3AvZGV2L3B1bHNvcHVzL3B1bHNvcHVzLWFwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFjYm9vay9EZXNrdG9wL2Rldi9wdWxzb3B1cy9wdWxzb3B1cy1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5JztcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgICAgIGhvc3Q6IHRydWUsXG4gICAgICAgICAgICBwb3J0OiA1MTczLFxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICByZWFjdCgpLFxuICAgICAgICAgICAgc3ZncigpLFxuICAgICAgICAgICAgdHNjb25maWdQYXRocygpLFxuICAgICAgICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnLi9zcmMvYXNzZXRzLyonLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdDogJ2ltYWdlcycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJy4vc3JjL2ZvbnRzLyonLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdDogJ2ZvbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBWaXRlUFdBKHtcbiAgICAgICAgICAgICAgICBkZXZPcHRpb25zOiB7IGVuYWJsZWQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgICAgICAgICAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGluY2x1ZGVBc3NldHM6IFsnaW1hZ2VzLyonLCAnZm9udHMvKiddLFxuICAgICAgICAgICAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnLycsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwdWxzb3B1cycsXG4gICAgICAgICAgICAgICAgICAgIHNob3J0X25hbWU6ICdwdWxzb3B1cyBzaG9ydF9uYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdwdWxzb3B1cyBkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0X3VybDogJy8nLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVfY29sb3I6ICcjMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgbGFuZzogJ2VuJyxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6ICcvJyxcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246ICdwb3J0cmFpdCcsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlfb3ZlcnJpZGU6IFsnZnVsbHNjcmVlbicsICd3aW5kb3ctY29udHJvbHMtb3ZlcmxheSddLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbJ2J1c2luZXNzJywgJ3BlcnNvbmFsaXphdGlvbicsICdwcm9kdWN0aXZpdHknXSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6ICdpbWFnZXMvaW1hZ2UvcHdhLTY0eDY0LnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2ltYWdlL3B3YS0xNDR4MTQ0LnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICcxNDR4MTQ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6ICdpbWFnZXMvaW1hZ2UvcHdhLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJ2ltYWdlcy9pbWFnZS9wd2EtMjU2eDI1Ni5wbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzOiAnMjU2eDI1NicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2ltYWdlL3B3YS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICAgJ0AnOiAnL3NyYydcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGRlZmluZToge1xuICAgICAgICAgICAgLi4uT2JqZWN0LmtleXMoZW52KS5yZWR1Y2UoKHByZXYsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHByZXZbYHByb2Nlc3MuZW52LiR7a2V5fWBdID0gSlNPTi5zdHJpbmdpZnkoZW52W2tleV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPiksXG4gICAgICAgIH0sXG4gICAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVSxPQUFPLFdBQVc7QUFDcFYsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sVUFBVTtBQUNqQixPQUFPLG1CQUFtQjtBQUcxQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN0QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsU0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxRQUNYLFNBQVM7QUFBQSxVQUNMO0FBQUEsWUFDSSxLQUFLO0FBQUEsWUFDTCxNQUFNO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNJLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNWO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLFFBQ0osWUFBWSxFQUFFLFNBQVMsS0FBSztBQUFBLFFBQzVCLGNBQWM7QUFBQSxRQUNkLGdCQUFnQjtBQUFBLFFBQ2hCLGVBQWUsQ0FBQyxZQUFZLFNBQVM7QUFBQSxRQUNyQyxVQUFVO0FBQUEsVUFDTixJQUFJO0FBQUEsVUFDSixNQUFNO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixhQUFhO0FBQUEsVUFDYixXQUFXO0FBQUEsVUFDWCxTQUFTO0FBQUEsVUFDVCxrQkFBa0I7QUFBQSxVQUNsQixhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixrQkFBa0IsQ0FBQyxjQUFjLHlCQUF5QjtBQUFBLFVBQzFELFlBQVksQ0FBQyxZQUFZLG1CQUFtQixjQUFjO0FBQUEsVUFDMUQsT0FBTztBQUFBLFlBQ0g7QUFBQSxjQUNJLEtBQUs7QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLE1BQU07QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLGNBQ0ksS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLGNBQ04sU0FBUztBQUFBLFlBQ2I7QUFBQSxZQUNBO0FBQUEsY0FDSSxLQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsWUFDVjtBQUFBLFlBQ0E7QUFBQSxjQUNJLEtBQUs7QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLE1BQU07QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLGNBQ0ksS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLGNBQ04sU0FBUztBQUFBLFlBQ2I7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNILEtBQUs7QUFBQSxNQUNUO0FBQUEsSUFDSjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osR0FBRyxPQUFPLEtBQUssR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLFFBQVE7QUFDdEMsYUFBSyxlQUFlLEdBQUcsRUFBRSxJQUFJLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQztBQUNwRCxlQUFPO0FBQUEsTUFDWCxHQUFHLENBQUMsQ0FBMkI7QUFBQSxJQUNuQztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
