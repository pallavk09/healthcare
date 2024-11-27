export interface ContainerProps {
  border?: boolean;
  width?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  color?: string;
  name?: string;
  disabled?: boolean;
  max_width?: string;
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  width?: string;
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

// // Define the shape of your state
// export interface userState {
//   userId: string | undefined;
//   phone: string;
//   isLoggedIn: boolean;
//   role: "student" | "schooladmin" | "superadmin";
//   otpVerified: boolean;
//   siblings: studentData[];
// }

// Define the action types
export type userAction =
  | { type: "UPDATE_USERID"; payload: string | undefined }
  | { type: "UPDATE_USER_LOGGEDIN"; payload: { phone: string; userId: string } }
  | { type: "RESET_USER" };

export type StudentRegistrationFormsType = {
  id: string;
  title: string;
  // formComponent: React.ReactNode;
  data: {};
};
