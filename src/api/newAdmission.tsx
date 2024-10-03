import axios_instance from "./axios.config";

const ListApplications = async (userId: string | null) => {
  const data = {
    userId: userId,
  };

  const response = await axios_instance.post("/newadmission/list", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const CreateNewApplication = async (applicationData: any) => {
  console.log("CreateNewApplication. Data received as");
  console.log(applicationData);
  // const data = JSON.stringify(applicationData);
  const response = await axios_instance.post(
    "/newadmission/apply",
    applicationData
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

export { ListApplications, CreateNewApplication };
