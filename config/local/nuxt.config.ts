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
      password: `incredibly-secure-secret-nobody-will-guess`,
    },
  },
})
