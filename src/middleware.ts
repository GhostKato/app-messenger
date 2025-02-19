import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  const isAuthenticated = token && token.trim() !== '';
  // console.log(token);
  // console.log(isAuthenticated);
  // console.log('Authorization Header:', req.headers.get('Authorization'));


  // const publicPaths = ['/login', '/register', '/'];

  // if (!isAuthenticated && !publicPaths.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  if (isAuthenticated && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.url)); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/message/:path*', '/message'],
};
