import type { EventHandler } from "h3"

export function defineAuthEventHandler<T>(handler: EventHandler<T>): EventHandler<T> {
  return defineEventHandler((event) => {
    const { data } = useCurrentServerSession(event)
    if (!data.user) {
      throw createError({ statusCode: 403, message: `Unauthorized` })
    }
    return handler(event)
  })
}
