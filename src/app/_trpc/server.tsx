import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { appRouter } from "~/server";
import { createCallerFactory, createTRPCContext } from "~/server/trpc";
import { makeQueryClient } from "./query-client";

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
    auth: getAuth(new NextRequest("https://kalamanch.vercel.app", { headers: headers() })),
  });
});

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);
export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
