import { ValidateInResponseTo } from "@node-saml/node-saml/lib/types"

export default defineNuxtConfig({
  nitro: {
    storage: {
      db: {
        driver: `fs`,
        base: `./.data/db`,
      },
    },
  },
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
