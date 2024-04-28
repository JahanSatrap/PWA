import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from "vite-plugin-svgr";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr(),basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest:{
        name: "جهان ساتراپ",
        short_name: "جهان ساتراپ",
        theme_color: "#800080",
        icons: [
          {
            src: 'logo_with_background.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo_with_background.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      }
    })
  ],
})
