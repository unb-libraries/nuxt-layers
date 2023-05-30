export default defineNuxtConfig({
  extends: [
    `../prod`,
    `../dev`,
  ],
  runtimeConfig: {
    session: {
      cookie: {
        secure: false,
      },
    },
  },
})
