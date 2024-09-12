import { useReducer, ReactNode } from "react";
import ApiContext from "./context";
import { userAction, userState, studentData } from "../common/types";

// Initial state
const initialState: userState = {
  studentMasterData: [],
  data: null,
  showLoginForm: false,
  isOtpSend: false,
  isUserVerified: false,
  error: null,
};

const addUpdateMasterStudentData = (
  studentMasterData: studentData[],
  studentData: studentData
): studentData[] => {
  const studentIndex = studentMasterData.findIndex(
    (student) => student.id === studentData.id
  );

  //New Student
  if (studentIndex === -1) {
    return [...studentMasterData, studentData];
  } else {
    //Update existing student
    return studentMasterData.map((student, index) =>
      index === studentIndex ? studentData : student
    );
  }
};

// Reducer function
const apiReducer = (state: userState, action: userAction): userState => {
  switch (action.type) {
    case "SHOW_LOGIN_FORM":
      return {
        ...state,
        showLoginForm: true,
        isOtpSend: false,
        isUserVerified: false,
        error: null,
      };
    case "IS_OPT_SEND":
      return { ...state, isOtpSend: true, isUserVerified: false, error: null };
    case "IS_USER_VERIFIED":
      return { ...state, isUserVerified: true, error: null };
    case "SAVE_STUDENT_DATA":
      return {
        ...state,
        data: action.payload,
        studentMasterData: addUpdateMasterStudentData(
          state.studentMasterData,
          action.payload
        ),
      };
    default:
      return state;
  }
};

// Provider component
interface ApiProviderProps {
  children: ReactNode;
}

const ApiProvider = ({ children }: ApiProviderProps) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

//=========================================================================

// import {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   ReactNode,
//   useState,
// } from "react";

// export type User = {
//   phoneNumber: string;
//   email: string;
// };

// export interface UserContextInterface {
//   user: User;
//   setUser: Dispatch<SetStateAction<User>>;
// }

// const initialUserState = {
//   user: {
//     phoneNumber: "",
//     email: "",
//   },
//   setUser: (user: User) => {},
// } as UserContextInterface;

// export const userContext = createContext(initialUserState);

// type UserProviderProps = {
//   children: ReactNode;
// };

// export default function UserProvider({ children }: UserProviderProps) {
//   const [user, setUser] = useState<User>(initialUserState.user);

//   return (
//     <userContext.Provider value={{ user, setUser }}>
//       {children}
//     </userContext.Provider>
//   );
// }
