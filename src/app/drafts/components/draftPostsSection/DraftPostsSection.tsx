"use client";
import React, { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, Box } from "@mui/material";
import PostCardContent from "~/app/_components/postCardContent/PostCardContent";
import PublishDraftDialog from "../publishDraftDialog/PublishDraftDialog";
import { type DraftPost, PostStatus } from "~/app/editor/types/types";
import EditPostFooter from "~/app/editor/_components/editPostFooter/EditPostFooter";
import { useSelectedDraftPost } from "../../contexts/SelectedDraftPostContext";

type DraftPostProps = {
  draftPosts: DraftPost[];
  handlePublishDraftPostIteration: (draftpost: DraftPost, iterationId: string) => Promise<void>;
  handleEditDraftPost: (draftPostId: string) => void;
};

export default function DraftPostsSection({
  draftPosts,
  handlePublishDraftPostIteration,
  handleEditDraftPost,
}: DraftPostProps) {
  const {setSelectedDraftPostId,selectedDraftPostIdInLeftSideBar,setSelectedDraftPostIdInLeftSideBar} = useSelectedDraftPost();
  const postRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [selectedDraftPostIdForPublishing, setSelectedDraftPostIdForPublishing] = useState("");

  const handleDraftIterationPublishing = async (iterationId: string) => {
    if (selectedDraftPostIdForPublishing) {
      await handlePublishDraftPostIteration(draftPosts.find((post) => post.id === selectedDraftPostIdForPublishing)!, iterationId);
    }
    setSelectedDraftPostIdForPublishing("");
  };

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const postId = entry.target.getAttribute("data-post-id");
          if (postId) {
            setSelectedDraftPostId(postId);
            break; 
          }
        }
      }
    },
    [setSelectedDraftPostId]
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
  }, [draftPosts, handleIntersection]);


  useEffect(() => {
    const selectedPostRef = postRefs.current.get(selectedDraftPostIdInLeftSideBar ?? "");
    if (selectedPostRef) {
      selectedPostRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSelectedDraftPostId(selectedDraftPostIdInLeftSideBar)
  }, [selectedDraftPostIdInLeftSideBar]);

  useEffect(() => {
    setSelectedDraftPostId(draftPosts[0]?.id ?? "");
    setSelectedDraftPostIdInLeftSideBar(draftPosts[0]?.id ?? "")
  }, [draftPosts]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      {draftPosts.map((post) => (
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
                  articleContent={post.iterations[0]?.content ?? ""}
                  articleTags={post.postDetails.tags}
                  articleImage={post.postDetails.thumbnailDetails.url}
                  articleId={post.id ?? ""}
                  articleDescription={post.postDetails.thumbnailDetails.content ?? ""}
                  savedDate={post.updatedAt}
                />
                <EditPostFooter
                  postStatus={PostStatus.DRAFT}
                  handlePublishOrUnpublishButtonClick={() => setSelectedDraftPostIdForPublishing(post.id ?? "")}
                  handleEditButtonClick={() => {
                    handleEditDraftPost(post.id ?? "");
                  }}
                />
              </Fragment>
            </CardContent>
          </Card>
        </div>
      ))}

      {selectedDraftPostIdForPublishing != "" && (
        <PublishDraftDialog
          iterations={draftPosts.find((post) => post.id === selectedDraftPostIdForPublishing)?.iterations ?? []}
          onPublish={handleDraftIterationPublishing}
          onCancel={() => setSelectedDraftPostIdForPublishing("")}
          title="Select Iteration to Publish"
          description="Choose which iteration of your draft you want to publish"
          open={selectedDraftPostIdForPublishing !== ""}
        />
      )}
    </Box>
  );
}