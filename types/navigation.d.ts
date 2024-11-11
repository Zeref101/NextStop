// types/navigation.d.ts
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  "Places_to_visit_in_upcoming_months/[month]": { month: string };
};

export type PlacesInUpcomingMonthsRouteProp = RouteProp<
  RootStackParamList,
  "Places_to_visit_in_upcoming_months/[month]"
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
