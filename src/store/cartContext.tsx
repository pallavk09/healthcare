import { createContext, Dispatch } from "react";
import { studentData, userAction } from "../common/types";
import { newAddmissionApplicationType } from "./newadmissionContext";

export interface cartContextType_FEE {
  type: "FEES_PAYMENT";
  student: studentData;
  status: "PENDING_PAYMENT";
}

export interface cartContextType_ADMISSION_FORM {
  type: "NEW_ADMISSION_FORM";
  newApplication: newAddmissionApplicationType;
  status: "PENDING_PAYMENT";
}

interface feePayment {
  state_Fee_payment: cartContextType_FEE[] | [];
  dispatch_Fee_payment: Dispatch<userAction>;
}

interface newAdmissionPayment {
  state_NewAdmission_payment: cartContextType_ADMISSION_FORM[] | [];
  dispatch_NewAdmission_payment: Dispatch<userAction>;
}

const feePaymentContext = createContext<feePayment | undefined>(undefined);

const newAdmissionPaymentContext = createContext<
  newAdmissionPayment | undefined
>(undefined);

export { feePaymentContext, newAdmissionPaymentContext };
