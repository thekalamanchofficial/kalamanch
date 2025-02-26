"use client";

import React from "react";
import { Box } from "@mui/material";
import isContentEmpty from "~/app/_utils/isContentEmpty";
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
  const { handleSubmit, control, watch, setError } = useContentForm({
    defaultValues: { content: defaultContentToDisplay },
  });

  const content = watch("content");

  const { onContentChange, saveDraftInstantly } = useDraftContentAutosave({
    currentIterationId,
    initialContent: defaultContentToDisplay,
    saveContentToDb: handleEditorContentChange,
    postStatus,
    title,
  });

  const onPublishPost = (data: { content: string }) => {
    handlePublish(data.content);
  };

  const handleOpenPublishPostForm = () => {
    if (isContentEmpty(content)) {
      setError("content", {
        type: "manual",
        message: "Content cannot be empty",
      });
      return false;
    }
    return true;
  };

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
        handleOpenPublishPostForm={handleOpenPublishPostForm}
      />
    </Box>
  );
};

export default WritingPad;
