import Link from "next/link"

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 polka-soft" aria-hidden />
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <p className="font-display text-8xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-4xl font-bold text-navy">
          This cup is empty.
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We couldn&apos;t find that page — but we know where the toppings are.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-brand px-7 py-4 text-lg font-bold text-white shadow-[0_5px_0_var(--brand-deep)]"
        >
          Back to Fro Yo Cafe
        </Link>
      </div>
    </div>
  )
}
