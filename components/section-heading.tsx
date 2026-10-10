import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  invert,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  children?: React.ReactNode
  align?: "left" | "center"
  invert?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "font-display text-sm font-semibold tracking-[0.18em] uppercase",
          invert ? "text-sun" : "text-pink"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-4xl leading-[1.05] font-bold md:text-5xl",
          invert ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {children && (
        <div
          className={cn(
            "text-lg",
            invert ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
