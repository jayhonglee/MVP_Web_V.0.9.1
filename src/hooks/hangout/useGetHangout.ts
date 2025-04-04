import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { Hangout } from "./types";
import { transformHangoutData, getHangoutSelectQuery } from "./_helper";

export type HangoutError = {
  message: string;
  code?: string;
};

export const fetchHangout = async (
  hangoutId: string,
): Promise<Hangout | null> => {
  const { data, error } = await supabase
    .from("hangouts")
    .select(getHangoutSelectQuery())
    .eq("id", hangoutId)
    .single();

  if (!data || error) {
    throw new Error("Failed to fetch hangout");
  }

  // Transform the data to match our Hangout type
  const hangout: Hangout = transformHangoutData(data);

  return hangout;
};

export default function useGetHangout(
  hangoutId: string,
  queryOptions?: Partial<UseQueryOptions<Hangout | null, HangoutError>>,
): UseQueryResult<Hangout | null, HangoutError> {
  return useQuery<Hangout | null, HangoutError>({
    queryKey: ["hangout", hangoutId],
    queryFn: () => fetchHangout(hangoutId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    ...queryOptions,
  });
}
