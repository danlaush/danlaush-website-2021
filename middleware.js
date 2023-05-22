import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
 
const USER = process.env.BASICAUTH_USER;
const PASS = process.env.BASICAUTH_PASS;

const log_prepend = 'Authorization - '
const log = msg => console.log(new Date(), log_prepend, msg)

// This function can be marked `async` if using `await` inside
export function middleware(request, res) {
  const auth = request.headers.get('authorization');
  if(!auth) {
    log('No credentials provided');
    return new NextResponse(
      JSON.stringify({ success: false, message: 'No credentials provided' }),
      { status: 401, headers: { 'content-type': 'application/json', 'WWW-Authenticate':'Basic realm=Sound map applet' } },
    )
  }
  
  const encoded = (auth || '').split(' ')[1];
  const decoded = atob(encoded);
  const [user, pass] = decoded.split(':')

  if(USER == user && PASS == pass) {
    log('Correct credentials');
    return NextResponse.next();
  } else {
    log('Credentials invalid')
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Credentials invalid' }),
      { status: 401, headers: { 'content-type': 'application/json', 'WWW-Authenticate':'Basic realm=Sound map applet' } },
    )
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/sound/:path*',
};