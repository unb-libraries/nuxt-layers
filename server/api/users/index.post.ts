import { defu } from "defu"

export default defineEventHandler(async (event) => {
  const storage = useStorage(`db`)

  const users = (await storage.getItem(`users`) || {}) as UserCollection
  const user: User = defu(
    await readBody(event),
    { active: false },
  )

  if (users[user.username]) {
    throw createError({ statusCode: 409, statusMessage: `User already exists.` })
  }

  users[user.username] = user
  storage.setItem(`users`, users)

  return user
})
