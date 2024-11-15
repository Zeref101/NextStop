import { BestTimeToVisit, ErrorResponse, FoodResponse } from "@/types";

function isBestTimeResponse(
  data: BestTimeToVisit | ErrorResponse
): data is BestTimeToVisit {
  return (data as BestTimeToVisit).best_time_to_visit !== undefined;
}

export const fetchBestTimeData = async (
  place: string
): Promise<BestTimeToVisit | ErrorResponse> => {
  const url = `http://100.27.153.27/best-time-to-visit/${place}`;

  try {
    const response = await fetch(url);
    const data: BestTimeToVisit | ErrorResponse = await response.json();

    if (data && isBestTimeResponse(data)) {
      return data as BestTimeToVisit;
    } else {
      return { error: "No food data found for this place." };
    }
  } catch (error) {
    return { error: "Failed to fetch food data. Please try again later." };
  }
};
