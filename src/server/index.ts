import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { likeRouter } from "./routers/likes";
import { commentRouter } from "./routers/comment";
import { featuredAuthorRouter } from "./routers/featuredAuthor";
import { featuredPostRouter } from "./routers/featuredPost";
import { editorPostRouter } from "./routers/editorPost";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  likes: likeRouter,
  comments: commentRouter,
  featuredAuthor: featuredAuthorRouter,
  featuredPost: featuredPostRouter,
  editorPost: editorPostRouter,

});

export type AppRouter = typeof appRouter;
