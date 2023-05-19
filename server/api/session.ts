export default defineEventHandler((event) => {
  return event.context.sessions?.sessionId
})
