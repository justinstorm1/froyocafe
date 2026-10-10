"use client"

import { useMinute } from "@/hooks/use-minute"
import { DAYS, formatTime, getStatus, groupHours, nowInNJ } from "@/lib/hours"
import type { DayHours } from "@/lib/locations"
import { cn } from "@/lib/utils"

export function OpenBadge({
  hours,
  className,
}: {
  hours: DayHours[]
  className?: string
}) {
  const now = useMinute()

  if (!now) {
    return (
      <span
        className={cn(
          "inline-flex h-7 w-36 animate-pulse rounded-full bg-muted",
          className
        )}
        aria-hidden
      />
    )
  }

  const status = getStatus(hours, now)
  const label = status.open
    ? status.closingSoon
      ? `Closing soon · ${formatTime(status.closesAt)}`
      : `Open now · until ${formatTime(status.closesAt)}`
    : status.today
      ? `Opens today at ${formatTime(status.opensAt)}`
      : `Closed · opens ${DAYS[status.opensDay].slice(0, 3)} ${formatTime(status.opensAt)}`

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold",
        status.open
          ? status.closingSoon
            ? "bg-sun/20 text-amber-800"
            : "bg-mint/20 text-emerald-800"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          status.open
            ? status.closingSoon
              ? "bg-sun"
              : "bg-mint"
            : "bg-muted-foreground/50"
        )}
      >
        {status.open && (
          <span className="block size-2 animate-ping rounded-full bg-inherit" />
        )}
      </span>
      {label}
    </span>
  )
}

export function HoursList({
  hours,
  className,
}: {
  hours: DayHours[]
  className?: string
}) {
  const now = useMinute()
  const today = now ? nowInNJ(now).day : -1

  return (
    <dl className={cn("divide-y divide-border", className)}>
      {groupHours(hours).map((g) => {
        const isToday = g.days.includes(today)
        return (
          <div
            key={g.label}
            className={cn(
              "flex items-center justify-between gap-4 py-2.5",
              isToday && "font-bold text-brand"
            )}
          >
            <dt className="flex items-center gap-2">
              {g.label}
              {isToday && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-[0.7rem] font-bold tracking-wide text-white uppercase">
                  Today
                </span>
              )}
            </dt>
            <dd className="tabular-nums">
              {formatTime(g.hours.open)} – {formatTime(g.hours.close)}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
