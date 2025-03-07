import axios_instance from "../axios.config";

const GetSchedules = async () => {
  const response = await axios_instance.get("/examschedule/get");
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

const AddSchedules = async (newItem: any) => {
  const { id, user, schedule_id, class_id, exam_id, session, exam_schedule } =
    newItem;
  const payload = {
    id,
    user,
    schedule_id,
    class_id,
    exam_id,
    session,
    exam_schedule,
  };
  const response = await axios_instance.post("/examschedule/add", payload);
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

const UpdateSchedules = async (updatedItem: any) => {
  const { id, user, schedule_id, class_id, exam_id, session, exam_schedule } =
    updatedItem;
  const payload = {
    id,
    user,
    schedule_id,
    class_id,
    exam_id,
    session,
    exam_schedule,
  };
  const response = await axios_instance.post("/examschedule/update", payload);
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

export { GetSchedules, AddSchedules, UpdateSchedules };
