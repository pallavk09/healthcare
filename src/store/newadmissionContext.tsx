import { createContext, Dispatch } from "react";
import { userAction } from "../common/types";

export interface newAddmissionApplicationType {
  photoUrl?: string | null;
  userId: string;
  phone: string;
  emailId: string;
  applicationId: string;
  status: "Applied" | "Interview" | "Selected" | "";
  role: "NEWADMISSION";
  submissionDate: string;
  createdAt: string;
  statusUpdatedOn: string;
  applicationData: string;
  submissionStatus: "Complete" | "Payment Pending" | "";
  paymentStatus: "Success" | "Fail" | "Pending" | "";
  transactionId: string;
}

interface newAdmissionContext {
  state_newAdmission: newAddmissionApplicationType[];
  dispatch_newadmission: Dispatch<userAction>;
}
const newadmissionContext = createContext<newAdmissionContext | undefined>(
  undefined
);

export default newadmissionContext;
