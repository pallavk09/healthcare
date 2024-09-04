import { createContext, Dispatch } from "react";
import { userAction, userState } from "../common/types";

// Create Context
interface ApiContextProps {
  state: userState;
  dispatch: Dispatch<userAction>;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export default ApiContext;
