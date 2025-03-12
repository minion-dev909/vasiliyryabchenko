// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      apiToken:
        process.env.API_TOKEN || "API-79b7eafc5f0ec1e1393d054ea922bc1a8f8d5f81",
      siteBase: process.env.SITE_BASE || "https://vasiliyryabchenko.com",
      hubBase: process.env.HUB_BASE || "https://pro.vasiliyryabchenko.com",
      storageBase:
        process.env.STORAGE_BASE ||
        "https://pro.vasiliyryabchenko.com/storage/uploads",
      storageTmp:
        process.env.STORAGE_TMP ||
        "https://pro.vasiliyryabchenko.com/storage/tmp/thumbs",
      apiBase: process.env.API_BASE || "https://pro.vasiliyryabchenko.com/api",
      newApiBase: process.env.NEW_API_BASE || "http://185.67.0.253:8055",
      otherUrl: process.env.OTHER_URL || "default_other_url",
    },
  },
  css: ["/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {}, 
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === "production"
          ? { preset: ["default", { discardComments: { removeAll: true } }] }
          : false, // disable cssnano when not in production
    },
  },
  modules: [['@dargmuesli/nuxt-cookie-control', {
    // untyped module options
  }], "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", [
    "@nuxtjs/i18n",
    {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: "i18n_redirected",
        alwaysRedirect: true,
        fallbackLocale: "en",
      },
      lazy: true,
      legacy: false,
      langDir: "locales",
      strategy: "prefix_except_default",
      defaultLocale: "en",
      baseUrl: "https://vasiliyryabchenko.com",
      locales: [
        {
          code: "en",
          iso: "en-US",
          name: "English(US)",
          file: "en-US.json",
        },
        {
          code: "uk",
          iso: "uk-UA",
          name: "Українська",
          file: "uk-UA.json",
        },
        {
          code: "ru",
          iso: "ru-RU",
          name: "Русский",
          file: "ru-RU.json",
        },
      ],
    },
  ], "@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-swiper", [
    "@nuxtjs/google-fonts",
    {
      families: {
        "Nunito+Sans": { wght: [300, 400, 500, 600], ital: [300, 400] },
      },
    },
  ], "@nuxt/image", "@dargmuesli/nuxt-cookie-control"],
  devtools: { enabled: false },
  image: {
    domains: ["pro.vasiliyryabchenko.com"],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    rootId: "app",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});