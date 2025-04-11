import { bookmarkRouter } from "./routers/bookmark";
import { commentRouter } from "./routers/comment";
import { contactUsRouter } from "./routers/contactUs";
import { draftPostRouter } from "./routers/draftPost";
import { draftPostIterationReviewsRouter } from "./routers/draftPostIterationReviews";
import { evaluatorRouter } from "./routers/evaluators";
import { featuredPostRouter } from "./routers/featuredPost";
import { genreTagRouter } from "./routers/genre&Tags";
import { likeRouter } from "./routers/likes";
import { postRouter } from "./routers/post";
import { presignedR2UrlRouter } from "./routers/presignedR2Url";
import { userRouter } from "./routers/user";
import { UsersToFollowRouter } from "./routers/usersToFollow";
import { router } from "./trpc";

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
  contactUsRouter: contactUsRouter,
  evaluatorRouter: evaluatorRouter,
});

export type AppRouter = typeof appRouter;
