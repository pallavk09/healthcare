import axios_instance from "./axios.config";

const ListStudents = async (userId: string | null) => {
  const data = {
    userId: userId,
  };

  const response = await axios_instance.post("/student/list", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const CreateNewStudent = async (studentData: any) => {
  const data = JSON.stringify(studentData);
  const response = await axios_instance.post("/student/create-new", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

const UpdateStudent = async (studentData: any) => {
  const data = JSON.stringify(studentData);
  const response = await axios_instance.post("/student/update", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    console.log("UI API call. Success");
    console.log(response);
    return response?.data;
  } else {
    return [];
  }
};

export { ListStudents, CreateNewStudent, UpdateStudent };
