import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    // 접속을 허용할 ngrok 호스트 주소를 배열에 추가합니다.
    host: true,
    allowedHosts: ['chaeho.iptime.org']
  }
})
