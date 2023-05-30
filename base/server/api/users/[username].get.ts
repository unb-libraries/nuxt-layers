export default defineEventHandler(async (event) => {
  const storage = useStorage(`db`)
  const currentUser = useCurrentUser(event)
  const { username } = event.context.params!

  if (!currentUser || currentUser.username !== username) {
    throw createError({
      statusCode: 403,
      statusMessage: `Unauthorized`,
    })
  }

  const users = (await storage.getItem(`users`) || {}) as UserCollection

  if (!users || !users[username]) {
    throw createError({
      statusCode: 404,
      statusMessage: `${username} not found`,
    })
  }

  return users[username]
})
