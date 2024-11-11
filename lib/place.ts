import {
  ErrorResponse,
  PlacesProps,
  PlacesResponse,
  PlacesResponseHome,
} from "@/types";

function isPlaceResponse(
  data: PlacesResponse | ErrorResponse
): data is PlacesResponse {
  return (data as PlacesResponse).places_info !== undefined;
}

export const fetchPlaceData = async (
  place: string
): Promise<PlacesResponse | ErrorResponse> => {
  const url = `http://100.27.153.27/places/${place}`;

  try {
    const response = await fetch(url);
    const data: PlacesResponse | ErrorResponse = await response.json();
    // console.log(data);
    if (data && isPlaceResponse(data)) {
      return data as PlacesResponse;
    } else {
      return { error: "No place data found for this place." };
    }
  } catch (error) {
    return { error: "Failed to fetch place data. Please try again later." };
  }
};

export const fetchPlacesPropsData = async (
  place: string
): Promise<PlacesProps | { error: string }> => {
  const url = `http://100.27.153.27/places-by-month/november`;

  try {
    const response = await fetch(url);
    const data: PlacesResponseHome | { error: string } = await response.json();

    if (isPlacesResponseHome(data)) {
      return { data: data as PlacesResponseHome };
    } else {
      return { error: "No places data found for this place." };
    }
  } catch (error) {
    return { error: "Failed to fetch places data. Please try again later." };
  }
};

// Type guard to check if data is of type PlacesResponseHome
const isPlacesResponseHome = (data: any): data is PlacesResponseHome => {
  return (
    data &&
    typeof data.general_description === "string" &&
    Array.isArray(data.places_data) &&
    data.places_data.every(
      (place: any) =>
        typeof place.title === "string" &&
        typeof place.image_url === "string" &&
        typeof place.description === "string"
    )
  );
};
