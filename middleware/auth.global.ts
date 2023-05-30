import type { RouteLocationNormalized, RouteMeta } from "vue-router"
import { sendRedirect } from "h3"

interface AuthMeta {
  public: boolean
  redirect: boolean
}

interface RouteAuthMeta extends RouteMeta {
  auth?: AuthMeta
}

export default async (from: RouteLocationNormalized, to: RouteLocationNormalized) => {
  if (process.client) { return }

  const event = useRequestEvent()
  const auth = {
    public: true,
    redirect: false,
    ...(from.meta as RouteAuthMeta).auth || {},
  }

  const currentUser = await useCurrentUser()
  if (!auth.public && !currentUser) {
    // Use instead of navigateTo to avoid ERR_HTTP_HEADERS_SENT error
    if (auth.redirect) {
      const redirectTo = to.path
      return sendRedirect(event, `/login?redirect=${redirectTo}`, 302)
    }
    return abortNavigation({ statusCode: 403, message: `Unauthorized` })
  }
}
