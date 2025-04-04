import { useState } from "react";
import { Address } from "@/hooks/map/types";

const MAPBOX_API_KEY = process.env.EXPO_PUBLIC_MAPBOX_API_KEY;
const MAPBOX_ENDPOINT = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export type PlaceType = "place" | "address" | "poi";

interface MapAPIOptions {
  types: PlaceType[];
  country: string[];
  limit?: number;
}

export function useMapAPI(options: MapAPIOptions) {
  const [searchResults, setSearchResults] = useState<Address[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchLocations = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setError(null);

    try {
      const searchParams = new URLSearchParams({
        access_token: MAPBOX_API_KEY!,
        limit: options.limit?.toString() || "5",
      });

      if (options.types) {
        searchParams.append("types", options.types.join(","));
      }
      if (options.country) {
        const validCountries = options.country
          .map((c) => c.toLowerCase())
          .filter((c) => c.length === 2);
        if (validCountries.length > 0) {
          searchParams.append("country", validCountries.join(","));
        } else {
          throw new Error(`Invalid countries: ${options.country}`);
        }
      }

      const response = await fetch(
        `${MAPBOX_ENDPOINT}/${encodeURIComponent(query)}.json?${searchParams.toString()}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch locations");
      }

      const locations: Address[] = data.features.map((feature: any) => {
        const location: Address = {
          place_name: feature.place_name,
          latitude: feature.center[1],
          longitude: feature.center[0],
        };

        // Extract detailed address components if available
        if (feature.address) {
          location.address = feature.address;
        }

        // Extract context information
        if (feature.context) {
          feature.context.forEach((ctx: any) => {
            if (ctx.id.startsWith("postcode")) {
              location.postal_code = ctx.text;
            } else if (ctx.id.startsWith("place")) {
              location.city = ctx.text;
            } else if (ctx.id.startsWith("region")) {
              location.state = ctx.text;
            } else if (ctx.id.startsWith("country")) {
              location.country = ctx.short_code?.toUpperCase() || ctx.text;
            }
          });
        }

        return location;
      });

      setSearchResults(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch locations",
      );
      setSearchResults([]);
    }
  };

  const reverseGeocode = async (
    latitude: number,
    longitude: number,
  ): Promise<Address | null> => {
    try {
      const searchParams = new URLSearchParams({
        access_token: MAPBOX_API_KEY!,
        types: options.types?.join(","),
        limit: "1",
      });

      const response = await fetch(
        `${MAPBOX_ENDPOINT}/${longitude},${latitude}.json?${searchParams.toString()}`,
      );
      const data = await response.json();

      if (!response.ok || !data.features.length) {
        throw new Error(data.message || "Failed to fetch location");
      }

      const feature = data.features[0];
      const location: Address = {
        place_name: feature.place_name,
        latitude,
        longitude,
      };

      // Extract detailed address components if available
      if (feature.address) {
        location.address = feature.address;
      }

      // Extract context information
      if (feature.context) {
        feature.context.forEach((ctx: any) => {
          if (ctx.id.startsWith("postcode")) {
            location.postal_code = ctx.text;
          } else if (ctx.id.startsWith("place")) {
            location.city = ctx.text;
          } else if (ctx.id.startsWith("region")) {
            location.state = ctx.text;
          } else if (ctx.id.startsWith("country")) {
            location.country = ctx.short_code?.toUpperCase() || ctx.text;
          }
        });
      }

      return location;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return null;
    }
  };

  return {
    searchResults,
    error,
    searchLocations,
    clearSearchResults: () => setSearchResults([]),
    reverseGeocode,
  };
}
