"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"

import type { ToppingGroup } from "@/lib/locations"
import { cn } from "@/lib/utils"

const chipColors = [
  "bg-pink/15 text-pink-800",
  "bg-sky/15 text-sky-800",
  "bg-sun/20 text-amber-800",
  "bg-mint/20 text-emerald-800",
]

export function ToppingsExplorer({ groups }: { groups: ToppingGroup[] }) {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return groups
      .filter((g) => !active || g.name === active)
      .map((g) => ({
        ...g,
        items: q ? g.items.filter((t) => t.toLowerCase().includes(q)) : g.items,
      }))
      .filter((g) => g.items.length > 0)
  }, [groups, query, active])

  const total = filtered.reduce((n, g) => n + g.items.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <label className="relative block max-w-md">
          <span className="sr-only">Search toppings</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search toppings… (try “fudge”)"
            className="h-12 w-full rounded-full border-2 border-input bg-white pr-11 pl-12 text-base font-semibold outline-none placeholder:font-normal focus:border-brand"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </label>
        <div className="-mx-4 flex [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1">
          {[null, ...groups.map((g) => g.name)].map((name) => (
            <button
              key={name ?? "all"}
              type="button"
              onClick={() => setActive(name)}
              aria-pressed={active === name}
              className={cn(
                "shrink-0 rounded-full border-2 px-4 py-1.5 text-sm font-bold transition",
                active === name
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-white text-navy hover:border-brand hover:text-brand"
              )}
            >
              {name ?? "All"}
            </button>
          ))}
        </div>
      </div>

      <p
        className="text-sm font-semibold text-muted-foreground"
        aria-live="polite"
      >
        {total} topping{total === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border-2 border-dashed border-border p-10 text-center text-muted-foreground">
          No toppings match “{query}”. Toppings change often — give the shop a
          call!
        </p>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((g, i) => (
            <section
              key={g.name}
              className="mb-5 break-inside-avoid rounded-3xl border border-border bg-card p-5"
            >
              <h3 className="mb-3 text-xl font-bold text-navy">{g.name}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <li
                    key={t}
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-semibold",
                      chipColors[i % chipColors.length]
                    )}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
