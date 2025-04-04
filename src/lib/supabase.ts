import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// Utility function for uploading files to storage
export async function uploadFileToStorage(
  bucket: string,
  localPath: string,
  options?: {
    fileName?: string;
    upsert?: boolean;
  },
) {
  try {
    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(localPath);
    if (!fileInfo.exists) {
      throw new Error("File does not exist");
    }

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(localPath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Get file type and generate file name
    const fileType = localPath.match(/\.([^.]+)$/)?.[1]?.toLowerCase() || "jpg";
    const contentType = `image/${fileType}`;
    const fileName = options?.fileName || `${Date.now()}.${fileType}`;

    // Convert to ArrayBuffer
    const arrayBuffer = decode(base64);

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, arrayBuffer, {
        contentType,
        upsert: options?.upsert ?? true,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return { data, publicUrl };
  } catch (error) {
    console.error("Storage upload error:", error);
    throw error;
  }
}

export default supabase;
