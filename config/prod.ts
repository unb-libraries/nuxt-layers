export default {
  runtimeConfig: {
    public: {
      session: {
        name: `sessionId`,
      },
    },
    session: {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      password: ``,
    },
  },
}
