"use client"; // Ensures it runs only on the client side

import { useEffect } from "react";
import Script from "next/script";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID; // Replace with your GA ID

export default function Analytics() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Define `window.dataLayer` to avoid TypeScript errors
      (window as any).dataLayer = (window as any).dataLayer || [];

      function gtag(...args: any) {
        (window as any).dataLayer.push(args);
      }

      gtag("js", new Date());
      gtag("config", GA_TRACKING_ID, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
