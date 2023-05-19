import type { H3Event, EventHandler } from "h3"

export function defineAuthEventHandler<T>(handler: EventHandler<T>): EventHandler<T> {
  return defineEventHandler((event) => {
    const { data } = useCurrentServerSession(event)
    if (!data.user) {
      throw createError({ statusCode: 403, message: `Unauthorized` })
    }
    return handler(event)
  })
}

export function useCurrentUser(event: H3Event): User {
  return event.context.user
}
