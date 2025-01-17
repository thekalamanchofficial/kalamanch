"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardContent, Box } from "@mui/material";
import EditorPostFooter from "../editorPostFooter/EditorPostFooter";
import PostCardContent from "~/app/_components/postCardContent/PostCardContent";
import { Post } from "~/app/(with-sidebar)/myfeed/types/types";
import { PostStatus } from "../../types/types";
import { useSelectedPublishedPost } from "../../contexts/SelectedPublishedPostContext";

interface Props {
  posts: Post[];
  handleOnPostUnpublish: (postId: string) => void;
  handleOnPostEdit: (postId: string) => void;
}

export default function EditorPublishedPostsSection({
  posts,
  handleOnPostUnpublish,
  handleOnPostEdit
}: Props) {
  const { selectedPublishedPostId, setSelectedPublishedPostId } = useSelectedPublishedPost();
  const postRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  
  const handleScroll = () => {
    setIsUserScrolling(true);
    const visiblePost = posts.find((post) => {
      const ref = postRefs.current.get(post.id ?? "");
      if (ref) {
        const rect = ref.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight;
      }
      return false;
    });

    if (visiblePost) {
      setSelectedPublishedPostId(visiblePost.id ?? "");
    }
  };

  useEffect(() => {
    setSelectedPublishedPostId(posts[0]?.id ?? "");
  }, [posts]);

  useEffect(() => {
    if (!isUserScrolling) return;
    const timeout = setTimeout(() => {
      setIsUserScrolling(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [isUserScrolling]);

  useEffect(() => {
    if (!isUserScrolling && selectedPublishedPostId) {
      postRefs.current.get(selectedPublishedPostId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsUserScrolling(false);
    }
  }, [selectedPublishedPostId, posts]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
      onScroll={handleScroll}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          ref={(el) => {
            postRefs.current.set(post.id ?? "",el);
          }}
        >
          <Card  sx={{ mb: 2, boxShadow: "none" }}>
            <CardContent>
              <Fragment>
                <PostCardContent
                  articleTitle={post.postDetails.title}
                  articleContent={post.content}
                  articleTags={post.postDetails.tags}
                  articleImage={post.postDetails.thumbnailDetails.url}
                  articleId={post.id}
                  articleDescription={post.postDetails.thumbnailDetails.content ?? ""}
                  savedDate={post.updatedAt}
                />
                <EditorPostFooter handleEditButtonClick={() => handleOnPostEdit(post.id ?? "")} handlePublishOrUnpublishButtonClick={() => handleOnPostUnpublish(post.id ?? "")} postStatus={PostStatus.PUBLISHED} />
              </Fragment>
            </CardContent>
          </Card>
        </div>
      ))}
    </Box>
    
  );
}

