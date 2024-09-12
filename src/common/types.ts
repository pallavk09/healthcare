import { TFunction } from "i18next";
export interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

export interface ButtonProps {
  color?: string;
  name?: string;
  disabled?: boolean;
  max_width?: string;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
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

export interface studentData {
  id: string;
  studentfullname: string;
  addressline1: string;
  addressline2: string;
  addresscity: string;
  addressstate: string;
  addresspincode: string;
  studentdob: string;
  studentgender: string;
  guardianname: string;
  studentrelation: string;
  occupation: string;
  guardianphoneno: string;
  guardianemailid: string;
  class: string;
  section: string;
  rollnumber: string;
  housename: string;
  busnumber: string;
}

// Define the shape of your state
export interface userState {
  studentMasterData: studentData[];
  data: studentData | null;
  showLoginForm: boolean;
  isOtpSend: boolean;
  isUserVerified: boolean;
  error: string | null;
}

// Define the action types
export type userAction =
  | { type: "SHOW_LOGIN_FORM" }
  | { type: "IS_OPT_SEND" }
  | { type: "IS_USER_VERIFIED"; payload: any[] }
  | { type: "SAVE_STUDENT_DATA"; payload: studentData };

export type PersonalInfoType = {
  studentfullname: string | "";
  addressline1: string | "";
  addressline2: string | "";
  addresscity: string | "";
  addressstate: string | "";
  addresspincode: string | "";
  studentdob: string | "";
  studentgender: string | "";
};
export type StudentRegistrationFormsType = {
  id: string;
  title: string;
  formComponent: React.ReactNode;
  data: {};
};
