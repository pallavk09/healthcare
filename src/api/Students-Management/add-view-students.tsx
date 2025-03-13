import axios_instance from "../axios.config";

const GetStudents = async () => {
  const response = await axios_instance.get("/student/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddStudent = async (studentData: any) => {
  try {
    const {
      id,
      user,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
    } = studentData;

    const payload = {
      id,
      user,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
    };
    const response = await axios_instance.post("/student/addstudent", payload);
    console.log(response);
    if (response?.data?.status === "SUCCESS") {
      return response?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error Adding New Student");
    console.log(error);
    return [];
  }
};

const UpdateStudent = async (studentData: any) => {
  try {
    const {
      id,
      user,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
    } = studentData;

    const payload = {
      id,
      user,
      student_id,
      admission_id,
      pen,
      apaar,
      adhaar,
      admission_date,
      admission_catagory,
      admission_scheme,
      discount,
      cast,
      is_active,
      photoUrl,
      transport_details,
      personal_details,
      guardian_details,
      father_details,
      mother_details,
      previous_school,
      class_id,
      class_name,
      section_id,
      section_name,
      roll_number,
    };
    const response = await axios_instance.post(
      "/student/updatestudent",
      payload
    );
    console.log(response);
    if (response?.data?.status === "SUCCESS") {
      console.log("UI API call. Success");
      console.log(response);
      return response?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error Updating Student");
    console.log(error);
    return [];
  }
};

const GetAcademicsRecord = async () => {
  const response = await axios_instance.get("/student/get-academic-records");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddAcademicsRecord = async (newRecord: any) => {
  const {
    id,
    user,
    academic_record_id,
    student_id,
    name,
    academic_year,
    class_id,
    class_name,
    section_id,
    section,
    roll_number,
    performance,
    remarks,
  } = newRecord;

  const payload = {
    id,
    user,
    academic_record_id,
    student_id,
    name,
    academic_year,
    class_id,
    class_name,
    section_id,
    section,
    roll_number,
    performance,
    remarks,
  };
  const response = await axios_instance.post(
    "/student/add-new-academic-record",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

const GetAcademicsRecordStudent = async (newItem: any) => {
  try {
    const { student_id } = newItem;
    const payload = {
      student_id,
    };
    const response = await axios_instance.post(
      "/student/get-academic-record-student",
      payload
    );
    console.log(response);
    if (response?.data?.status === "SUCCESS") {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Exception at GetAcademicsRecordStudent");
    console.log(error);
    return null;
  }
};

export {
  GetStudents,
  AddStudent,
  UpdateStudent,
  GetAcademicsRecord,
  AddAcademicsRecord,
  GetAcademicsRecordStudent,
};
