import { H3Event, type SessionData } from 'h3'

export function useCurrentServerSession(event: H3Event) {
  const { name } = useSessionConfig()
  return event.context.sessions?.[name] as SessionData
}

export function useSessionConfig() {
  return {
    ...useRuntimeConfig().public.session,
    ...useRuntimeConfig().session,
  }
}
