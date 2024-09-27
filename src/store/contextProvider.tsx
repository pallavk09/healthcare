import { useReducer, ReactNode } from "react";
import ApiContext from "./context";
import { userAction, userState, studentData } from "../common/types";

// Initial state
const initialState: userState = {
  userId: "",
  phone: "",
  isLoggedIn: false,
  role: "student",
  otpVerified: false,
  siblings: [],
};

const addUpdateSiblings = (
  siblings: studentData[],
  studentData: studentData[]
): studentData[] => {
  return [...siblings, ...studentData];
  // const studentIndex = siblings.findIndex(
  //   (student) => student.id === studentData.id
  // );

  // //New Student
  // if (studentIndex === -1) {
  //   return [...studentMasterData, studentData];
  // } else {
  //   //Update existing student
  //   return studentMasterData.map((student, index) =>
  //     index === studentIndex ? studentData : student
  //   );
  // }
};

// Reducer function
const apiReducer = (state: userState, action: userAction): userState => {
  switch (action.type) {
    case "UPDATE_USERID":
      return {
        ...state,
        userId: action.payload,
      };
    case "UPDATE_USER_LOGGEDIN":
      return {
        ...state,
        isLoggedIn: true,
        otpVerified: true,
        phone: action.payload.phone,
        userId: action.payload.userId,
      };
    case "RESET_USER":
      return {
        ...state,
        userId: "",
        phone: "",
        isLoggedIn: false,
        role: "student",
        otpVerified: false,
        siblings: [],
      };
    case "ADD_NEW_STUDENT":
      return {
        ...state,
        siblings: addUpdateSiblings(state.siblings, action.payload!),
      };
    case "LOAD_EXISTING_STUDENTS":
      return {
        ...state,
        siblings: action.payload!,
      };
    // case "SHOW_LOGIN_FORM":
    //   return {
    //     ...state,
    //     showLoginForm: true,
    //     isOtpSend: false,
    //     isUserVerified: false,
    //     error: null,
    //   };
    // case "IS_OPT_SEND":
    //   return { ...state, isOtpSend: true, isUserVerified: false, error: null };
    // case "IS_USER_VERIFIED":
    //   return { ...state, isUserVerified: true, error: null };
    // case "SAVE_STUDENT_DATA":
    //   return {
    //     ...state,
    //     data: action.payload,
    //     studentMasterData: addUpdateMasterStudentData(
    //       state.studentMasterData,
    //       action.payload
    //     ),
    //   };
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
