// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", '@vee-validate/nuxt'],
  css: ["~/assets/css/utilities.css", "~/assets/css/styles.css", "~/assets/css/responsive.css"],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config.js",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  app: {
    head: {
      link:[
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  }
})