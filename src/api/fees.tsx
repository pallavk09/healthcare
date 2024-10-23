import axios_instance from "./axios.config";

const GetFeeData = async (userId: string) => {
  const payload = {
    userId: userId,
  };

  const response = await axios_instance.post("/fees/get-fee", payload);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

export { GetFeeData };
