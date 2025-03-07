import axios_instance from "../axios.config";

const GetExams = async () => {
  const response = await axios_instance.get("/exam/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddExam = async (newItem: any) => {
  const {
    id,
    user,
    exam_id,
    session,
    code,
    name,
    max_marks,
    pass_marks,
    total_working_days,
  } = newItem;
  const payload = {
    id,
    user,
    exam_id,
    session,
    code,
    name,
    max_marks,
    pass_marks,
    total_working_days,
  };
  const response = await axios_instance.post("/exam/add", payload);
  console.log(response);
  if (
    response?.data?.status === "SUCCESS" &&
    response?.data?.message === "New entry added"
  ) {
    return response?.data;
  } else {
    return [];
  }
};

const UpdateExam = async (updatedItem: any) => {
  const {
    id,
    user,
    exam_id,
    session,
    code,
    name,
    max_marks,
    pass_marks,
    total_working_days,
  } = updatedItem;
  const payload = {
    id,
    user,
    exam_id,
    session,
    code,
    name,
    max_marks,
    pass_marks,
    total_working_days,
  };
  const response = await axios_instance.post("/exam/update", payload);
  console.log(response);
  if (
    response?.data?.status === "SUCCESS" &&
    response?.data?.message === "Entry updated"
  ) {
    return response?.data;
  } else {
    return [];
  }
};

export { GetExams, AddExam, UpdateExam };
