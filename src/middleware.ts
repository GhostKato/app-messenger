import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken');
   const isAuthenticated = token && token.value.trim() !== '';

  const publicPaths = ['/login', '/register', '/'];
  
  if (!isAuthenticated && !publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  if (isAuthenticated && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/message/:path*', '/message'],
};
