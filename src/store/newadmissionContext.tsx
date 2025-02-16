import { createContext, Dispatch } from "react";
import { userAction } from "../common/types";

export interface newAddmissionApplicationType {
  photoUrl?: string | null;
  userId: string;
  phone: string;
  emailId: string;
  applicationId: string;
  currentStatus:
    | "Verification"
    | "Interview"
    | "Selected"
    | "Rejected"
    | "Interview Scheduled"
    | "";
  role: "NEWADMISSION";
  submissionDate: string;
  createdAt: string;
  statusUpdatedOn: string;
  applicationData: string;
  submissionStatus: "Saved" | "Complete" | "Payment Pending" | "";
  paymentStatus: "Success" | "Fail" | "Pending" | "";
  transactionId: string;
  interview: string;
}

interface newAdmissionContext {
  state_newAdmission: newAddmissionApplicationType[];
  dispatch_newadmission: Dispatch<userAction>;
}
const newadmissionContext = createContext<newAdmissionContext | undefined>(
  undefined
);

export default newadmissionContext;
