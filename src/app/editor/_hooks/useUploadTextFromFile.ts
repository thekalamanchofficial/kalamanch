import Mammoth from "mammoth";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "~/app/_utils/handleError";

type UseUploadTextFromFileInput = {
  addIteration: (content?: string) => Promise<void>;
};
type UseUploadTextFromFileReturn = {
  isTextUploaderOpen: boolean;
  setIsTextUploaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFileContentinNewIteration: (file: File) => Promise<void>;
};

type UseUploadTextFromFileType = (
  input: UseUploadTextFromFileInput,
) => UseUploadTextFromFileReturn;

const useUploadTextFromFile: UseUploadTextFromFileType = ({ addIteration }) => {
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

  const getTextFromImageFile = async (file: File): Promise<string> => {
    try {
      const base64String = await convertFileToBase64(file);
      if (!base64String) throw new Error("Failed to convert image");

      const response = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64String }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data: { text?: string } = await response.json() as { text?: string };

      if (!data.text) throw new Error("No text extracted from image");

      return data.text;
    } catch (error) {
      handleError(error);
      console.error("Error extracting text:", error);
      throw error;
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result?.toString();
        const base64String = result?.split(",")[1];
        if (base64String) {
          resolve(base64String);
        }
        reject(new Error("Invalid Base64 conversion"));
      };

      reader.onerror = () => reject(new Error("Error reading file"));

      reader.readAsDataURL(file);
    });
  };

  const uploadFileContentinNewIteration = async (file: File) => {
    if (!file) return;
    let uploadedEditorContent = "";

    if (file.type === "text/plain") {
      uploadedEditorContent = await getTextFromTxtFile(file);
    } else if (file.name.endsWith(".docx")) {
      uploadedEditorContent = await getTextFromDocxFile(file);
    } else if (file.name.endsWith(".jpeg") || file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
      uploadedEditorContent = await getTextFromImageFile(file);
    }
    await addIteration(uploadedEditorContent);
    toast.success("Text uploaded successfully!");
  };

  return {
    isTextUploaderOpen,
    setIsTextUploaderOpen,
    uploadFileContentinNewIteration,
  };
};

export default useUploadTextFromFile;
