import axios_instance from "./axios.config";

const SendOtp = async (phoneNumber: string | null) => {
  const data = {
    phone: phoneNumber,
  };
  const response = await axios_instance.post("/auth/send-otp", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return null;
  }
};

const ValidateOtp = async (phoneNumber: string | null, otp: string | null) => {
  const data = {
    phone: phoneNumber,
    otp: otp,
  };

  const response = await axios_instance.post("/auth/validate-otp", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return null;
  }
};

export { SendOtp, ValidateOtp };
