import axios_instance from "../axios.config";

const GetVehicles = async () => {
  const response = await axios_instance.get("/vehicle/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddVehicles = async (newItem: any) => {
  const {
    user,
    id,
    vehicle_id,
    vehicle_no,
    type,
    registration_no,
    driver_name,
  } = newItem;
  const payload = {
    user,
    id,
    vehicle_id,
    vehicle_no,
    type,
    registration_no,
    driver_name,
  };
  const response = await axios_instance.post("/vehicle/add", payload);
  console.log(response);
  if (
    response?.data?.status === "SUCCESS" &&
    response?.data?.message === "New entry added"
  ) {
    return response?.data;
  } else {
    return [];
  }
};

const UpdateVehicles = async (updatedItem: any) => {
  const {
    user,
    id,
    vehicle_id,
    vehicle_no,
    type,
    registration_no,
    driver_name,
  } = updatedItem;
  const payload = {
    user,
    id,
    vehicle_id,
    vehicle_no,
    type,
    registration_no,
    driver_name,
  };
  const response = await axios_instance.post("/vehicle/update", payload);
  console.log(response);
  if (
    response?.data?.status === "SUCCESS" &&
    response?.data?.message === "Entry updated"
  ) {
    return response?.data;
  } else {
    return [];
  }
};

const GetStops = async () => {
  const response = await axios_instance.get("/stop/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddStop = async (newItem: any) => {
  const { user, id, stop_id, name, vehicle_id } = newItem;
  const payload = {
    user,
    id,
    stop_id,
    name,
    vehicle_id,
  };
  const response = await axios_instance.post("/stop/add", payload);
  console.log(response);
  if (
    response?.data?.status === "SUCCESS" &&
    response?.data?.message === "New entry added"
  ) {
    return response?.data;
  } else {
    return [];
  }
};

const UpdateStop = async (newItem: any) => {
  const { user, id, stop_id, name, vehicle_id } = newItem;
  const payload = {
    user,
    id,
    stop_id,
    name,
    vehicle_id,
  };
  const response = await axios_instance.post("/stop/update", payload);
  console.log(response);
  if (
    response?.data?.status === "SUCCESS" &&
    response?.data?.message === "Entry updated"
  ) {
    return response?.data;
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

const AddTransportFeeStructure = async (newItem: any) => {
  const { user, arrayOfItems } = newItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/feestructure/add-transport-fee-structure",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

const UpdateTransportFeeStructure = async (newItem: any) => {
  const { user, arrayOfItems } = newItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/feestructure/update-transport-fee-structure",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

export {
  GetVehicles,
  AddVehicles,
  UpdateVehicles,
  GetStops,
  AddStop,
  UpdateStop,
  GetTransportFeeStructure,
  AddTransportFeeStructure,
  UpdateTransportFeeStructure,
};
