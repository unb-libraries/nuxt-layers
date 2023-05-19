export function useCurrentSession() {
  const { name } = useSessionConfig()
  const sessionId = useState(name)
  return readonly(sessionId)
}

export function useSessionConfig() {
  return {
    ...useRuntimeConfig().public.session,
    ...useRuntimeConfig().session,
  }
}
