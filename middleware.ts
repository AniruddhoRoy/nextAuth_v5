// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const {auth} = NextAuth(authConfig)
import { 
    publicRoutes,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix 
} from "@/routes";

//@ts-ignore
export default auth((req)=>{
    const {nextUrl} = req;
    const isloggedin = !!req.auth;
    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoutes)
    {
        return null;
    }
    if(isAuthRoutes)
    {
        if(isloggedin)
        {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null;
    }
    if(!isPublicRoute && !isloggedin)
    {
        return Response.redirect(new URL("/auth/login",nextUrl))
    }
    return null;
})
export const config ={
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ]
}
