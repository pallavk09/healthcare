import React from "react";
import StudentDetailsForm from "../components/RegistrationBlock/Forms/StudentDetails";
import GuardianDetails from "../components/RegistrationBlock/Forms/GuardianDetails";
import AcademicsDetails from "../components/RegistrationBlock/Forms/AcademicsDetails";
import SummaryPage from "../components/RegistrationBlock/Forms/SummaryPage";

import { StudentRegistrationFormsType } from "../common/types";

export const StudentRegistrationForms: StudentRegistrationFormsType[] = [
  {
    id: "0",
    title: "Personal Info",
    data: {},
  },
  {
    id: "1",
    title: "Guardian Info",
    data: {},
  },
  {
    id: "2",
    title: "Academics",
    data: {},
  },
  {
    id: "3",
    title: "Finish",
    data: {},
  },
];
