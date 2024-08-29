"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarConfig } from "./config/configs";
import { useForm } from "react-hook-form";

const schema = yup.object({
  content: yup.string().min(1).required("Content is required"),
});

export function WritingPad() {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: string) => {
    console.log(data);
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <ReactQuill
          modules={{
            toolbar: toolbarConfig,
          }}
          placeholder="Write something..."
          theme="snow"
          className="min-h-20 w-full"
          style={{
            minHeight: "200px",
          }}
          {...register("content")}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => reset()}>
          Draft
        </button>
      </form>
    </div>
  );
}
