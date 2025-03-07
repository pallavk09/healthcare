import axios_instance from "../axios.config";

const Get = async () => {
  const response = await axios_instance.get("/class/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

export { Get };
