// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image'
  ],
  app: {
    head: {
      title: "To-Do List",
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'description',
          content: 'Keep organized and increase productivity with our easy-to-use To-Do list. It is ideal for managing daily tasks and achieving your goals.'
        }
      ]
    }
  },
  // css: [
  //   '~/assets/css/tailwind.css',
  // ],
  image: {
    dir: 'assets/images'
  }
})