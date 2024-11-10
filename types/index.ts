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
