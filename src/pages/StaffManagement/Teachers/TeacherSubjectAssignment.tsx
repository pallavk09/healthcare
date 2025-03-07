import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridPaginationModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridOverlay,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Box,
  Grid,
  styled,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
// import { classes } from "../../Config/classes";

import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ToastSnackbar, {
  SnackbarHandle,
} from "../../../common/ToastNotification";
import { teachers_data } from "../../../Config/teachers";
import { classes_records } from "../../../Config/classes_records";
import { sections } from "../../../Config/sections_records";
import { classes } from "../../../Config/classes";
import { subjects } from "../../../Config/subjects";
import ControlledSelect from "../../../common/ControlledComponents/ControlledSelect";

const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="h5" color="textSecondary">
          NO DATA AVAILABLE
        </Typography>
      </Box>
    </GridOverlay>
  );
};

const CustomToolbar: React.FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "0rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

const TeacherSubjectAssignment = () => {
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });
  const [selectedRow, setSelectedRow] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);

  const [classList, setClassList] = useState<any>([]);
  const [sectionsList, setSectionsList] = useState<any>([]);
  const [teachersList, setTeachersList] = useState<any>([]);
  const [subjectList, setSubjectList] = useState<any>([]);
  const [class_teacher_assignment, setClass_teacher_assignment] = useState<any>(
    []
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      class_id: "",
      section_id: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (
      sections &&
      sections.length > 0 &&
      classes_records &&
      classes_records.length > 0 &&
      teachers_data &&
      teachers_data.length > 0 &&
      classes &&
      classes.length > 0 &&
      subjects &&
      subjects.length > 0
    ) {
      setClassList(classes_records);
      setSectionsList(sections);
      setTeachersList(teachers_data);
      setClass_teacher_assignment(classes);
      setSubjectList(subjects);
    }
  }, [classes_records, sections, classes, teachers_data, subjects]);

  useEffect(() => {
    if (selectedRow) {
      reset(selectedRow); // Reset form with selected row values
    }
  }, [selectedRow, reset]);

  const handleTeacherValueChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setApplications((prevRows: any) =>
      prevRows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleClassTeacherValueChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setApplications((prevRows: any) =>
      prevRows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const columns: GridColDef[] = [
    // { field: "name", headerName: "Class", flex: 1 },
    // { field: "section", headerName: "Section", flex: 1 },
    { field: "subject_name", headerName: "Subject", flex: 1 },
    {
      field: "teacher_id",
      headerName: "Teacher",
      flex: 1,
      renderCell: (params) => (
        <FormControl variant="standard" fullWidth>
          <Select
            value={params.value || ""}
            onChange={(e) =>
              handleTeacherValueChange(
                params.id as string,
                params.field,
                e.target.value
              )
            }
            sx={{
              borderRadius: 1,
              padding: 1,
              paddingRight: 2,
              textAlign: "left",
              width: "80%",
            }}
          >
            {teachersList.map((item: any, index: number) => (
              <MenuItem value={item.teacher_id} key={index}>
                {item.personal_details.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },

    {
      field: "class_teacher",
      headerName: "Class Teacher?",
      flex: 1,
      renderCell: (params) => (
        <FormControl variant="standard" fullWidth>
          <Select
            value={params.value || ""}
            onChange={(e) =>
              handleClassTeacherValueChange(
                params.id as string,
                params.field,
                e.target.value
              )
            }
            sx={{
              borderRadius: 1,
              padding: 1,
              paddingRight: 2,
              textAlign: "left",
              width: "80%",
            }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ];

  const onResetHandler = () => {
    reset({
      class_id: "",
      section_id: "",
    });
    setEdit(false);
    setApplications([]);
  };

  // const isDuplicate = (vehicle_no: string, registration_no: string) => {
  //   return applications.some(
  //     (vehicle: any) =>
  //       vehicle.vehicle_no === vehicle_no ||
  //       vehicle.registration_no === registration_no
  //   );
  // };

  // const updateItem = (updatedVehicle: any) => {
  //   setApplications((prevVehicle: any) =>
  //     prevVehicle.map((vehicle: any) =>
  //       vehicle.vehicle_no === updatedVehicle.vehicle_no
  //         ? { ...vehicle, ...updatedVehicle }
  //         : vehicle
  //     )
  //   );
  // };

  const handleFormSubmit = async (data: any) => {
    // console.log("Form submission");
    // console.log(data);
    const subject_teacher_mapping = class_teacher_assignment.filter(
      (item: any) =>
        item.class_id === data.class_id && item.section_id === data.section_id
    );

    // console.log("subject_teacher_mapping");
    // console.log(subject_teacher_mapping[0].subjects);

    const subjectsArray = subject_teacher_mapping[0].subjects;

    const mappingTableData = subjectsArray.map((item: any) => {
      const matchedSubjects = subjectList.filter(
        (subjectItem: any) => subjectItem.subject_id === item.subject_id
      );

      console.log("matchedSubjects");
      console.log(matchedSubjects);

      const { title, subject_id } =
        matchedSubjects.length > 0
          ? matchedSubjects[0]
          : { title: "", subject_id: "" };

      return {
        id: uuid().slice(0, 5),
        subject_name: title,
        subject_id,
        teacher_id: item.teacher_id,
        class_teacher: item.class_teacher,
      };
    });

    console.log("mappingTableData");
    console.log(mappingTableData);
    setApplications(mappingTableData);
  };

  const handleSave = () => {
    // From here need to update classes
    console.log("Saved data:", applications);

    //Sample response
    //   [
    //     {
    //         "id": "1d573",
    //         "subject_name": "Maths",
    //         "subject_id": "2d154374",
    //         "teacher_id": "2d154374454",
    //         "class_teacher": "Yes"
    //     },
    //     {
    //         "id": "40219",
    //         "subject_name": "English",
    //         "subject_id": "3d17763",
    //         "teacher_id": "2d154374455",
    //         "class_teacher": "No"
    //     },
    //     {
    //         "id": "03536",
    //         "subject_name": "Hindi",
    //         "subject_id": "5d15366",
    //         "teacher_id": "2d154374456",
    //         "class_teacher": "No"
    //     }
    // ]
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        p={2}
        pb={0}
        gap={1}
      >
        <MyCustomButton
          variant="contained"
          startIcon={<ArrowLeftIcon />}
          onClick={() => navigate("..")}
        >
          Go Back
        </MyCustomButton>
        <MyCustomButton
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/home")}
        >
          Home
        </MyCustomButton>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={2}
        pt={0}
        height="auto"
        width="auto"
      >
        {/* Add Vehicle */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          p={2}
          pt={0}
          height="auto"
          justifyContent={"center"}
          alignItems={"center"}
          width={"90vw"}
        >
          <Typography variant="h6" alignSelf={"center"}>
            <strong>Select Class and Section</strong>
          </Typography>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            onReset={onResetHandler}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              gap={3}
              width="70vw"
            >
              <ControlledSelect
                name="class_id"
                control={control}
                errors={errors}
                label="Class"
                rules={{ required: "Required" }}
                options={classList.map((item: any) => ({
                  value: item.class_id,
                  label: item.name,
                }))}
                sx={{ width: "50%" }}
              />

              <ControlledSelect
                name="section_id"
                control={control}
                errors={errors}
                label="Section"
                rules={{ required: "Required" }}
                options={sectionsList.map((item: any) => ({
                  value: item.section_id,
                  label: item.name,
                }))}
                sx={{ width: "50%" }}
              />

              <MyCustomButton
                variant="contained"
                type="submit"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                {!edit ? "Show" : "Save"}
              </MyCustomButton>
              <MyCustomButton
                variant="contained"
                type="reset"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                Clear
              </MyCustomButton>
            </Box>
          </form>
          {applications && applications.length > 0 && (
            <DataGrid
              rows={applications}
              columns={columns}
              rowHeight={70}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[50, 100, 150]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              slots={{
                toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              sx={{
                width: "80vw",
                maxWidth: "90vw",
                height: "65vh",
                marginTop: "20px",

                "& .MuiDataGrid-row:hover": {
                  transform: "scale(1)",
                  backgroundColor: "#f5f5f5",
                  "& .MuiDataGrid-cell": {
                    color: "#2E186A",
                    fontWeight: "bold",
                  },
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "#f0f0f0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1e88e5",
                  // fontFamily: "Motiva Sans Bold",
                  color: "#2e186a",
                  fontSize: "1rem",
                  borderBottom: "2px solid #fff",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  textOverflow: "clip",
                  whiteSpace: "normal",
                  lineHeight: "1",
                },
                "& .MuiDataGrid-columnHeader": {
                  padding: "0px 10px",
                },
              }}
            />
          )}

          {applications && applications.length > 0 && (
            <MyCustomButton
              variant="contained"
              onClick={handleSave}
              sx={{ width: "10%", height: "70%", alignSelf: "center" }}
            >
              {!edit ? "Save" : "Update"}
            </MyCustomButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TeacherSubjectAssignment;
