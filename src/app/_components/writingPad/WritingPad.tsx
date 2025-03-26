"use client";

import React from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { isContentEmpty } from "~/app/_utils/utils";
import { type PostStatus } from "~/app/editor/types/types";
import EditorActionsBar from "../editorActionsBar/EditorActionsBar";
import WritingPadEditor from "../writingPagEditor/WritingPadEditor";
import { useContentForm } from "./hooks/useContentForm";
import { useDraftContentAutosave } from "./hooks/useDraftContentAutosave";

type WritingPadProps = {
  handleOpen: () => void;
  defaultTitle: string;
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
  defaultTitle,
  handleOpen,
  defaultContentToDisplay,
  handleEditorContentChange,
  handlePublish,
  postStatus,
  handleSendForReview,
  draftPostId,
}) => {
  const { handleSubmit, control, watch, setError } = useContentForm({
    defaultValues: {
      content: defaultContentToDisplay,
      title: defaultTitle,
    },
  });

  const content = watch("content");
  const title = watch("title");

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
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          padding: "8px 10px 0 10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "primary.main",
            marginInline: "8px",
            display: { xs: "none", md: "block" },
          }}
        >
          Editor
        </Typography>

        <TextField
          variant="standard"
          fullWidth
          placeholder="Enter title of your writing"
          sx={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: "6px",
            "& .MuiInputBase-input": {
              fontWeight: "400",
              color: "text.primary",
              padding: "5px 0",
              border: "none",
              textAlign: "center",
            },
          }}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          {...control.register("title")}
        />
      </Box>
      <Divider />
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
        handleSaveDraft={() => saveDraftInstantly(true, title)}
        handleSendForReview={handleSendForReview}
        draftPostId={draftPostId}
        handleOpenPublishPostForm={handleOpenPublishPostForm}
      />
    </Box>
  );
};

export default WritingPad;
