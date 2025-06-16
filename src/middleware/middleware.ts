import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Get the hostname and pathname from the request
  const hostname = req.headers.get("host") || ""
  const { pathname, search } = req.nextUrl

  // Normalize the path (remove trailing slash if present)
  const normalizedPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname

  // Check if this is a request from the production domain
  if (hostname.includes("bnbmehomes.com")) {
    // Define specific redirects for the production domain
    const redirectMap: { [key: string]: string } = {
      "/property/bnbmehomes-luxurious-3-br-haven-in-aqiq-riyadh":
        "/property/bnbmehomes-3-br-elite-suite-near-kingdom-tower-233698",
    }

    // Check if the path should be redirected
    if (redirectMap[normalizedPath]) {
      // For testing, redirect to localhost:3000
      const redirectUrl = new URL(redirectMap[normalizedPath], "https://localhost:3000")

      // Preserve query parameters
      redirectUrl.search = search

      return NextResponse.redirect(redirectUrl.toString(), 301)
    }
  }

  return NextResponse.next()
}

// Match all routes
export const config = {
  matcher: ["/:path*"],
}