"use client";
import React from "react";
import { type Control, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { toolbarConfig } from "../writingPad/config/configs";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type EditorProps = {
  control: Control<{ content: string }>;
  name: "content";
  defaultValue: string;
  onChange: (data: string) => void;
};

const WritingPadEditor: React.FC<EditorProps> = ({
  control,
  name,
  defaultValue,
  onChange,
}) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => (
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
      />
    )}
  />
);

export default WritingPadEditor;
