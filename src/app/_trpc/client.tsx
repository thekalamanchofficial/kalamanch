"use client";

import { useState } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "~/server";
import { makeQueryClient } from "./query-client";

export const trpc = createTRPCReact<AppRouter>();
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}
function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    const isDev = process.env.NODE_ENV === "development";
    return isDev ? "http://localhost:3000" : "https://kalamanch.vercel.app";
  })();
  return `${base}/api/trpc`;
}
export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  );
}
