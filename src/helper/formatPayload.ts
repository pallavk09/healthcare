// import { newStudentTemplate } from "../Config/payloads";

const FormatNewStudentPayload = (
  payload: any,
  userId: string | undefined,
  studentId: string
) => {
  const personalDetails = {
    studentfullname: payload.studentfullname,
    addressline1: payload.addressline1,
    addressline2: payload.addressline2,
    addresscity: payload.addresscity,
    addressstate: payload.addressstate,
    addresspincode: payload.addresspincode,
    studentdob: payload.studentdob,
    studentgender: payload.studentgender,
  };

  const guardianDetails = {
    guardianname: payload.guardianname,
    studentrelation: payload.studentrelation,
    occupation: payload.occupation,
    guardianphoneno: payload.guardianphoneno,
    guardianemailid: payload.guardianemailid,
  };

  const academicsDetails = {
    class: "",
    section: "",
    rollnumber: "",
    housename: "",
    busnumber: "",
  };

  const studentObj = {
    id: studentId,
    personalDetails,
    guardianDetails,
    academicsDetails,
    newAdmission: true,
    fees: [],
  };

  const formattedPayload = {
    userId: userId,
    studentObj,
  };

  return formattedPayload;
};

export { FormatNewStudentPayload };
