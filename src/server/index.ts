import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { likeRouter } from "./routers/likes";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  likes: likeRouter,
});

export type AppRouter = typeof appRouter;
