"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarConfig } from "./config/configs";
import { useContentForm } from "./hooks/useContentForm";
import { Controller } from "react-hook-form";

export function WritingPad() {
  const { handleSubmit, reset, control } = useContentForm();

  const onSubmit = (data: { content: string }) => {
    console.log(data);
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
              className="min-h-20 w-full"
              style={{
                minHeight: "200px",
              }}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => reset()}>
          Draft
        </button>
      </form>
    </div>
  );
}
