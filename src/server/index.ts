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
import { presignedR2UrlRouter } from "./routers/presignedR2Url";

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
  presignedR2Url: presignedR2UrlRouter,
  
});

export type AppRouter = typeof appRouter;
