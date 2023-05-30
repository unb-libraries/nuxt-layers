<script setup lang="ts">
import { sendRedirect, readBody, createError, useSession, getCookie } from "h3"

definePageMeta({
  middleware: [

    // Initialize
    function () {
      if (process.client) { return }

      const event = useRequestEvent()
      const { method } = event.node.req
      if (method !== `POST`) {
        throw createError({ status: 405, statusText: `HTTP Method not allowed.` })
      }
    },

    // Process SAML response
    async function () {
      if (process.client) { return }

      const event = useRequestEvent()
      const { $saml } = useNuxtApp()

      const { SAMLResponse, RelayState = `/` } = await readBody(event)
      if (!SAMLResponse) {
        throw createError({ status: 400, statusText: `SAMLResponse is required` })
      }

      const response = await $saml.validatePostResponseAsync({ SAMLResponse })
      event.context.saml = {
        profile: response.profile?.attributes as SAMLProfile,
        RelayState,
      }
    },

    // Update the user with the profile retrieved from the IDP
    async function () {
      if (process.client) { return }

      const event = useRequestEvent()

      const sessionConfig = useSessionConfig()
      const { update } = await useSession(event, sessionConfig)
      const { profile } = event.context.saml

      await update({
        user: profile.uid,
      })

      try {
        await $fetch(`/api/users/${profile.uid}`, {
          method: `PUT`,
          body: {
            email: profile.mail,
          },
          headers: {
            Cookie: getCookie(event, sessionConfig.name)!,
          },
        })
      } catch (error) {
        event.context.saml.RelayState = `/`
        await update((data) => {
          delete data.user
          return data
        })
      }
    },

    // Redirect the user
    function () {
      if (process.client) { return }

      const event = useRequestEvent()
      return sendRedirect(event, event.context.saml.RelayState, 302)
    },
  ],
})
</script>
