"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { Logo } from "@/components/logo"
import { locations } from "@/lib/locations"
import { cn } from "@/lib/utils"

const links = [
  ...locations.map((l) => ({ href: `/${l.slug}`, label: l.name })),
  { href: "/#treats", label: "Cakes & Pies" },
  { href: "/#parties", label: "Parties" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:h-20 md:px-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo preload className="w-32 md:w-40" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[0.95rem] font-bold text-navy/80 transition-colors hover:bg-secondary hover:text-brand",
                pathname === link.href && "bg-secondary text-brand"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#locations"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_var(--brand-deep)] transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none sm:inline-flex"
          >
            Find a shop
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-secondary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-cream px-4 pt-4 pb-10 md:h-[calc(100svh-5rem)] lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-navy hover:bg-secondary hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#locations"
            onClick={() => setOpen(false)}
            className="mt-6 flex justify-center rounded-full bg-brand px-5 py-4 text-lg font-bold text-white"
          >
            Find a shop
          </Link>
        </nav>
      )}
    </header>
  )
}
