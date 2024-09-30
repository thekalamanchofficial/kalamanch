import { createTRPCReact } from "@trpc/react-query";

import { AppRouter, appRouter } from ".";

export const trpc = createTRPCReact<AppRouter>({});
