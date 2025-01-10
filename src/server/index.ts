import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { likeRouter } from "./routers/likes";
import { commentRouter } from "./routers/comment";
import { featuredPostRouter } from "./routers/featuredPost";
import { UsersToFollowRouter } from "./routers/usersToFollow";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  likes: likeRouter,
  comments: commentRouter,
  usersToFollow: UsersToFollowRouter,
  featuredPost: featuredPostRouter,
});

export type AppRouter = typeof appRouter;
