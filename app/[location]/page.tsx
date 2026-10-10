import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  Bike,
  CakeSlice,
  MapPin,
  Navigation,
  Phone,
  RefreshCw,
} from "lucide-react"

import { HoursList, OpenBadge } from "@/components/open-status"
import { SectionHeading } from "@/components/section-heading"
import { InstagramIcon, TikTokIcon } from "@/components/social-icons"
import { ToppingsExplorer } from "@/components/toppings-explorer"
import { DAYS } from "@/lib/hours"
import {
  fullAddress,
  getLocation,
  locations,
  mapsHref,
  telHref,
  toppingCount,
  type Location,
} from "@/lib/locations"
import { site, treats } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }))
}

export async function generateMetadata(
  props: PageProps<"/[location]">
): Promise<Metadata> {
  const { location } = await props.params
  const l = getLocation(location)
  if (!l) return {}
  return {
    title: `${l.name} — Flavors, Toppings & Hours`,
    description: `Self-serve frozen yogurt at ${l.venue}, ${fullAddress(l)}. See today's hours, ${l.flavors.length}+ flavors and ${toppingCount(l)}+ toppings at Fro Yo Cafe ${l.name}.`,
    alternates: { canonical: `/${l.slug}` },
  }
}

const flavorColors = ["bg-pink", "bg-sky", "bg-sun", "bg-mint"]

const pad = (n: number) => String(n).padStart(2, "0")
const toTime = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`

function jsonLd(l: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: `Fro Yo Cafe ${l.name}`,
    url: `${site.url}/${l.slug}`,
    telephone: `+1-${l.phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`,
    image: `${site.url}/images/create-it.webp`,
    servesCuisine: "Frozen Yogurt",
    address: {
      "@type": "PostalAddress",
      streetAddress: l.street,
      addressLocality: l.city,
      addressRegion: l.state,
      postalCode: l.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: l.hours.map((d, i) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS[i],
      opens: toTime(d.open),
      closes: toTime(d.close),
    })),
    sameAs: [`https://www.instagram.com/${l.instagram}/`],
  }
}

export default async function LocationPage(props: PageProps<"/[location]">) {
  const { location } = await props.params
  const l = getLocation(location)
  if (!l) notFound()

  const others = locations.filter((o) => o.slug !== l.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(l)).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          className="absolute -top-20 -right-20 size-80 rounded-full polka opacity-30"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 left-1/3 size-72 rounded-full polka opacity-15"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.3fr_1fr] lg:py-20">
          <div className="space-y-6">
            <p className="font-display text-sm font-semibold tracking-[0.18em] text-sun uppercase">
              Fro Yo Cafe · {l.venue}
            </p>
            <h1 className="text-6xl leading-none font-bold md:text-8xl">
              {l.name}
            </h1>
            <p className="max-w-lg text-lg text-white/80">{l.blurb}</p>
            <p className="flex items-start gap-2 text-lg font-semibold">
              <MapPin className="mt-1 size-5 shrink-0 text-sun" aria-hidden />
              {fullAddress(l)}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={telHref(l.phone)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-brand shadow-[0_5px_0_var(--brand-deep)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
              >
                <Phone className="size-5" aria-hidden /> {l.phone}
              </a>
              <a
                href={mapsHref(l)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3.5 font-bold ring-1 ring-white/30 transition hover:bg-white/25"
              >
                <Navigation className="size-5" aria-hidden /> Directions
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={`https://www.instagram.com/${l.instagram}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-white/85 hover:bg-white/10 hover:text-white"
              >
                <InstagramIcon className="size-4" />@{l.instagram}
              </a>
              {l.tiktok && (
                <a
                  href={`https://www.tiktok.com/@${l.tiktok}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-white/85 hover:bg-white/10 hover:text-white"
                >
                  <TikTokIcon className="size-4" />@{l.tiktok}
                </a>
              )}
            </div>
          </div>

          <aside className="self-start rounded-[2rem] bg-white p-6 text-foreground shadow-2xl shadow-navy/30 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-navy">Hours</h2>
              <OpenBadge hours={l.hours} />
            </div>
            <HoursList hours={l.hours} className="mt-4" />
            {l.delivery && (
              <div className="mt-6 flex gap-3 rounded-2xl bg-secondary p-4 text-sm">
                <Bike className="size-5 shrink-0 text-brand" aria-hidden />
                <p>
                  <span className="font-bold text-navy">
                    Delivery available
                  </span>{" "}
                  on {l.delivery.join(", ")}. Check the app for delivery hours.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Quick nav */}
      <nav
        aria-label="On this page"
        className="sticky top-16 z-30 border-b border-border bg-cream/90 backdrop-blur-md md:top-20"
      >
        <div className="mx-auto flex max-w-6xl [scrollbar-width:none] gap-1 overflow-x-auto px-4 py-2 md:px-6">
          {[
            ["#flavors", "Flavors"],
            ["#toppings", "Toppings"],
            ...(l.hasTreatMenu ? [["#menu", "Cakes & pies"]] : []),
            ["#visit", "Map"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold text-navy hover:bg-secondary hover:text-brand"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Flavors */}
      <section id="flavors" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionHeading eyebrow={`${l.name} flavors`} title="What's swirling.">
          Our flavors change from time to time — call{" "}
          <a
            href={telHref(l.phone)}
            className="font-bold text-brand underline-offset-4 hover:underline"
          >
            {l.phone}
          </a>{" "}
          or check{" "}
          <a
            href={`https://www.instagram.com/${l.instagram}/`}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-brand underline-offset-4 hover:underline"
          >
            Instagram
          </a>{" "}
          for today&apos;s lineup.
        </SectionHeading>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {l.flavors.map((f, i) => (
            <li
              key={f}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 font-bold text-navy"
            >
              <span
                className={`size-3 shrink-0 rounded-full ${flavorColors[i % flavorColors.length]}`}
                aria-hidden
              />
              {f}
            </li>
          ))}
        </ul>
        {l.rotatingFlavors && (
          <div className="mt-8 rounded-3xl bg-secondary p-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-navy">
              <RefreshCw className="size-5 text-brand" aria-hidden /> Also in
              rotation
            </h3>
            <p className="mt-2 text-muted-foreground">
              {l.rotatingFlavors.join(" · ")} — and more.
            </p>
          </div>
        )}
      </section>

      {/* Toppings */}
      <section id="toppings" className="border-y border-border bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow={`${l.name} toppings bar`}
            title={`${toppingCount(l)}+ toppings. Go wild.`}
            className="mb-10"
          >
            Toppings change from time to time, too. Search or filter to find
            your favorites.
          </SectionHeading>
          <ToppingsExplorer groups={l.toppings} />
        </div>
      </section>

      {/* Menu */}
      {l.hasTreatMenu && (
        <section id="menu" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <SectionHeading
            eyebrow="More on the menu"
            title="Cakes, pies & doggie treats."
          >
            Custom yogurt cakes and pies made with this week&apos;s flavors.
            Call the shop to order.
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {treats.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-3xl border border-border bg-card p-6"
              >
                <CakeSlice className="size-7 text-pink" aria-hidden />
                <h3 className="mt-4 text-2xl font-bold text-navy">{t.name}</h3>
                <p className="font-display text-xl font-bold text-brand">
                  {t.price}
                </p>
                <p className="mt-2 flex-1 text-muted-foreground">
                  {t.description}
                </p>
                {t.note && (
                  <p className="mt-3 text-sm font-semibold text-pink">
                    {t.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Map */}
      <section id="visit" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            <SectionHeading eyebrow="Visit" title={`Find us at ${l.venue}.`}>
              {fullAddress(l)}
            </SectionHeading>
            <div className="flex flex-wrap gap-3">
              <a
                href={mapsHref(l)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-deep"
              >
                <Navigation className="size-4" aria-hidden /> Get directions
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-white px-6 py-3 font-bold text-navy hover:border-brand hover:text-brand"
              >
                Parties & gift cards
              </Link>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border-[6px] border-white bg-muted shadow-xl shadow-navy/10">
            <iframe
              title={`Map of Fro Yo Cafe ${l.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`Fro Yo Cafe, ${fullAddress(l)}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </div>
      </section>

      {/* Other shops */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-bold">Visit our other shops</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/${o.slug}`}
                className="group flex items-center justify-between gap-4 rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
              >
                <span>
                  <span className="block font-display text-2xl font-bold">
                    {o.name}
                  </span>
                  <span className="text-sm text-white/70">{o.venue}</span>
                </span>
                <ArrowRight
                  className="size-6 text-sun transition group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
