import { bookmarkRouter } from "./routers/bookmark";
import { commentRouter } from "./routers/comment";
import { draftPostRouter } from "./routers/draftPost";
import { draftPostIterationReviewsRouter } from "./routers/draftPostIterationReviews";
import { featuredPostRouter } from "./routers/featuredPost";
import { likeRouter } from "./routers/likes";
import { postRouter } from "./routers/post";
import { presignedR2UrlRouter } from "./routers/presignedR2Url";
import { genreTagRouter } from "./routers/genre&Tags";

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
  genreTagRouter: genreTagRouter,
});

export type AppRouter = typeof appRouter;
