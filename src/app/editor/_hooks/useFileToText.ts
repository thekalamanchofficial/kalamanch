import Mammoth from "mammoth";
import { useState } from "react";
import { toast } from "react-toastify";

type UseUploadTextFromFileInput = {
  handleEditorContentChange: (
    content: string,
    iterationId: string,
    showToast?: boolean,
  ) => Promise<void>;
  selectedIterationId: string;
  addIteration: (content?: string) => Promise<void>;
};
type UseUploadTextFromFileReturn = {
  isTextUploaderOpen: boolean;
  setIsTextUploaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFileContentinNewIteration: (file: File) => Promise<void>;
};

type UseUploadTextFromFileType = (
  input: UseUploadTextFromFileInput,
) => UseUploadTextFromFileReturn;

const useUploadTextFromFile: UseUploadTextFromFileType = ({
  handleEditorContentChange,
  selectedIterationId,
  addIteration,
}) => {
  const [isTextUploaderOpen, setIsTextUploaderOpen] = useState(false);

  const getTextFromTxtFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text =
          typeof event.target?.result === "string" ? event.target.result : "";
        resolve(`<pre>${text}</pre>`);
      };
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsText(file);
    });
  };

  const getTextFromDocxFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const result = await Mammoth.convertToHtml({ arrayBuffer });
          resolve(result.value);
        } catch (error) {
          console.error("Error converting file to HTML:", error);
          reject(
            new Error(error instanceof Error ? error.message : String(error)),
          );
        }
      };
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const setFileContentinNewIteration = async (file: File) => {
    if (!file) return;
    let uploadedEditorContent = "";
    if (file.type === "text/plain") {
      uploadedEditorContent = await getTextFromTxtFile(file);
    } else if (file.name.endsWith(".docx")) {
      uploadedEditorContent = await getTextFromDocxFile(file);
    }
    await handleEditorContentChange(uploadedEditorContent, selectedIterationId);
    await addIteration(uploadedEditorContent);
    toast.success("Text uploaded successfully!");
  };

  return {
    isTextUploaderOpen,
    setIsTextUploaderOpen,
    setFileContentinNewIteration,
  };
};

export default useUploadTextFromFile;
