"use client";

import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { Card, CardContent, Box } from "@mui/material";
import EditorPostFooter from "../editPostFooter/EditPostFooter";
import PostCardContent from "~/app/_components/postCardContent/PostCardContent";
import { type Post } from "~/app/(with-sidebar)/myfeed/types/types";
import { PostStatus } from "../../types/types";
import { useSelectedPublishedPost } from "../../_contexts/SelectedPublishedPostContext";

interface EditorPublishedPostsSectionProps {
  posts: Post[];
  handleOnPostUnpublish: (postId: string) => void;
  handleOnPostEdit: (postId: string) => void;
}

export default function EditorPublishedPostsSection({
  posts,
  handleOnPostUnpublish,
  handleOnPostEdit,
}: EditorPublishedPostsSectionProps) {
  const {
    selectedPublishedPostId,
    setSelectedPublishedPostId,
    selectedPublishedPostIdInLeftSideBar,
    setSelectedPublishedPostIdInLeftSideBar,
  } = useSelectedPublishedPost();
  const postRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const postId = entry.target.getAttribute("data-post-id");
          if (postId) {
            setSelectedPublishedPostId(postId);
            break;
          }
        }
      }
    },
    [selectedPublishedPostId], // TODO: lint error
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    });

    postRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [posts, handleIntersection]);

  useEffect(() => {
    setSelectedPublishedPostId(posts[0]?.id ?? "");
    setSelectedPublishedPostIdInLeftSideBar(posts[0]?.id ?? "");
  }, [posts]);

  useEffect(() => {
    const selectedPostRef = postRefs.current.get(
      selectedPublishedPostIdInLeftSideBar ?? "",
    );
    if (selectedPostRef) {
      selectedPostRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSelectedPublishedPostId(selectedPublishedPostIdInLeftSideBar);
  }, [selectedPublishedPostIdInLeftSideBar]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          ref={(el) => {
            postRefs.current.set(post.id ?? "", el);
          }}
          data-post-id={post.id}
        >
          <Card sx={{ mb: 2, boxShadow: "none" }}>
            <CardContent>
              <Fragment>
                <PostCardContent
                  articleTitle={post.postDetails.title}
                  articleContent={post.content}
                  articleTags={post.postDetails.tags}
                  articleImage={post.postDetails.thumbnailDetails.url}
                  articleId={post.id}
                  articleDescription={
                    post.postDetails.thumbnailDetails.content ?? ""
                  }
                  savedDate={post.updatedAt}
                />
                <EditorPostFooter
                  handleEditButtonClick={() => handleOnPostEdit(post.id ?? "")}
                  handlePublishOrUnpublishButtonClick={() =>
                    handleOnPostUnpublish(post.id ?? "")
                  }
                  postStatus={PostStatus.PUBLISHED}
                />
              </Fragment>
            </CardContent>
          </Card>
        </div>
      ))}
    </Box>
  );
}
