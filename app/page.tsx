import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CakeSlice,
  Dog,
  ExternalLink,
  Gift,
  HeartHandshake,
  IceCreamBowl,
  PartyPopper,
  Scale,
  Sparkles,
  Star,
} from "lucide-react"

import { LocationCard } from "@/components/location-card"
import { SectionHeading } from "@/components/section-heading"
import { InstagramIcon } from "@/components/social-icons"
import { locations, toppingCount } from "@/lib/locations"
import { site, treats } from "@/lib/site"
import createIt from "@/public/images/create-it.webp"
import froCookie from "@/public/images/fro-cookie.webp"
import frogeddaboutit from "@/public/images/frogeddaboutit.webp"
import photo1 from "@/public/images/photo-1.webp"
import photo2 from "@/public/images/photo-2.webp"
import store from "@/public/images/store.webp"

const allFlavors = [
  ...new Set(
    locations.flatMap((l) => [...l.flavors, ...(l.rotatingFlavors ?? [])])
  ),
]
const maxToppings = Math.max(...locations.map(toppingCount))

const steps = [
  {
    icon: IceCreamBowl,
    title: "Create it…",
    body: "Grab a cup and pull your own swirl. Sample as many flavors as you like — mixing is encouraged.",
    color: "bg-pink",
  },
  {
    icon: Sparkles,
    title: "Top it…",
    body: `Load up from ${maxToppings}+ toppings: fresh fruit, candy, cereal, boba, hot fudge, Dubai chocolate and more.`,
    color: "bg-sky",
  },
  {
    icon: Scale,
    title: "Enjoy it!",
    body: "Pay by the ounce, so every cup is exactly as big (or as small) as you want it.",
    color: "bg-sun",
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 polka-soft" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-20 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-28">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-bold text-navy shadow-sm">
              <span className="size-2 rounded-full bg-mint" aria-hidden />
              Self-serve frozen yogurt · Monmouth County, NJ
            </p>
            <h1 className="text-[3.4rem] leading-[0.95] font-bold tracking-tight text-navy sm:text-7xl lg:text-[5.5rem]">
              <span className="block text-brand">Create it…</span>
              <span className="block text-pink">Top it…</span>
              <span className="block">Enjoy it!</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
              Family owned since {site.founded}, Fro Yo Cafe is one of Monmouth
              County&apos;s favorite build-your-own frozen yogurt spots — with
              rotating flavors, a ridiculous toppings bar, and shops in
              Aberdeen, Manalapan and Ocean.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#locations"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3.5 text-base font-bold text-white shadow-[0_5px_0_var(--brand-deep)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:px-7 sm:py-4 sm:text-lg"
              >
                Find your Fro Yo <ArrowRight className="size-5" aria-hidden />
              </Link>
              <Link
                href="#treats"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-white px-5 py-3.5 text-base font-bold text-navy transition hover:border-brand hover:text-brand sm:px-7 sm:py-4 sm:text-lg"
              >
                Cakes & pies
              </Link>
            </div>
            <dl className="grid max-w-md grid-cols-3 gap-4 pt-2">
              {[
                [`${allFlavors.length}+`, "flavors"],
                [`${maxToppings}+`, "toppings"],
                [String(locations.length), "NJ shops"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-4xl font-bold text-brand">
                    {value}
                  </dd>
                  <dd className="text-sm font-semibold text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-2xl shadow-navy/20 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={createIt}
                alt="The Create it, Top it, Enjoy it wall above the yogurt machines at Fro Yo Cafe"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 w-36 animate-float overflow-hidden rounded-3xl border-[5px] border-white shadow-xl [--r:-6deg] sm:-left-10 sm:w-44">
              <Image
                src={froCookie}
                alt="A cup of chocolate fro yo topped with M&M's and a rainbow cookie"
                placeholder="blur"
                sizes="180px"
                className="aspect-[3/4] object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-3 flex size-28 animate-float flex-col items-center justify-center rounded-full bg-sun text-center font-display leading-none font-bold text-navy shadow-lg [--r:8deg] [animation-delay:-3s] sm:-right-6 sm:size-32">
              <span className="text-sm">Since</span>
              <span className="text-3xl sm:text-4xl">{site.founded}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flavor marquee */}
      <div className="relative -rotate-1 overflow-hidden border-y-4 border-navy bg-brand py-4 text-white">
        <div className="flex w-max animate-marquee gap-8 font-display text-2xl font-semibold whitespace-nowrap">
          {[...allFlavors, ...allFlavors].map((f, i) => (
            <span
              key={i}
              className="flex items-center gap-8"
              aria-hidden={i >= allFlavors.length}
            >
              {f}
              <span className="text-sun" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Your cup, your rules."
          align="center"
        >
          Three steps to the perfect cup. No wrong answers (but more toppings is
          usually right).
        </SectionHeading>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-3xl border border-border bg-card p-8 shadow-[0_8px_0_-2px_var(--border)]"
            >
              <span className="absolute top-6 right-7 font-display text-6xl font-bold text-navy/5">
                {i + 1}
              </span>
              <span
                className={`inline-flex size-14 items-center justify-center rounded-2xl ${step.color} text-white`}
              >
                <step.icon className="size-7" aria-hidden />
              </span>
              <h3 className="mt-6 text-3xl font-bold text-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Locations */}
      <section id="locations" className="relative bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Visit us"
              title="Three shops. One fro fam."
            >
              Pick a shop to see its hours, current flavors and toppings bar.
            </SectionHeading>
            <p className="rounded-2xl bg-secondary px-4 py-3 text-sm font-bold text-brand">
              🧱 Coming soon: Fro Yo Brick — early 2027
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((l) => (
              <LocationCard key={l.slug} location={l} />
            ))}
          </div>
        </div>
      </section>

      {/* Cakes, pies & doggie treats */}
      <section id="treats" className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-last lg:order-first">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-2xl shadow-navy/15">
              <Image
                src={photo2}
                alt="Fro Yo Cafe's toppings bar under the Create it, Top it, Enjoy it lettering"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 540px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-2 -bottom-6 rotate-3 rounded-3xl bg-pink px-6 py-4 font-display text-xl font-bold text-white shadow-lg sm:-right-6">
              Made to order 🎂
            </div>
          </div>
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Celebrate with fro yo"
              title="Cakes, pies & pup cups."
            >
              Custom frozen yogurt cakes and pies made with your favorite
              flavors of the week — plus treats for your four-legged fro fam.
            </SectionHeading>
            <ul className="space-y-4">
              {treats.map((t, i) => {
                const Icon = [CakeSlice, CakeSlice, Dog][i]
                return (
                  <li
                    key={t.name}
                    className="flex gap-4 rounded-3xl border border-border bg-card p-5"
                  >
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-brand">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <h3 className="text-xl font-bold text-navy">
                          {t.name}
                        </h3>
                        <p className="font-display text-lg font-bold text-brand">
                          {t.price}
                        </p>
                      </div>
                      <p className="text-muted-foreground">{t.description}</p>
                      {t.note && (
                        <p className="text-sm font-semibold text-pink">
                          {t.note}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="text-sm text-muted-foreground">
              Call your shop to order. Prices shown are from our Aberdeen menu.
            </p>
          </div>
        </div>
      </section>

      {/* Parties & fundraisers */}
      <section
        id="parties"
        className="relative overflow-hidden bg-navy py-24 text-white"
      >
        <div
          className="absolute -top-24 -right-24 size-72 rounded-full polka opacity-25"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -left-20 size-64 rounded-full polka opacity-15"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Parties & fundraisers"
            title="Bring the toppings bar to your next big moment."
            invert
          >
            Birthdays, team wins, class fundraisers — we&apos;ve got a sweet
            deal for it.
          </SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: PartyPopper,
                title: "Party packs",
                body: "Celebrating with a crowd? Parties can be priced at a flat rate instead of by the ounce.",
              },
              {
                icon: HeartHandshake,
                title: "Dine to donate",
                body: "Book a night at your shop and we'll give back a share of sales to your school, team or local organization.",
              },
              {
                icon: Gift,
                title: "Gift cards",
                body: "The easiest gift for birthdays, teachers, coaches and anyone with a sweet tooth. Available in store.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white/[0.07] p-7 ring-1 ring-white/10 backdrop-blur-sm"
              >
                <item.icon className="size-8 text-sun" aria-hidden />
                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 text-white/75">{item.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 text-lg font-bold text-navy shadow-[0_5px_0_#c47f00] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
          >
            Plan something sweet <ArrowRight className="size-5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Love */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {site.reviews.map((r) => (
            <figure
              key={r.author}
              className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-[2rem] bg-brand p-8 text-white md:p-12"
            >
              <span
                className="pointer-events-none absolute -top-10 right-6 font-display text-[12rem] leading-none text-white/10"
                aria-hidden
              >
                &ldquo;
              </span>
              <div
                className="flex gap-1 text-sun"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-6 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="relative font-display text-2xl leading-snug font-medium md:text-3xl">
                “{r.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <span
                  className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 font-display text-xl font-bold"
                  aria-hidden
                >
                  {r.author[0]}
                </span>
                <span>
                  <span className="block font-bold">{r.author}</span>
                  <span className="text-sm text-white/70">{r.source}</span>
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="flex flex-col gap-6">
            <a
              href={site.press.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-1 flex-col justify-between gap-6 rounded-[2rem] border border-border bg-card p-8 transition hover:border-brand"
            >
              <div className="space-y-3">
                <p className="text-sm font-bold tracking-wide text-pink uppercase">
                  As seen on {site.press.outlet}
                </p>
                <h3 className="text-2xl font-bold text-navy">
                  {site.press.title}
                </h3>
                <p className="text-muted-foreground">“{site.press.quote}”</p>
              </div>
              <span className="inline-flex items-center gap-2 font-bold text-brand">
                Read the article
                <ExternalLink
                  className="size-4 transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </a>
            <div className="flex items-center justify-center rounded-[2rem] bg-secondary p-8">
              <Image
                src={frogeddaboutit}
                alt="Frogeddaboutit"
                sizes="400px"
                className="h-auto w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Our story"
              title={`A family scoop shop since ${site.founded}.`}
            >
              <p>
                Fro Yo Cafe is family owned and operated. What started as one
                self-serve shop in Aberdeen has grown into three — Aberdeen,
                Manalapan and Seaview — with Brick on the way.
              </p>
              <p className="mt-4">
                We keep it simple: lots of flavors, toppings as far as the eye
                can see, plenty of samples, and a spot for the whole family
                (yes, even the dog) to hang out after the game.
              </p>
            </SectionHeading>
            <div className="flex flex-wrap gap-2">
              {locations.map((l) => (
                <a
                  key={l.slug}
                  href={`https://www.instagram.com/${l.instagram}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-navy transition hover:border-pink hover:text-pink"
                >
                  <InstagramIcon className="size-4" />@{l.instagram}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Follow your shop on Instagram for new flavors, events and
              fundraisers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-3xl">
              <Image
                src={store}
                alt="Navy booth seating and the toppings bar inside Fro Yo Cafe"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 540px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src={photo1}
                alt="Blue chairs, booths and a Fro Yo Cafe sign inside the shop"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 260px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="flex aspect-square items-center justify-center rounded-3xl bg-cream polka p-6">
              <p className="rounded-2xl bg-white px-5 py-4 text-center font-display text-xl leading-tight font-bold text-navy shadow-md">
                Sample before you swirl.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
