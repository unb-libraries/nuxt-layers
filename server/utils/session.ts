export function useSessionConfig() {
  return {
    ...useRuntimeConfig().public.session,
    ...useRuntimeConfig().session,
  }
}
