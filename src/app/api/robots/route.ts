import { NextResponse } from "next/server";

export async function GET() {
  const content = `User-agent: *
Allow: /
Allow: /about
Allow: /contactUs
Disallow: /myfeed

Sitemap: https://kalamanch.org/sitemap.xml`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
