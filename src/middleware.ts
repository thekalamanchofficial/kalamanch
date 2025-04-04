import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about(.*)",
  "/contactUs(.*)",
  "/api/webhooks(.*)",
  "/api/inngest(.*)",
  "/api/trpc/presignedR2Url(.*)",
  "/api/robots(.*)",
  "/sitemap.xml",
  "/robots.txt",
]);
const isOnboardingRoute = createRouteMatcher(["/onboarding", "/api/trpc(.*)"]);
const isContactUsRoute = createRouteMatcher(["/contactUs", "/api/trpc/contactUsRouter(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const userAgent = request.headers.get("user-agent") ?? "";
  const { userId, sessionClaims } = auth();

  const isGooglebot = /Googlebot|Bingbot|DuckDuckBot/i.test(userAgent);

  if (isGooglebot && isPublicRoute(request)) {
    return NextResponse.next();
  }

  // For users visiting /onboarding or making API calls during onboarding, don't try to redirect
  if (userId && isOnboardingRoute(request)) {
    return NextResponse.next();
  }

  if (isContactUsRoute(request)) {
    return NextResponse.next();
  }

  if (!isPublicRoute(request)) {
    auth().protect();
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", request.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && !isPublicRoute(request)) return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
