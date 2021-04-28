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
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/strapi',
    '@/plugins/directives',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/layout',
      '~/components/atoms',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome',
    '@braid/vue-formulate/nuxt',
  ],

  moment: {
    defaultLocale: 'fr',
    locales:['fr']
  },
  
  fontawesome: {
    component: "fa",
    suffix: true,
    icons: {
      solid:['faShoppingCart','faTimes','faSignOutAlt']
    }
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/markdownit',
    '@nuxtjs/toast',
    '@nuxtjs/recaptcha',
  ],

  strapi: {
    url: strapiBaseUri,
    key:'whateverkey',
    expires:'31d',
    cookie: { sameSite: true, path: '/', },
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

  toast: {
      containerClass:"toastContainer",
      position: 'top-right',
      duration:3000,
      register: [ // Register custom toasts
        {
          name: 'my-error',
          message: 'Oops...Une erreur s\'est produite',
          options: {
            type: 'error'
          }
        }
      ]
  },

  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    language: 'fr',   // Recaptcha language (v2)
    siteKey: process.env.RECAPTCHA_SITE_KEY,    // Site key for requests
    version: 3,     // Version
    size: 'normal'        // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
