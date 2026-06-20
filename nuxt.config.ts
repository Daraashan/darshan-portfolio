export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/google-fonts', '@vueuse/nuxt'],
  googleFonts: {
    families: { 'Lora': [400, 500], 'Inter': [300, 400, 500] },
    display: 'swap',
  },
  css: ['~/assets/css/main.css'],
  nitro: { preset: 'vercel' },
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    letterboxdUsername: process.env.LETTERBOXD_USERNAME,
  },
  app: {
    head: {
      title: 'Darshan',
      meta: [
        { name: 'description', content: 'Darshan — exploring & cooking' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
