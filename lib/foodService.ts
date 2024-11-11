import { ErrorResponse, FoodResponse } from "@/types";

function isFoodResponse(
  data: FoodResponse | ErrorResponse
): data is FoodResponse {
  return (data as FoodResponse).food_info !== undefined;
}

export const fetchFoodData = async (
  place: string
): Promise<FoodResponse | ErrorResponse> => {
  const url = `http://100.27.153.27/food/${place}`;

  try {
    const response = await fetch(url);
    const data: FoodResponse | ErrorResponse = await response.json();

    if (data && isFoodResponse(data)) {
      return data as FoodResponse;
    } else {
      return { error: "No food data found for this place." };
    }
  } catch (error) {
    return { error: "Failed to fetch food data. Please try again later." };
  }
};
