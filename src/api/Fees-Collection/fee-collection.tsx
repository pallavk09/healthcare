import axios_instance from "../axios.config";

const GetClassFeeStructure = async () => {
  const response = await axios_instance.get(
    "/feestructure/get-class-fee-structure"
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetTransportFeeStructure = async () => {
  const response = await axios_instance.get(
    "/feestructure/get-transport-fee-structure"
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetClassWiseStudentCount = async () => {
  const response = await axios_instance.get("/student/get-class-student-count");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetStopWiseStudentCount = async () => {
  const response = await axios_instance.get("/student/get-stop-student-count");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetClassWiseTotalFees = async () => {
  const response = await axios_instance.get(
    "/feestructure/get-Class-wise-totalfees"
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetStopWiseTotalFees = async () => {
  const response = await axios_instance.get(
    "/feestructure/get-stop-wise-totalfees"
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetFeeSummary = async () => {
  const response = await axios_instance.get("/student/get-fee-summary");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetFeeCollectionReport = async () => {
  const response = await axios_instance.get("/student/fee-collection-report");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetFeeCollectionRecords = async (newItem: any) => {
  const { student_id } = newItem;
  const payload = {
    student_id,
  };
  const response = await axios_instance.post(
    "/student/fee-collection-records",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const GetPendingFeeParticulars = async (newItem: any) => {
  const { student_id } = newItem;
  const payload = {
    student_id,
  };
  const response = await axios_instance.post(
    "/student/get-pending-fee-particulars",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const UpdateFeePayment = async (newItem: any) => {
  const { student_id, payment_records_schoolFee, user } = newItem;
  const payload = {
    student_id,
    payment_records_schoolFee,
    user,
  };
  const response = await axios_instance.post(
    "/student/update-fees-payment",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

export {
  GetClassFeeStructure,
  GetTransportFeeStructure,
  GetClassWiseStudentCount,
  GetStopWiseStudentCount,
  GetClassWiseTotalFees,
  GetStopWiseTotalFees,
  GetFeeSummary,
  GetPendingFeeParticulars,
  UpdateFeePayment,
  GetFeeCollectionReport,
  GetFeeCollectionRecords,
};
