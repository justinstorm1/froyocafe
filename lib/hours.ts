import type { DayHours } from "@/lib/locations"

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function formatTime(min: number) {
  const hh = Math.floor(min / 60)
  const mm = min % 60
  const suffix = hh >= 12 ? "pm" : "am"
  const h12 = hh % 12 === 0 ? 12 : hh % 12
  return mm
    ? `${h12}:${String(mm).padStart(2, "0")}${suffix}`
    : `${h12}${suffix}`
}

/** Collapse consecutive days with identical hours, e.g. "Mon – Thu". */
export function groupHours(hours: DayHours[]) {
  // Start the week on Monday for display.
  const order = [1, 2, 3, 4, 5, 6, 0]
  const groups: { days: number[]; hours: DayHours }[] = []
  for (const day of order) {
    const last = groups.at(-1)
    const d = hours[day]
    if (last && last.hours.open === d.open && last.hours.close === d.close) {
      last.days.push(day)
    } else {
      groups.push({ days: [day], hours: d })
    }
  }
  return groups.map((g) => ({
    ...g,
    label:
      g.days.length === 1
        ? DAYS[g.days[0]].slice(0, 3)
        : `${DAYS[g.days[0]].slice(0, 3)} – ${DAYS[g.days.at(-1)!].slice(0, 3)}`,
  }))
}

/** Current day-of-week and minutes-after-midnight in New Jersey. */
export function nowInNJ(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday")
  )
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) }
}

export type OpenStatus =
  | { open: true; closesAt: number; closingSoon: boolean }
  | { open: false; opensAt: number; opensDay: number; today: boolean }

export function getStatus(hours: DayHours[], date = new Date()): OpenStatus {
  const { day, minutes } = nowInNJ(date)
  const today = hours[day]
  if (minutes >= today.open && minutes < today.close) {
    return {
      open: true,
      closesAt: today.close,
      closingSoon: today.close - minutes <= 45,
    }
  }
  if (minutes < today.open) {
    return { open: false, opensAt: today.open, opensDay: day, today: true }
  }
  const next = (day + 1) % 7
  return {
    open: false,
    opensAt: hours[next].open,
    opensDay: next,
    today: false,
  }
}
