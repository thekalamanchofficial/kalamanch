"use client";

import { memo, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, Card, CardContent } from "@mui/material";
import { type Post as PostType } from "~/app/(with-sidebar)/myfeed/types/types";
import { usePostUnpublishing } from "~/app/editor/_hooks/usePostUnpublishing";
import { PostStatus } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { useBookmark } from "~/hooks/useBookmark";
import { useComments } from "~/hooks/useComments";
import { useLike } from "~/hooks/useLike";
import CommentSection from "../CommentSection/CommentSection";
import FollowButton from "../followButton/FollowButton";
import PostCardContent from "../postCardContent/PostCardContent";
import PostCardFooter from "../postCardFooter/PostCardFooter";
import UserNameProfile from "../userNameProfile/UserNameProfile";

type PostProps = {
  post: PostType;
  userFollowing?: string[];
  isLiked: boolean;
  isBookmarked: boolean;
  setPosts?: React.Dispatch<React.SetStateAction<PostType[]>>;
  isUserPublishedPostFeed?: boolean;
};

const Post = memo<PostProps>(
  ({ post, userFollowing, isLiked, isBookmarked, setPosts, isUserPublishedPostFeed }) => {
    const { user } = useUser();
    const userEmail = user?.email;
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { hasLiked, likeCount, handleLike } = useLike({
      initialLikeCount: post.likeCount,
      initialIsLiked: isLiked,
      postId: post.id,
      postStatus: PostStatus.PUBLISHED,
      userEmail,
    });

    const { hasBookmarked, handleBookmark } = useBookmark({
      initialIsBookmarked: isBookmarked,
      postId: post.id,
      userEmail,
    });

    const { comments, handleAddComment } = useComments({
      initialComments: post.comments ?? [],
      postId: post.id,
      postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
      userEmail,
      userName: user?.name ?? userEmail,
      userProfileImageUrl: user?.profileImageUrl ?? "",
    });

    const toggleComments = useCallback(() => {
      setIsCommentOpen((prev) => !prev);
    }, []);

    const handleEditPost = (postId: string) => {
      const queryData = { postId };
      const query = new URLSearchParams(queryData).toString();
      router.push(`/editor?${query}`);
    };

    const { handlePostUnPublishing } = usePostUnpublishing({
      setPublishedPostsForUser: setPosts,
    });

    return (
      <Card sx={{ mb: 2, boxShadow: "none" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <UserNameProfile
              AuthorName={post.authorName}
              AuthorImage={post.authorProfileImageUrl}
            />
            {user?.id !== post.authorId && !isUserPublishedPostFeed && (
              <FollowButton
                authorProfileLink={post.authorId}
                isFollowing={userFollowing?.includes(post.authorId)}
              />
            )}
          </Box>
          <PostCardContent
            articleTitle={post.title}
            articleContent={post.content}
            articleTags={post.tags ?? []}
            articleGenres={post.genres ?? []}
            articleThumbnailUrl={post.thumbnailDetails.url}
            articleThumbnailContent={post.thumbnailDetails.content ?? ""}
            articleThumbnailTitle={post.thumbnailDetails.title ?? ""}
            articleId={post.id}
          />
          <PostCardFooter
            likes={likeCount}
            comments={comments}
            bids={post.bids ?? []}
            isLiked={hasLiked}
            isBookmarked={hasBookmarked}
            handleLikeButton={handleLike}
            openCommentBox={toggleComments}
            postId={post.id}
            showLikes={true}
            showComments={true}
            showBids={true}
            showBookmark={true}
            showShare={true}
            showEditPublishedPost={pathname === "/profile" && isUserPublishedPostFeed}
            showUnpublishPost={pathname === "/profile" && isUserPublishedPostFeed}
            handleUnpublishPost={handlePostUnPublishing}
            handleBookmark={handleBookmark}
            handleEditPublishedPost={handleEditPost}
          />
          {isCommentOpen && <CommentSection comments={comments} addComment={handleAddComment} />}
        </CardContent>
      </Card>
    );
  },
);

Post.displayName = "Post";

export default Post;
