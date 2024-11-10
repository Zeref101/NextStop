import { ErrorResponse, PlacesResponse } from "@/types";

function isPlaceResponse(
  data: PlacesResponse | ErrorResponse
): data is PlacesResponse {
  return (data as PlacesResponse).places_info !== undefined;
}

export const fetchPlaceData = async (
  place: string
): Promise<PlacesResponse | ErrorResponse> => {
  const url = `http://54.210.58.161/places/${place}`;

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
