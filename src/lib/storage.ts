import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import supabase from "./supabase";

export interface UploadOptions {
  fileName?: string;
  upsert?: boolean;
}

export class FileHolder {
  private localUri: string;
  private contentType: string;
  public uploadedUrl?: string;

  constructor(localUri: string, contentType?: string) {
    this.localUri = localUri;
    this.contentType = this.determineContentType(localUri, contentType);
  }

  private determineContentType(uri: string, providedType?: string): string {
    if (providedType) return providedType;
    const fileType = uri.match(/\.([^.]+)$/)?.[1]?.toLowerCase() || "jpg";
    return `image/${fileType}`;
  }

  static fromUri(uri: string, contentType?: string): FileHolder {
    return new FileHolder(uri, contentType);
  }

  get uri(): string {
    return this.localUri;
  }

  get type(): string {
    return this.contentType;
  }

  private async toArrayBuffer(): Promise<ArrayBuffer> {
    const fileInfo = await FileSystem.getInfoAsync(this.localUri);
    if (!fileInfo.exists) {
      throw new Error("File does not exist");
    }

    const base64 = await FileSystem.readAsStringAsync(this.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return decode(base64);
  }

  async upload(
    bucket: string,
    options: UploadOptions = {},
  ): Promise<{ publicUrl: string }> {
    try {
      const fileType = this.contentType.split("/")[1] || "jpg";
      const fileName = options.fileName || `${Date.now()}.${fileType}`;
      const arrayBuffer = await this.toArrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, arrayBuffer, {
          contentType: this.contentType,
          upsert: options.upsert ?? true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error("Failed to upload file");
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName);

      this.uploadedUrl = publicUrl;
      return { publicUrl };
    } catch (error) {
      console.error("Storage upload error:", error);
      throw error;
    }
  }
}

// Helper function to create a FileHolder instance
export function createFileHolder(
  uri: string,
  contentType?: string,
): FileHolder {
  return FileHolder.fromUri(uri, contentType);
}
