import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://eocampaign1.com https://connect.facebook.net https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.facebook.net https://*.facebook.com https://*.amazonaws.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://www.google.co.in https://www.google.co.uk https://www.google.com.au https://www.google.ca https://pagead2.googlesyndication.com https://gallery.eousercontent.com https://cdn.sanity.io https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.facebook.com https://*.amazonaws.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://www.google.co.in https://www.google.co.uk https://www.google.com.au https://www.google.ca https://script.google.com https://script.googleusercontent.com https://pagead2.googlesyndication.com https://*.sanity.io https://www.googleadservices.com https://connect.facebook.net https://*.facebook.com https://*.amazonaws.com; font-src 'self' https://fonts.gstatic.com https://gallery.eo.page; frame-src 'self' https://*.googletagmanager.com https://td.doubleclick.net https://www.google.com/recaptcha/ https://*.facebook.com;"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
