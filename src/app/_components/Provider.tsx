"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "../../server/client";

export default function Provider({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url: isDev
            ? "http://localhost:3000/api/trpc"
            : "https://kalamanch.vercel.app/api/trpc",
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
