"use client";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "react-quill/dist/quill.snow.css";
import { toolbarConfig } from "./config/configs";
import { useContentForm } from "./hooks/useContentForm";
import { Controller } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { type DraftPost } from "~/app/editor/types/types";
import dynamic from "next/dynamic";
import { trpc } from "~/server/client";
import { PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type WritingPadProps = {
  handleOpen: () => void;
  editorPostData: PostDetails;
};
const WritingPad: React.FC<WritingPadProps> = ({
  handleOpen,
  editorPostData,
}) => {
  const { handleSubmit, reset, control } = useContentForm();

  const onSubmit = (data: { content: string }) => {

    const { mutate: createPost } = trpc.post.addPost.useMutation();
    const onSubmit = (data: { content: string }) => {
      createPost({ 
        content: data.content, 
        postDetails: {
          title: editorPostData.title,
          targetAudience: editorPostData.targetAudience,
          postType: editorPostData.postType,
          actors: editorPostData.actors,
          tags: editorPostData.tags,
          thumbnailDetails: {
            url: editorPostData.thumbnailDetails.url,
            content: editorPostData.thumbnailDetails.content ?? "",
            title: editorPostData.thumbnailDetails.title ?? "",
          }
        },
      });
      
      reset();
    }
    
  };

  return (
    <Box
      sx={{
        width: "98%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "calc(100vh - 300px)",
          maxHeight: "calc(100vh - 200px)",
          padding: "10px",
        }}
      >
        <Controller
          control={control}
          name="content"
          defaultValue={editorPostData.content}
          render={({ field }) => (
            <ReactQuill
              {...field}
              modules={{
                toolbar: toolbarConfig,
              }}
              placeholder="Write something..."
              theme="snow"
              style={{
                border: "none",
                height: "100%",
              }}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "10px",
          alignItems: "center",
          height: "200px",
          padding: "10px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "secondary.main",
            minHeight: "auto",
            color: "primary.main",
            py: "8px",
            px: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={handleOpen}
        >
          <EditNoteIcon />
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Edit details
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "secondary.main",
            minHeight: "auto",
            color: "primary.main",
            py: "8px",
            px: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ChecklistIcon />
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Send for review
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "secondary.main",
            minHeight: "auto",
            color: "primary.main",
            py: "8px",
            px: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FolderIcon />
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Save as draft
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "primary.main",
            minHeight: "auto",
            color: "white",
            py: "8px",
            px: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onClick={handleSubmit(onSubmit)}
        >
          <FeedOutlinedIcon />
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Publish
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default WritingPad;
