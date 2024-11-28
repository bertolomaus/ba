// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: true,
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config.js",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },
  css: ["~/assets/css/styles.css"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
      meta: [
        {
          name: "robots",
          content: "noindex,nofollow",
        },
      ],
    },
  },
  image: {
    dir: "assets/img",
    static: "assets/img",
  }
});
