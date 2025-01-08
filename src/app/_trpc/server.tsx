import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { createCallerFactory, createTRPCContext } from "~/server/trpc";
import { appRouter } from "~/server";
import { cookies, headers } from "next/headers";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
    auth: getAuth(
      new NextRequest("https://kalamanch.vercel.app", { headers: headers() }),
    ),
  });
});


export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);
export const { trpc: trpcServer, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
