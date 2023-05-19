import { getCookie } from "h3"

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) { return }

  const { name } = useSessionConfig()
  const event = useRequestEvent()

  const { data: session } = await useFetch(`/api/session`, {
    headers: {
      Cookie: `${name}=${getCookie(event, name)}`,
    },
  })
  useState(name, () => session.value)
})
