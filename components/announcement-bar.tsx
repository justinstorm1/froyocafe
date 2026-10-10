import { PartyPopper } from "lucide-react"

import { site } from "@/lib/site"

export function AnnouncementBar() {
  return (
    <div className="bg-navy px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        <PartyPopper className="hidden size-4 text-sun sm:block" aria-hidden />
        <span>{site.announcement.text}</span>
        <span className="hidden text-white/50 sm:inline" aria-hidden>
          •
        </span>
        <span className="text-sun">{site.announcement.secondary}</span>
      </p>
    </div>
  )
}
