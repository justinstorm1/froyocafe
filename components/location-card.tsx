import Link from "next/link"
import { ArrowRight, MapPin, Navigation, Phone } from "lucide-react"

import { HoursList, OpenBadge } from "@/components/open-status"
import { fullAddress, mapsHref, telHref, type Location } from "@/lib/locations"
import { cn } from "@/lib/utils"

const accents = {
  aberdeen: "bg-pink",
  manalapan: "bg-sky",
  seaview: "bg-sun",
} satisfies Record<Location["slug"], string>

export function LocationCard({ location: l }: { location: Location }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_8px_0_-2px_var(--border)] transition hover:-translate-y-1">
      <div className={cn("h-2", accents[l.slug])} aria-hidden />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="space-y-2">
          <p className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
            {l.venue}
          </p>
          <h3 className="text-3xl font-bold text-navy">
            <Link
              href={`/${l.slug}`}
              className="after:absolute after:inset-0 focus:outline-none"
            >
              {l.name}
            </Link>
          </h3>
          <OpenBadge hours={l.hours} />
        </div>

        <p className="flex gap-2 text-[0.95rem] text-foreground/80">
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          {fullAddress(l)}
        </p>

        <HoursList hours={l.hours} className="text-sm" />

        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
          <a
            href={telHref(l.phone)}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-brand hover:bg-brand hover:text-white"
          >
            <Phone className="size-4" aria-hidden /> {l.phone}
          </a>
          <a
            href={mapsHref(l)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-brand hover:bg-brand hover:text-white"
          >
            <Navigation className="size-4" aria-hidden /> Directions
          </a>
        </div>
        <Link
          href={`/${l.slug}`}
          className="relative z-10 inline-flex items-center justify-between rounded-2xl bg-brand px-5 py-3.5 font-bold text-white transition group-hover:bg-brand-deep"
        >
          Flavors & toppings
          <ArrowRight
            className="size-5 transition group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  )
}
