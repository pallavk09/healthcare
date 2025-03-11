import axios_instance from "../axios.config";

const ListAcademicRecordClassSection = async (newItem: any) => {
  try {
    const { class_id, section_id } = newItem;
    const payload = {
      class_id,
      section_id,
    };
    const response = await axios_instance.post(
      "/student/get-academic-record-cls-sect",
      payload
    );
    console.log(response);
    if (response?.data?.status === "SUCCESS") {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Exception at ListAcademicRecordClassSection");
    console.log(error);
    return null;
  }
};

const UpdateMultipleAcademicRecords = async (updatedItem: any) => {
  const { user, arrayOfItems } = updatedItem;
  const payload = {
    user,
    arrayOfItems,
  };
  const response = await axios_instance.post(
    "/student/update-multiple-academic-records",
    payload
  );
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response?.data;
  } else {
    return [];
  }
};

export { ListAcademicRecordClassSection, UpdateMultipleAcademicRecords };
