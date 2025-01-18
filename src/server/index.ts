import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { likeRouter } from "./routers/likes";
import { commentRouter } from "./routers/comment";
import { featuredPostRouter } from "./routers/featuredPost";
import { UsersToFollowRouter } from "./routers/usersToFollow";
import { draftPostRouter } from "./routers/draftPost";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  draftPost: draftPostRouter,
  likes: likeRouter,
  comments: commentRouter,
  usersToFollow: UsersToFollowRouter,
  featuredPost: featuredPostRouter,
});

export type AppRouter = typeof appRouter;
