"use client";

import React from "react";
import { Box } from "@mui/material";
import { type PostStatus } from "~/app/editor/types/types";
import EditorActionsBar from "../editorActionsBar/EditorActionsBar";
import WritingPadEditor from "../writingPagEditor/WritingPadEditor";
import { useContentForm } from "./hooks/useContentForm";
import { useDraftContentAutosave } from "./hooks/useDraftContentAutosave";

type WritingPadProps = {
  handleOpen: () => void;
  title: string;
  defaultContentToDisplay: string;
  handleEditorContentChange: (
    data: string,
    iterationId: string,
    showToast?: boolean,
    title?: string,
  ) => void;
  handlePublish: (content: string) => void;
  currentIterationId?: string;
  postStatus: PostStatus;
  handleSendForReview: () => void;
  draftPostId?: string;
};

const WritingPad: React.FC<WritingPadProps> = ({
  currentIterationId,
  title,
  handleOpen,
  defaultContentToDisplay,
  handleEditorContentChange,
  handlePublish,
  postStatus,
  handleSendForReview,
  draftPostId,
}) => {
  const { handleSubmit, control, watch } = useContentForm({
    defaultValues: { content: defaultContentToDisplay },
  });

  const { onContentChange, saveDraftInstantly } = useDraftContentAutosave({
    currentIterationId,
    initialContent: defaultContentToDisplay,
    saveContentToDb: handleEditorContentChange,
    postStatus,
  });

  const onPublishPost = (data: { content: string }) => {
    handlePublish(data.content);
  };

  const content = watch("content");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "calc(100vh - 300px)",
          padding: "10px",
        }}
      >
        <WritingPadEditor
          control={control}
          name="content"
          defaultValue={defaultContentToDisplay}
          onChange={(data) => onContentChange(data, title)}
        />
      </Box>
      <EditorActionsBar
        title={title}
        content={content}
        postStatus={postStatus}
        handleOpen={handleOpen}
        handleSubmit={handleSubmit(onPublishPost)}
        handleSaveDraft={saveDraftInstantly}
        handleSendForReview={handleSendForReview}
        draftPostId={draftPostId}
      />
    </Box>
  );
};

export default WritingPad;
