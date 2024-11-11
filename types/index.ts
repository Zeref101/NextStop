import { Dispatch, SetStateAction } from "react";

export interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}
// FormFieldProps.ts
export interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherstyles?: string;
  keyboardType?: string;
}

export interface CreateUserProps {
  username: string;
  email: string;
  password: string;
}
export interface UserProps {
  accountId?: string;
  avatar?: string;
  email?: string;
  password?: string;
  username?: string;
}

export interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: UserProps | null;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<UserProps | null>>;
}

export enum ViewState {
  Places = "Places",
  Food = "Food",
  BestTime = "BestTime",
}

// TypeScript interface for the food data response
export interface FoodItem {
  title: string;
  img_url: string;
  description: string;
  details_link: string;
}

export interface FoodInfo {
  general_description: string;
  food_items: FoodItem[];
}

export interface FoodResponse {
  food_info: FoodInfo;
}

export interface ErrorResponse {
  error: string;
}
export interface MonthlyWeather {
  month: string;
  high: string;
  low: string;
}

// Interface for Best Time to Visit Data
export interface BestTimeToVisit {
  best_time_to_visit: string;
  monthly_weather: MonthlyWeather[];
}
export interface PlaceInfo {
  title: string;
  img_url: string;
  description: string;
}

export interface PlacesResponse {
  places_info: PlaceInfo[];
}
export interface PlaceData {
  title: string;
  image_url: string;
  description: string;
}

export interface PlacesResponseHome {
  general_description: string;
  places_data: PlaceData[];
}

export interface PlacesProps {
  data: PlacesResponseHome;
}
