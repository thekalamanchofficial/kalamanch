"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarConfig } from "./config/configs";
import { useContentForm } from "./hooks/useContentForm";
import { Controller } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ChecklistIcon from "@mui/icons-material/Checklist";
export function WritingPad() {
  const { handleSubmit, reset, control } = useContentForm();

  const onSubmit = (data: { content: string }) => {
    console.log(data);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
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
            // height: "auto",
            padding: "10px",
          }}
        >
          <Controller
            control={control}
            name="content"
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
      </form>
    </Box>
  );
}
