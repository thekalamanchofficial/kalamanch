"use client";
import React from "react";
import { Box } from "@mui/material";
import WritingPadEditor from "../writingPagEditor/WritingPadEditor";
import { useContentForm } from "./hooks/useContentForm";
import { useDraftContentAutosave } from "./hooks/useDraftContentAutosave";
import EditorActionsBar from "../editorActionsBar/EditorActionsBar";
import { PostStatus } from "~/app/editor/types/types";

type WritingPadProps = {
  handleOpen: () => void;
  handlePublish: (data: string) => void;
  defaultContentToDisplay: string;
  handleEditorContentChange: (data: string,iterationId: string,  showToast?: boolean) => void;
  currentIterationId?: string;
  postStatus: PostStatus;
};

const WritingPad: React.FC<WritingPadProps> = ({
  currentIterationId,
  handleOpen,
  handlePublish,
  defaultContentToDisplay,
  handleEditorContentChange,
  postStatus
}) => {
  const { handleSubmit, control } = useContentForm();

  const { onContentChange, saveDraftInstantly } = useDraftContentAutosave(
    currentIterationId,
    defaultContentToDisplay,
    handleEditorContentChange
  );

  const onPublishPost = (data: { content: string }) => {
    handlePublish(data.content);
  };

  return (
      <Box sx={{ width: "98%", height: "100%", display: "flex", flexDirection: "column" ,overflowY: "scroll", scrollbarWidth: "none" }}>
        <Box sx={{ flex: 1, height: "calc(100vh - 300px)", padding: "10px" }}>
          <WritingPadEditor control={control} name="content" defaultValue={defaultContentToDisplay} onChange={onContentChange} />
        </Box>
        <EditorActionsBar postStatus = {postStatus} handleOpen={handleOpen} handleSubmit={handleSubmit(onPublishPost)}  handleSaveDraft={saveDraftInstantly} />
      </Box>
  );
};

export default WritingPad;
