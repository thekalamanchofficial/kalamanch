import type { getAuth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";

export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: ReturnType<typeof getAuth>;
}) => {
  return {
    userId: opts.auth.userId,
    ...opts,
  };
};

const trpc = initTRPC.context<typeof createTRPCContext>().create();

const enforceUserIsAuthed = trpc.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { userId: ctx.userId } });
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(enforceUserIsAuthed);
export const createCallerFactory = trpc.createCallerFactory;
