import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const route = request.nextUrl.pathname
  const userToken = request.cookies.get('logistix.user.auth')?.value;
  const customerToken = request.cookies.get('logistix.customer.auth')?.value;

  if (!(userToken || customerToken) && route.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/staff/web/login', request.url));
  } else if (
    (customerToken && route.startsWith('/customer/web/'))
    || userToken && route.startsWith('staff/web')
  ){
    return NextResponse.redirect(new URL('/dashboard/welcome', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*'
  ],
}