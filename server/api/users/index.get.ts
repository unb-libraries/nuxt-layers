export default defineAuthEventHandler(async (event) => {
  return (await useStorage(`db`).getItem(`users`) || {}) as UserCollection
})
