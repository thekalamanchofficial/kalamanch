"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function WritingPad() {
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <ReactQuill />
      </form>
    </div>
  );
}
