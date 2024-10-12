import { useReducer, ReactNode } from "react";
import ApiContext from "./context";
import { userAction, userState, studentData } from "../common/types";
import { newAddmissionApplicationType } from "./newadmissionContext";
import newadmissionContext from "./newadmissionContext";
import userDataContext, { userDataType } from "./userContext";
import {
  cartContextType_ADMISSION_FORM,
  cartContextType_FEE,
} from "./cartContext";

import { feePaymentContext, newAdmissionPaymentContext } from "./cartContext";

//Initial user data context
const initialUserIdPhone: userDataType = {
  userId: "",
  phone: "",
};

// Initial state Student
const initialState: userState = {
  userId: "",
  phone: "",
  isLoggedIn: false,
  role: "student",
  otpVerified: false,
  siblings: [],
};

//Initial state New Admission
export const initialState_NewAdmission: newAddmissionApplicationType[] = [
  {
    userId: "",
    phone: "",
    emailId: "",
    applicationId: "",
    status: "",
    role: "NEWADMISSION",
    submissionDate: "",
    createdAt: "",
    statusUpdatedOn: "",
    applicationData: "",
    submissionStatus: "",
    paymentStatus: "",
    transactionId: "",
  },
];

//Initial state FEE Payment

const initialState_FeesPayment: cartContextType_FEE[] = [];

//Initial state New Admission Payment
const initialState_NewAdmission_payment: cartContextType_ADMISSION_FORM[] = [];

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

const addNewApplications = (
  application: newAddmissionApplicationType,
  currentApplicationData: newAddmissionApplicationType[]
): newAddmissionApplicationType[] => {
  console.log("currentApplicationData", currentApplicationData);
  console.log("application", application);
  return [...currentApplicationData, application];
  // if (currentApplicationData.length === 1) {
  //   return currentApplicationData.map((app, index) => application);
  // } else {
  //   const appIndex = currentApplicationData.findIndex(
  //     (app) => app.userId === application.userId
  //   );

  //   //New application
  //   if (appIndex === -1) {
  //     console.log("New Application");
  //     currentApplicationData.push(application);
  //     return [...currentApplicationData, application];
  //   } else {
  //     console.log("Existing Application");
  //     //Update existing application
  //     return currentApplicationData.map((app, index) =>
  //       index === appIndex ? application : app
  //     );
  //   }
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

    default:
      return state;
  }
};

const updateUserState = (
  state: userDataType,
  payload: { userId: string; phone: string }
) => {
  console.log("Inside updateUserState");
  console.log(state);
  console.log(payload);
  return {
    ...state,
    userId: payload.userId,
    phone: payload.phone,
  };
};

const newAdmissionReducer = (
  state: newAddmissionApplicationType[],
  action: userAction
): newAddmissionApplicationType[] => {
  switch (action.type) {
    case "ADD_NEW_APPLICATION":
      return addNewApplications(action.payload, state);

    default:
      return state;
  }
};

const userSessionReducer = (
  state: userDataType,
  action: userAction
): userDataType => {
  switch (action.type) {
    case "ADD_USERID_PHONE":
      console.log("State and Actio as");
      console.log(state, action);
      return updateUserState(state, action.payload);

    default:
      return state;
  }
};

const feesPaymentReducer = (
  state: cartContextType_FEE[],
  action: userAction
): cartContextType_FEE[] => {
  switch (action.type) {
    case "ADD_TO_CART_FEES_PAYMENT":
      return state.length > 0 ? [...state, action.payload] : [action.payload];
    case "GET_COUNT_FEES_PAYMENT":
      return state;
    default:
      return state;
  }
};

const newAdmissionFormPaymentReducer = (
  state: cartContextType_ADMISSION_FORM[],
  action: userAction
): cartContextType_ADMISSION_FORM[] => {
  switch (action.type) {
    case "ADD_TO_CART_NEW_ADMISSION_FORM_PAYMENT":
      return state.length > 0 ? [...state, action.payload] : [action.payload];
    case "GET_COUNT_NEW_ADMISSION_FORM_PAYMENT":
      return state;
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
  const [state_newAdmission, dispatch_newadmission] = useReducer(
    newAdmissionReducer,
    initialState_NewAdmission
  );
  const [user_state, user_dispatch] = useReducer(
    userSessionReducer,
    initialUserIdPhone
  );

  const [state_Fee_payment, dispatch_Fee_payment] = useReducer(
    feesPaymentReducer,
    initialState_FeesPayment
  );

  const [state_NewAdmission_payment, dispatch_NewAdmission_payment] =
    useReducer(
      newAdmissionFormPaymentReducer,
      initialState_NewAdmission_payment
    );

  return (
    <newAdmissionPaymentContext.Provider
      value={{ state_NewAdmission_payment, dispatch_NewAdmission_payment }}
    >
      <feePaymentContext.Provider
        value={{ state_Fee_payment, dispatch_Fee_payment }}
      >
        <userDataContext.Provider value={{ user_state, user_dispatch }}>
          <newadmissionContext.Provider
            value={{ state_newAdmission, dispatch_newadmission }}
          >
            <ApiContext.Provider value={{ state, dispatch }}>
              {children}
            </ApiContext.Provider>
          </newadmissionContext.Provider>
        </userDataContext.Provider>
      </feePaymentContext.Provider>
    </newAdmissionPaymentContext.Provider>
  );
};

export default ApiProvider;
