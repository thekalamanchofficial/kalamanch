"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DraftPost, PostStatus } from "../../types/types";
import { Card, CardContent, Box, Button } from "@mui/material";
import EditorPostFooter from "../editorPostFooter/EditorPostFooter";
import PostCardContent from "~/app/_components/postCardContent/PostCardContent";
import { useSelectedDraftPost } from "../../contexts/SelectedDraftPostContext";
import PublishDraftDialog from "../publishDraftDialog/PublishDraftDialog";

interface Props {
  draftPosts: DraftPost[];
  handlePublishDraftPostIteration: (draftpost: DraftPost , iterationId: string) => Promise<void>
  handleEditDraftPost: (draftPostId: string) => void
}

export default function EditorDraftPostsSection({
  draftPosts,
  handlePublishDraftPostIteration,
  handleEditDraftPost

}: Props) {
  const { selectedDraftPostId, setSelectedDraftPostId } =useSelectedDraftPost();
  const postRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [selectedDraftPostIdForPublishing, setSelectedDraftPostIdForPublishing] = useState("");

  // Debounced scroll handler
  const handleScroll = () => {
    setIsUserScrolling(true);

    const visiblePost = draftPosts.find((post) => {
      const ref = postRefs.current.get(post.id ?? "");
      if (ref) {
        const rect = ref.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight;
      }
      return false;
    });

    if (visiblePost) {
      setSelectedDraftPostId(visiblePost.id ?? "");
    }
  };

  const handleDraftIterationPublishing = async (iterationId: string) => {
    if (selectedDraftPostId) {
      await handlePublishDraftPostIteration(draftPosts.find((post) => post.id === selectedDraftPostId)!, iterationId);
    }
    setSelectedDraftPostIdForPublishing("");
  };

  useEffect(() => {
    setSelectedDraftPostId(draftPosts[0]?.id ?? "");
  }, [draftPosts]);

  useEffect(() => {
    if (!isUserScrolling) return;

    const timeout = setTimeout(() => {
      setIsUserScrolling(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [isUserScrolling]);

  useEffect(() => {
    if (!isUserScrolling && selectedDraftPostId) {
      postRefs.current.get(selectedDraftPostId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsUserScrolling(false);
    }
  }, [selectedDraftPostId, draftPosts]);

  return (
    <Box
      onScroll={handleScroll}
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      {draftPosts.map((post) => (
        <div key={post.id} ref={(el) => {
          postRefs.current.set(post.id ?? "",el);
        }}>
          <Card sx={{ mb: 2, boxShadow: "none" }}>
            <CardContent>
              <Fragment>
                <PostCardContent
                  articleTitle={post.postDetails.title}
                  articleContent={post.iterations[0]?.content ?? ""}
                  articleTags={post.postDetails.tags}
                  articleImage={post.postDetails.thumbnailDetails.url}
                  articleId={post.id ?? ""}
                  articleDescription={
                    post.postDetails.thumbnailDetails.content ?? ""
                  }
                  savedDate={post.updatedAt}
                />
                <EditorPostFooter postStatus={PostStatus.DRAFT} handlePublishOrUnpublishButtonClick={() => setSelectedDraftPostIdForPublishing(post.id ?? "") } handleEditButtonClick={() => {handleEditDraftPost(post.id ?? "")} } />
              </Fragment>
            </CardContent>
          </Card>
        </div>
      ))}

          {selectedDraftPostIdForPublishing != "" && <PublishDraftDialog
            iterations={draftPosts.find((post) => post.id === selectedDraftPostIdForPublishing)?.iterations ?? []}
            onPublish={handleDraftIterationPublishing}
            onCancel={() => setSelectedDraftPostIdForPublishing("")}
            title="Select Iteration to Publish"
            description="Choose which iteration of your draft you want to publish"
            open={selectedDraftPostIdForPublishing !== ""}
          />}
      
    </Box>
  );
}
