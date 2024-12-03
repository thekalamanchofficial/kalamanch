import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
