import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const protectedRoutes =
        [
            '/property',
            '/admin',
            '/dashboard',
            '/inventory'

        ];
    const path = request.nextUrl.pathname
    const isCurrentPathProtected = protectedRoutes.some((route) => path.startsWith(route));

    // If the user does not exist and the URL contains /vendor, redirect them to the home page
    if (!token && isCurrentPathProtected) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the user exists and tries to access the login page, redirect them to the home page
    if (token && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
