import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    // Old Squarespace routes.
    return [{ source: "/cart", destination: "/", permanent: true }]
  },
}

export default nextConfig
