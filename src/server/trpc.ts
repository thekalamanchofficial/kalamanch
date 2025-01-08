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

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = trpc.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  // Make ctx.userId non-nullable in protected procedures
  return next({ ctx: { userId: ctx.userId } });
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(enforceUserIsAuthed);
export const createCallerFactory = trpc.createCallerFactory;
