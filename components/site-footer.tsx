import Link from "next/link"

import { Logo } from "@/components/logo"
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/social-icons"
import { fullAddress, locations, telHref, type Location } from "@/lib/locations"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-x-0 top-0 h-3 polka opacity-90"
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-10 md:grid-cols-[1.2fr_2fr] md:px-6">
        <div className="space-y-5">
          <Logo variant="white" className="w-48" />
          <p className="max-w-xs text-white/75">
            Family owned and operated since {site.founded}. {site.tagline}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {locations.map((l) => (
            <div key={l.slug} className="space-y-2 text-sm">
              <h3 className="text-lg font-semibold">
                <Link href={`/${l.slug}`} className="hover:text-sun">
                  {l.name}
                </Link>
              </h3>
              <p className="text-white/70">{l.venue}</p>
              <p className="text-white/70">{fullAddress(l)}</p>
              <a
                href={telHref(l.phone)}
                className="block font-bold hover:text-sun"
              >
                {l.phone}
              </a>
              <LocationSocials location={l} />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:justify-between md:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Flavors and toppings rotate — call your shop for today&apos;s
            lineup.
          </p>
        </div>
      </div>
    </footer>
  )
}

const iconLinkClass =
  "inline-flex size-9 items-center justify-center rounded-full bg-white/10 transition"

function LocationSocials({ location: l }: { location: Location }) {
  const links = [
    {
      network: "Instagram",
      href: `https://www.instagram.com/${l.instagram}/`,
      Icon: InstagramIcon,
      hover: "hover:bg-pink",
    },
    l.facebook && {
      network: "Facebook",
      href: l.facebook,
      Icon: FacebookIcon,
      hover: "hover:bg-sky",
    },
    l.tiktok && {
      network: "TikTok",
      href: `https://www.tiktok.com/@${l.tiktok}`,
      Icon: TikTokIcon,
      hover: "hover:bg-mint",
    },
  ].filter((link) => !!link)

  return (
    <ul className="flex gap-2 pt-2">
      {links.map(({ network, href, Icon, hover }) => (
        <li key={network}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${network}: Fro Yo Cafe ${l.name}`}
            title={`${network} — ${l.name}`}
            className={`${iconLinkClass} ${hover}`}
          >
            <Icon className="size-[1.125rem]" />
          </a>
        </li>
      ))}
    </ul>
  )
}
