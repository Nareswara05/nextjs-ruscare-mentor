import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl.clone();

  if (!token && url.pathname === '/dashboard-mentor') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  
  if (token && url.pathname === '/') {
    url.pathname = '/dashboard-mentor';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard-mentor', '/'],
};
