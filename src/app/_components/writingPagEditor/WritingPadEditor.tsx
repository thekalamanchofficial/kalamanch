"use client";

import React from "react";
import { Controller, type Control } from "react-hook-form";
import { toolbarConfig } from "../writingPad/config/configs";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

type EditorProps = {
  control: Control<{ content: string }>;
  name: "content";
  defaultValue: string;
  onChange: (data: string) => void;
};

const WritingPadEditor: React.FC<EditorProps> = ({ control, name, defaultValue, onChange }) => (
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
        ref={(instance) => {
          if (instance?.getEditor) {
            const editor = instance.getEditor();
            const length = editor.getLength();
            editor.setSelection(length, length);
          }
          field.ref(instance);
        }}
      />
    )}
  />
);

export default WritingPadEditor;
