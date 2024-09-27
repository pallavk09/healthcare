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

const ValidateOtp = async (
  phoneNumber: string | null,
  otp: string | null,
  type: string
) => {
  const data = {
    phone: phoneNumber,
    otp: otp,
    type,
  };

  const response = await axios_instance.post("/auth/validate-otp", data);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    console.log("Printing Login Response");
    console.log(response);
    localStorage.setItem("token", response?.data?.token);

    return response.data;
  } else {
    console.error("Error verifying OTP", response);
    return null;
  }
};

export { SendOtp, ValidateOtp };
