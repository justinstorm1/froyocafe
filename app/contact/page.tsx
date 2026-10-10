import type { Metadata } from "next"
import Link from "next/link"
import { Phone } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { OpenBadge } from "@/components/open-status"
import { locations, telHref } from "@/lib/locations"

export const metadata: Metadata = {
  title: "Contact, Parties & Gift Cards",
  description:
    "Questions about party packs, dine-to-donate fundraisers, gift cards, cakes, flavors or jobs? Get in touch with Fro Yo Cafe.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 polka-soft" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-pink uppercase">
            Contact us
          </p>
          <h1 className="mt-3 text-5xl leading-none font-bold text-navy md:text-6xl">
            Let&apos;s talk fro yo.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Questions about gift cards, party packs, fundraisers, flavors,
            toppings or joining the team? Send us a message.
          </p>
          <div className="mt-10 rounded-[2rem] border border-border bg-card p-6 shadow-[0_8px_0_-2px_var(--border)] md:p-8">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-4 lg:pt-28">
          <h2 className="text-2xl font-bold text-navy">Rather call?</h2>
          {locations.map((l) => (
            <div
              key={l.slug}
              className="rounded-3xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/${l.slug}`}
                  className="font-display text-xl font-bold text-navy hover:text-brand"
                >
                  {l.name}
                </Link>
                <OpenBadge hours={l.hours} className="text-xs" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{l.venue}</p>
              <a
                href={telHref(l.phone)}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-bold text-brand hover:bg-brand hover:text-white"
              >
                <Phone className="size-4" aria-hidden /> {l.phone}
              </a>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
