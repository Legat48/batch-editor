export default {
  ssr: true,

  router: {
    base: '/BatchEditor-FE/'
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  head: {
    titleTemplate: 'Партии и материалы',
    title: 'Партии и материалы',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/BatchEditor-FE/favicon.ico' }
    ]
  },
  server: {
    port: 8881 // default: 3000
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts/Inter/inter.css',
    '~/assets/fonts/DelaGothicOne.css',
    '~/assets/scss/style.scss'
  ],
  // Путь к резервному HTML-файлу
  generate: {
    fallback: true
  },
  render: {
    bundleRenderer: {
      shouldPreload: (_file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  styleResources: {
    scss: ['~/assets/scss/scss/*.scss']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    true: true,
    dirs: [
      '~/components',
      '~/components/items',
      '~/components/svg',
      '~/components/table'
    ]
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
    // плагин для подкгрузки ENV
    '@nuxtjs/dotenv'
  ],
  svgSprite: {
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
    // '@nuxtjs/i18n'
  ],
  plugins: [
    '~/plugins/foo.js',
    { src: '~/plugins/ripple.js', mode: 'client' }
  ],
  publicRuntimeConfig: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      defaultFont: '\'Inter\', sans-serif',
      dark: false,
      themes: {
        light: {
          colorText1: '#323232',
          colorText2: '#167FFB',
          colorText3: '#66747e',
          colorTextwhite1: '#fff',
          colorBtn1: '#167FFB',
          colorBtn2: '#3E3E3E',
          colorBtn3: '#167FFB',
          colorBtn4: '#d0e9ff',
          colorBtnDeactive1: '#F7F7F7',
          colorBorder1: '#C7D0D9',
          colorBorder2: '#66747e',
          colorBorder3: '#66747e',
          colorBg1: '#F7F7F7',
          colorBg2: '#d0e9ff',
          colorBgWhite1: '#fff',
          colorActive: '#167FFB',
          colorWarning: '#ffad0f',
          colorAlert: '#e00000',
          colorNoError: '#47dc68',
          colorReady: '#2aba4a',
          colorError: '#e00000'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
  // Locales /импорт текстов
  // i18n
}
