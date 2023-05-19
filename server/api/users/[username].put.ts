import { defu } from "defu"

export default defineAuthEventHandler(async (event) => {
  const storage = useStorage(`db`)

  if (!event.context.params?.username) {
    throw createError({
      statusCode: 400,
      statusMessage: `Username is required`,
    })
  }

  const { username } = event.context.params
  const users = (await storage.getItem(`users`) || {}) as UserCollection

  if (!users || !users[username]) {
    throw createError({
      statusCode: 404,
      statusMessage: `${username} not found`,
    })
  }

  users[username] = defu(await readBody(event), users[username])
  storage.setItem(`users`, users)

  return users[username]
})