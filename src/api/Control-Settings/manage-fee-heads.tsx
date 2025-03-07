import axios_instance from "../axios.config";

const GetFeeHeads = async () => {
  const response = await axios_instance.get("/feeheads/classfee/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddFeeHeads = async (newItem: any) => {
  const { id, user, feehead_id, title } = newItem;
  const payload = {
    id,
    user,
    feehead_id,
    title,
  };
  const response = await axios_instance.post("/feeheads/classfee/add", payload);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const UpdateFeeHeads = async (newItem: any) => {
  const { id, user, feehead_id, title } = newItem;
  const payload = {
    id,
    user,
    feehead_id,
    title,
  };
  const response = await axios_instance.post(
    "/feeheads/classfee/update",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

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

const AddClassFeeStructure = async (newItem: any) => {
  const { user, arrayOfItems } = newItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/feestructure/add-class-fee-structure",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const UpdateClassFeeStructure = async (newItem: any) => {
  const { user, arrayOfItems } = newItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/feestructure/update-class-fee-structure",
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
  GetFeeHeads,
  AddFeeHeads,
  UpdateFeeHeads,
  GetClassFeeStructure,
  AddClassFeeStructure,
  UpdateClassFeeStructure,
};
