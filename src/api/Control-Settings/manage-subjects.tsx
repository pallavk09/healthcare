import axios_instance from "../axios.config";

const Get = async () => {
  const response = await axios_instance.get("/subject/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const Add = async (newItem: any) => {
  const { id, user, subject_id, code, title } = newItem;
  const payload = {
    id,
    user,
    subject_id,
    code,
    title,
  };
  const response = await axios_instance.post("/subject/add", payload);
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

const Update = async (updatedItem: any) => {
  const { id, user, subject_id, code, title } = updatedItem;
  const payload = {
    id,
    user,
    subject_id,
    code,
    title,
  };
  const response = await axios_instance.post("/subject/update", payload);
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

const GetSubjectsToClass = async () => {
  const response = await axios_instance.get("/subject/get-subject-to-class");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddSubjectsToClass = async (newItem: any) => {
  const { user, arrayOfItems } = newItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/subject/add-subject-to-class",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

const UpdateSubjectsToClass = async (updatedItem: any) => {
  const { user, arrayOfItems } = updatedItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/subject/update-subject-to-class",
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
  Get,
  Add,
  Update,
  GetSubjectsToClass,
  AddSubjectsToClass,
  UpdateSubjectsToClass,
};
