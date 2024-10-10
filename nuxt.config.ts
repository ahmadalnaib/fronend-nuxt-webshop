// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  
  devServer:{
    host: 'http://webshop.test/'
  },
  modules: ['nuxt-auth-sanctum'],

  
  sanctum:{
    baseUrl: 'http://webshop.test', 
    redirect:{
      onLogin: '/dashboard',
      onAuthOnly: '/auth/login',
      onGuestOnly: '/dashboard',
      // onLogout: '/',

    }
  }
})