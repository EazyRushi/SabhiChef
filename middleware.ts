import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Protect /account routes
  if (pathname.startsWith('/account') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect /admin routes with strict role check
  if (pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Fetch user profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      // If they are logged in but NOT an admin, kick them back to their customer account
      return NextResponse.redirect(new URL('/account', request.url))
    }
  }

  // Redirect logged-in users away from login/signup
  if ((pathname === '/login' || pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/checkout', '/login', '/signup'],
}
