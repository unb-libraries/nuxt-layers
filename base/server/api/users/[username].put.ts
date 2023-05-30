import { defu } from "defu"

export default defineEventHandler(async (event) => {
  const storage = useStorage(`db`)

  const { username } = event.context.params!
  const users = (await storage.getItem(`users`) || {}) as UserCollection

  if (!users || !users[username]) {
    throw createError({
      statusCode: 403,
      statusMessage: `Not authorized`,
    })
  }

  users[username] = defu(await readBody(event), users[username])
  storage.setItem(`users`, users)

  return users[username]
})
