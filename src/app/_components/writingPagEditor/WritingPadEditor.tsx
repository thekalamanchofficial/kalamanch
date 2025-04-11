"use client";

import React, { useEffect, useRef } from "react";
import { Controller, type Control } from "react-hook-form";
import { toolbarConfig } from "../writingPad/config/configs";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import ReactQuill from "react-quill";
import { Typography } from "@mui/material";

type WritingPadFormValues = {
  content: string;
  title: string;
};

type EditorProps = {
  control: Control<WritingPadFormValues>;
  name: "content";
  defaultValue: string;
  onChange: (data: string) => void;
};

const WritingPadEditor: React.FC<EditorProps> = ({ control, name, defaultValue, onChange }) => {
  const editorRef = useRef<ReactQuill | null>(null);
  const hasFocused = useRef(false);

  useEffect(() => {
    if (editorRef.current && !hasFocused.current) {
      const editor = editorRef.current.getEditor();
      const length = editor.getLength();
      editor.setSelection(length, length);
      hasFocused.current = true;
    }
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <ReactQuill
            {...field}
            modules={{ toolbar: toolbarConfig }}
            placeholder="Write something..."
            theme="snow"
            style={{ border: "none", height: "100%" }}
            onChange={(value) => {
              field.onChange(value);
              onChange(value);
            }}
            value={field.value}
            ref={(instance) => {
              editorRef.current = instance;
              field.ref(instance);
            }}
          />
          {error && (
            <Typography
              color="error"
              sx={{
                fontSize: "14px",
                marginTop: {
                  xs: "100px",
                  sm: "70px",
                },
                width: {
                  xs: "100%",
                  sm: "max-content",
                },
                textAlign: "center",
              }}
            >
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default WritingPadEditor;
