import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000)
  return () => clearInterval(id)
}

const getSnapshot = () => Math.floor(Date.now() / 60_000)
const getServerSnapshot = () => null

/** The current minute (as a Date) on the client, or null during SSR/hydration. */
export function useMinute() {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return minute === null ? null : new Date(minute * 60_000)
}
