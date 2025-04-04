export type Address = {
  place_name?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
  coordinates?: string; // PostGIS geography string
};