import axios_instance from "../axios.config";

const GetSections = async () => {
  const response = await axios_instance.get("/section/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

export { GetSections };
