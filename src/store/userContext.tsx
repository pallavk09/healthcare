import { createContext, Dispatch } from "react";
import { userAction } from "../common/types";

export interface userDataType {
  userId: string;
  phone: string;
}

interface userSessionDataContext {
  user_state: userDataType;
  user_dispatch: Dispatch<userAction>;
}
const userDataContext = createContext<userSessionDataContext | undefined>(
  undefined
);

export default userDataContext;
