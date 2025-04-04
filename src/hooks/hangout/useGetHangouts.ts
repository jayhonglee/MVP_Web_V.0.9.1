import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { Hangout } from "./types";
import { HangoutCategory } from "@/constants/hangoutCategories";
import { transformHangoutData, getHangoutSelectQuery } from "./useGetHangout";

const PAGE_SIZE = 10;

export interface HangoutFilters {
  type?: HangoutCategory["id"];
  location?: {
    base: string; // PostGIS point format: 'POINT(longitude latitude)'
    maxRadiusKm: number;
  };
  hostId?: string;
  excludeIds?: string[];
  dateRange?: {
    min?: Date; // Minimum date/time (inclusive)
    max?: Date; // Maximum date/time (inclusive)
  };
}

interface PaginatedHangoutsResponse {
  data: Hangout[];
  nextCursor: number | null;
}

interface PaginatedHangoutsError {
  message: string;
  code?: string;
}

export interface GetHangoutsOptions {
  filters?: HangoutFilters;
  queryOptions?: Partial<
    UseInfiniteQueryOptions<
      PaginatedHangoutsResponse,
      Error,
      PaginatedHangoutsResponse
    >
  >;
}

async function fetchHangouts({
  pageParam = 0,
  filters,
}: {
  pageParam?: number;
  filters?: HangoutFilters;
}): Promise<PaginatedHangoutsResponse> {
  // Base query
  let query = supabase
    .from("hangouts")
    .select(getHangoutSelectQuery())
    .order("created_at", { ascending: false })
    .range(pageParam, pageParam + PAGE_SIZE - 1);

  // Apply filters
  if (filters) {
    // Filter by type
    if (filters.type) {
      query = query.eq("type", filters.type);
    }

    // Filter by host
    if (filters.hostId) {
      query = query.eq("host_id", filters.hostId);
    }

    // Exclude specific hangouts
    if (filters.excludeIds && filters.excludeIds.length > 0) {
      query = query.not("id", "in", `(${filters.excludeIds.join(",")})`);
    }

    // Filter by location using PostGIS ST_DWithin
    if (filters.location) {
      query = query.filter(
        "addresses.coordinates",
        "st_dwithin",
        `${filters.location.base}, ${filters.location.maxRadiusKm * 1000}`,
      );
    }

    // Filter by date range
    if (filters.dateRange) {
      if (filters.dateRange.min) {
        query = query.gte(
          "scheduled_when",
          filters.dateRange.min.toISOString(),
        );
      }

      if (filters.dateRange.max) {
        query = query.lte(
          "scheduled_when",
          filters.dateRange.max.toISOString(),
        );
      }
    }
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Error fetching hangouts: ${error.message}`);
  }

  // Transform the data to match our Hangout type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hangouts = data.map((item: any) => transformHangoutData(item));

  return {
    data: hangouts,
    nextCursor: data.length === PAGE_SIZE ? pageParam + PAGE_SIZE : null,
  };
}

export default function useGetHangouts({
  filters,
  queryOptions,
}: GetHangoutsOptions = {}): UseInfiniteQueryResult<
  PaginatedHangoutsResponse,
  PaginatedHangoutsError
> {
  const queryKey = ["hangouts", filters];

  return useInfiniteQuery({
    queryKey,
    queryFn: (context) => fetchHangouts({ 
      pageParam: context.pageParam as number, 
      filters 
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PaginatedHangoutsResponse) => lastPage.nextCursor,
    ...queryOptions,
  });
}

// Helper hook to get hangouts by a specific host
export function useGetUserHangouts(
  userId: string,
  options: GetHangoutsOptions = {},
) {
  return useGetHangouts({
    filters: { hostId: userId, ...options.filters },
    queryOptions: {
      ...options.queryOptions,
      queryKey: ["hangouts", "user", userId, options.filters],
    },
  });
}

// Helper hook to get upcoming hangouts
export function useGetUpcomingHangouts(options: GetHangoutsOptions = {}) {
  return useGetHangouts({
    filters: {
      dateRange: {
        min: new Date(), // Current date and time as minimum
      },
      ...options.filters,
    },
    queryOptions: {
      ...options.queryOptions,
      queryKey: ["hangouts", "upcoming", options.filters],
    },
  });
}
