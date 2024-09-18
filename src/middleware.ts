// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware-Logik hier, ohne serverseitige Module zu importieren
  return NextResponse.next()
}

export const config = {
  matcher: ['/protected/:path*'],
}
