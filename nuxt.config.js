const strapiBaseUri = process.env.API_URL || "http://localhost:1337";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

    env: {
    strapiBaseUri,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome',
  ],

  moment: {
    defaultLocale: 'fr',
    locales:['fr']
  },
  
  fontawesome: {
    component: "fa",
    suffix: true,
    icons: {}
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/markdownit',
  ],

  strapi: {
    url: strapiBaseUri,
    entities: [
      { name: 'homepage', type: 'single' },
      { name: 'contact', type: 'single' },
      { name: 'faq', type: 'single' },
      { name: 'farm', type: 'single' },
      { name: 'global', type: 'single' },
      { name: 'articles', type: 'collection' },
      { name: 'products', type: 'collection' },
      { name: 'orders', type: 'collection' },
    ]
  },

  markdownit: {
    runtime: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
