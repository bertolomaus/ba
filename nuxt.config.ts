// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  tailwindcss: {
    cssPath: '~/assets/css/styles.css',
    viewer: false,
  }
})