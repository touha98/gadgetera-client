/* eslint-disable nuxt/no-cjs-in-config */
const generateRoutes = require("./sitemapRoutesGenerator");

export default {
  target: "static",

  generate: { fallback: "404.html" },

  head: {
    titleTemplate: "%s | Gadget Era",
    title: "Gadget Era",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { hid: "theme-color", name: "theme-color", content: "#ffffff" },
      {
        hid: "og:image",
        name: "og:image",
        content: "/home-banner-placeholder.jpg"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["~/assets/main.css"],

  plugins: [
    "~/plugins/axios.js",
    "~/plugins/repositories.js",
    { src: "~/plugins/pwa-update.js", mode: "client" }
  ],
  loading: false,
  components: true,

  buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/vuetify", "@nuxtjs/pwa"],

  modules: [
    "nuxt-client-init-module",
    "@nuxtjs/axios",
    "nuxt-webfontloader",
    "cookie-universal-nuxt",
    "@nuxtjs/sitemap",
    "vue-social-sharing/nuxt"
  ],

  sitemap: {
    hostname: "https://gadgeterabd.com",
    gzip: true,
    exclude: [
      "/checkout",
      "/account",
      "/account/**",
      "/orders",
      "/orders/**",
      "/thank-you"
    ],
    routes: generateRoutes
  },

  axios: {
    baseUrl: process.env.BASE_URL || "http://localhost:1337",
    retry: true
  },
  webfontloader: {
    google: {
      families: ["Poppins:300,400,500,600,700", "Open Sans:300,400,500,600,700"]
    }
  },

  pwa: {
    meta: {
      theme_color: "#ffffff"
    },
    manifest: {
      name: "Gadget Era - Online Shop",
      short_name: "Gadget Era",
      description:
        "Gadget Era is an online retail shop for top quality electronic gadgets, watches and mobile accessories in Bangladesh."
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "https://gadget-era.s3.ap-southeast-1.amazonaws.com/.*",
          handler: "CacheFirst",
          method: "GET"
        },
        {
          urlPattern: "https://res.cloudinary.com/.*",
          handler: "CacheFirst",
          method: "GET"
        }
      ]
    }
  },

  vuetify: {
    customProperties: true,
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#03A9F4",
          secondary: "#ffffff",
          accent: "#fe5f55",
          info: "#fdfce2",
          warning: "#FFC107",
          error: "#FF8A80",
          success: "#00E676",
          font: "#000000"
        },
        dark: {
          primary: "#03A9F4",
          secondary: "#ffffff",
          accent: "#fe5f55",
          info: "#fdfce2",
          warning: "#FFC107",
          error: "#FF8A80",
          success: "#00E676"
        }
      }
    }
  },

  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]]
    }
  }
};
