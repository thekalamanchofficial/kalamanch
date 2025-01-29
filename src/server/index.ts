import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { likeRouter } from "./routers/likes";
import { commentRouter } from "./routers/comment";
import { featuredPostRouter } from "./routers/featuredPost";
import { UsersToFollowRouter } from "./routers/usersToFollow";
import { draftPostRouter } from "./routers/draftPost";
import { draftPostIterationReviewsRouter } from "./routers/draftPostIterationReviews";
import { bookmarkRouter } from "./routers/bookmark";

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  draftPost: draftPostRouter,
  likes: likeRouter,
  comments: commentRouter,
  usersToFollow: UsersToFollowRouter,
  featuredPost: featuredPostRouter,
  draftPostIterationReview: draftPostIterationReviewsRouter,
  bookmarks: bookmarkRouter,
});

export type AppRouter = typeof appRouter;
