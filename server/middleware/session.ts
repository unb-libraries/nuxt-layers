export default defineEventHandler(async (event) => {
  await useSession(event, useSessionConfig())
})
