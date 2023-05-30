export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      saml: {
        entryPoint: ``,
        callbackUrl: ``,
        issuer: ``,
        cert: ``,
        validateInResponseTo: ValidateInResponseTo.never,
        disableRequestedAuthnContext: true,
      },
      session: {
        name: `sessionId`,
      },
    },
    session: {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      password: ``,
    },
  },
})
