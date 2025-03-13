import axios_instance from "../../axios.config";

const GetTeachers = async () => {
  const response = await axios_instance.get("/teacher/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddTeacher = async (teacherData: any) => {
  try {
    const {
      id,
      user,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
    } = teacherData;

    const payload = {
      id,
      user,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
    };
    const response = await axios_instance.post("/teacher/addteacher", payload);
    console.log(response);
    if (response?.data?.status === "SUCCESS") {
      return response?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error Adding New Teacher");
    console.log(error);
    return [];
  }
};

const UpdateTeacher = async (teacherData: any) => {
  try {
    const {
      id,
      user,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
    } = teacherData;

    const payload = {
      id,
      user,
      teacher_id,
      joining_id,
      tp_code,
      oasis_id,
      adhaar,
      qualification,
      joining_date,
      type,
      discount,
      cast,
      is_active,
      sub_post,
      transport_details,
      personal_details,
    };
    const response = await axios_instance.post(
      "/teacher/updateteacher",
      payload
    );
    console.log(response);
    if (response?.data?.status === "SUCCESS") {
      return response?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error Updating Teacher");
    console.log(error);
    return [];
  }
};

export { GetTeachers, AddTeacher, UpdateTeacher };
