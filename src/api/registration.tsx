import axios_instance from "./axios.config";

const GetRegisteredUser = async (userId: string) => {
  const data = {
    userId: userId,
  };
  const response = await axios_instance.post("/auth/get-registered-user", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return null;
  }
};

export { GetRegisteredUser };
