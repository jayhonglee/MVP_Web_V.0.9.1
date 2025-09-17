import { Editor } from "@tiptap/react";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Checks if a mark exists in the editor schema
 *
 * @param markName - The name of the mark to check
 * @param editor - The editor instance
 */
export const isMarkInSchema = (markName: string, editor: Editor | null) =>
  editor?.schema.spec.marks.get(markName) !== undefined;

/**
 * Checks if a node exists in the editor schema
 *
 * @param nodeName - The name of the node to check
 * @param editor - The editor instance
 */
export const isNodeInSchema = (nodeName: string, editor: Editor | null) =>
  editor?.schema.spec.nodes.get(nodeName) !== undefined;

/**
 * Handles image upload with progress tracking and abort capability
 * Converts uploaded images to base64 data URLs for immediate rendering
 */
export const handleImageUpload = async (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (5MB limit)
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
      );
    }

    // Show initial progress
    onProgress?.({ progress: 10 });

    // Convert file to base64 data URL for immediate rendering
    const dataUrl = await convertFileToBase64(file, abortSignal);

    // Show completion progress
    onProgress?.({ progress: 100 });

    return dataUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

/**
 * Converts a File to base64 string
 */
export const convertFileToBase64 = (
  file: File,
  abortSignal?: AbortSignal
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const abortHandler = () => {
      reader.abort();
      reject(new Error("Upload cancelled"));
    };

    if (abortSignal) {
      abortSignal.addEventListener("abort", abortHandler);
    }

    reader.onloadend = () => {
      if (abortSignal) {
        abortSignal.removeEventListener("abort", abortHandler);
      }

      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert File to base64"));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
