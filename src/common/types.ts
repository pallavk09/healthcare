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
  type?: "submit" | "button" | "reset";
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
  userId: string;
  studentObj: {
    id: string;
    personalDetails: {
      studentfullname: string;
      addressline1: string;
      addressline2: string;
      addresscity: string;
      addressstate: string;
      addresspincode: string;
      studentdob: string;
      studentgender: string;
    };
    guardianDetails: {
      guardianname: string;
      studentrelation: string;
      occupation: string;
      guardianphoneno: string;
      guardianemailid: string;
    };
    academicsDetails: {
      class: string;
      section: string;
      rollnumber: string;
      housename: string;
      busnumber: string;
    };
    newAdmission: boolean;
    fees: string[];
  };
}

// Define the shape of your state
export interface userState {
  userId: string;
  phone: string;
  role: "student" | "schooladmin" | "superadmin";
  otpVerified: boolean;
  siblings: studentData[];
}

// Define the action types
export type userAction =
  | { type: "UPDATE_USERID"; payload: userState }
  | { type: "ADD_NEW_STUDENT"; payload: studentData | null }
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
  // formComponent: React.ReactNode;
  data: {};
};
