// import { newStudentTemplate } from "../Config/payloads";

const FormatNewStudentPayload = (
  payload: any,
  userId: string | undefined,
  studentId: string,
  phone: string,
  newAdmission?: boolean
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
    class: payload.class,
    section: payload.section,
    rollnumber: payload.rollnumber,
    housename: payload.housename,
    busnumber: payload.busnumber,
  };

  const studentObj = {
    id: studentId,
    photoUrl: "",
    personalDetails,
    guardianDetails,
    academicsDetails,
    newAdmission: newAdmission || false,
    fees: [],
  };

  const formattedPayload = {
    userId: userId,
    phone: phone,
    studentObj,
  };

  return formattedPayload;
};

export { FormatNewStudentPayload };
