import Image from "next/image"

import logo from "@/public/images/logo.png"
import logoWhite from "@/public/images/logo-white.png"
import { cn } from "@/lib/utils"

export function Logo({
  variant = "blue",
  className,
  preload,
}: {
  variant?: "blue" | "white"
  className?: string
  preload?: boolean
}) {
  return (
    <Image
      src={variant === "white" ? logoWhite : logo}
      alt="Fro Yo Café"
      preload={preload}
      className={cn("h-auto w-36", className)}
      sizes="(min-width: 768px) 240px, 160px"
    />
  )
}
