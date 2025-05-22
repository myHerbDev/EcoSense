import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Paths that require payment
const PROTECTED_PATHS = ["/ai-advisor"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path requires payment
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    // Check if the user has paid
    const paymentStatus = request.cookies.get("paymentStatus")?.value

    // If not paid, redirect to payment page
    if (paymentStatus !== "paid") {
      return NextResponse.redirect(new URL("/payment", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/ai-advisor/:path*"],
}
