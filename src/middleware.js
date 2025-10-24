import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === '/admin/login') {
    // If already logged in, redirect to dashboard
    const admin = verifyAdminToken(request);
    if (admin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin routes except login
  if (pathname.startsWith('/admin')) {
    const admin = verifyAdminToken(request);
    
    if (!admin) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
