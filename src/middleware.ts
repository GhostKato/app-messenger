import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  
  const token = req.cookies.get('accessToken')?.value;

  const isAuthenticated = Boolean(token);
  console.log('Token:', token);
  console.log('isAuthenticated:', isAuthenticated);

  const publicPaths = ['/login', '/register'];
  
  if (!isAuthenticated && !publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  if (isAuthenticated && publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/message/:path*'],
};
