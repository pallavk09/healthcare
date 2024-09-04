import { TFunction } from "i18next";
export interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

export interface ButtonProps {
  color?: string;
  name?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface SvgIconProps {
  src: string;
  width: string;
  height: string;
}

export interface InputProps {
  name: string;
  placeholder: string;
  t: TFunction;
  type?: string;
  value?: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}
export interface validateProps {
  name: string;
  message: string;
  email: string;
}

// Define the shape of your state
export interface userState {
  data: any[];
  showLoginForm: boolean;
  isOtpSend: boolean;
  isUserVerified: boolean;
  error: string | null;
}

// Define the action types
export type userAction =
  | { type: "SHOW_LOGIN_FORM" }
  | { type: "IS_OPT_SEND" }
  | { type: "IS_USER_VERIFIED"; payload: any[] };
