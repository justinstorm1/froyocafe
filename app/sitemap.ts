import type { MetadataRoute } from "next"

import { locations } from "@/lib/locations"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...locations.map((l) => ({
      url: `${site.url}/${l.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ]
}
