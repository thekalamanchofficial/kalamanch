import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { likeRouter } from "./routers/likes";
import { commentRouter } from "./routers/comment";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  likes: likeRouter,
  comments: commentRouter,
});

export type AppRouter = typeof appRouter;
