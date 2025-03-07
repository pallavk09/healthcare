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
import { Button, Typography, Box, styled, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useForm } from "react-hook-form";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";
import { classes_records } from "../../Config/classes_records";
import { exam_records } from "../../Config/exams_records";
import { sections } from "../../Config/sections_records";
import { academic_records } from "../../Config/academic_records";
import { attendance_records } from "../../Config/attendance_records";

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

type AttendanceRecord = {
  [session: string]: {
    exams: {
      [exam_id: string]: {
        code: string;
        exam_name: string;
        total_working_days: number;
        total_days_present: number;
      };
    };
  };
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

const ManageAttendance = () => {
  const navigate = useNavigate();
  const [sectionList, setSectionList] = useState<any>([]);
  const [classRecords, setClassRecords] = useState<any>([]);
  const [exams, setExams] = useState<any>([]);
  const [examSession, setExamSession] = useState(undefined);
  const [searchState, setSearchState] = useState<any>({
    session: "",
    exam_id: "",
    class_id: "",
    section_id: "",
  });
  const [rows, setRows] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 10 });

  useEffect(() => {
    setClassRecords(classes_records);
    setSectionList(sections);
  }, []);

  useEffect(() => {
    console.log(examSession);
    const filteredExamList = exam_records.filter(
      (examItem) => examItem.session === examSession
    );

    console.log("filteredExamList");
    console.log(filteredExamList);
    setExams(filteredExamList);
  }, [examSession]);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      session: "",
      exam_id: "",
      class_id: "",
      section_id: "",
    },
    mode: "onTouched",
  });

  // Handle value changes for a cell
  const handleValueChange = (id: string, field: string, value: string) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Student Name", flex: 1, type: "string" },
    {
      field: "total_working_days",
      headerName: "Total Working Days",
      flex: 1,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="standard"
          value={params.value || ""}
          onChange={(e) =>
            handleValueChange(params.id as string, params.field, e.target.value)
          }
          disabled={true}
          sx={{
            borderRadius: 1,
            padding: 1,
            paddingRight: 2,
            textAlign: "center",
            width: "100%",
          }}
        />
      ),
    },
    {
      field: "total_days_present",
      headerName: "No. Of Days Present",
      flex: 1,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="standard"
          value={params.value || ""}
          onChange={(e) =>
            handleValueChange(params.id as string, params.field, e.target.value)
          }
          sx={{
            borderRadius: 1,
            padding: 1,
            paddingRight: 2,
            textAlign: "center",
            width: "100%",
          }}
        />
      ),
    },
  ];

  const HandleShowSubjects = (data: any) => {
    console.log("Go Clicked for Class");
    console.log(data);

    const student_list = academic_records.filter(
      (item: any) =>
        item.class_id === data.class_id && item.section_id === data.section_id
    );

    const examsDetails = exam_records.find(
      (item: any) =>
        item.session === data.session && item.exam_id === data.exam_id
    );

    const attendanceRecords = student_list.map((student: any) => {
      const attendanceRecord = attendance_records.find(
        (item: any) => item.student_id === student.student_id
      );

      //attendanceRecord.attendance is an object with explicitly defined keys (term1, term2, etc.)
      //TypeScript does not allow dynamic string indexing on an object unless an index signature is explicitly defined.
      //Hence we need to define type AttendanceRecord for this

      const studentAttendance = attendanceRecord?.attendance as
        | AttendanceRecord
        | undefined;
      const examAttendance =
        studentAttendance?.[data.session]?.exams?.[data.exam_id];

      return {
        id: `${student.id}`,
        student_id: student.student_id,
        name: student.name,
        exam_id: examsDetails?.exam_id || "", // ✅ Default to empty string if undefined
        session: examsDetails?.session || "",
        code: examsDetails?.code || "",
        exam_name: examsDetails?.name || "",
        total_working_days: examsDetails?.total_working_days || "",
        total_days_present: examAttendance?.total_days_present ?? 0, // ✅ Default to 0 if not found
      };
    });

    setRows(attendanceRecords);
    setSearchState(data);
  };

  const ResetScreen = () => {};

  const HandleSessionChange = (event: any) => {
    console.log("Session Change Event");
    console.log(event.target.value);
    setExamSession(event.target.value);
    ResetScreen();
  };

  const updateAttendanceRecords = (
    attendanceRecords: any,
    studentsAttendance: any
  ) => {
    studentsAttendance.forEach((record: any) => {
      const {
        id,
        student_id,
        name,
        exam_id,
        session,
        code,
        exam_name,
        total_working_days,
        total_days_present,
      } = record;

      const { class_id, section_id } = searchState;

      if (!attendanceRecords[student_id]) {
        attendanceRecords[student_id] = {
          id: student_id,
          student_id,
          name,
          academic_year: "2025-2026",
          class_id: class_id,
          section_id: section_id,
          attendance: {},
          remarks: "Aut tripudio vilis.",
        };
      }

      if (!attendanceRecords[student_id].attendance[session]) {
        attendanceRecords[student_id].attendance[session] = { exams: {} };
      }

      if (!attendanceRecords[student_id].attendance[session].exams[exam_id]) {
        attendanceRecords[student_id].attendance[session].exams[exam_id] = {
          code,
          exam_name,
          total_working_days: total_working_days,
          total_days_present: total_days_present,
        };
      }
    });

    return Object.values(attendanceRecords);
  };

  const handleSave = () => {
    console.log("Saved data:", rows);
    // const attendance_records = {};
    const updatedAcademicRecords = updateAttendanceRecords([], rows);
    console.log("updatedAcademicRecords");
    console.log(updatedAcademicRecords);
  };

  return (
    <>
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
            <strong>Update Students Attendance</strong>
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            p={2}
            pt={0}
            height="auto"
            justifyContent={"center"}
            alignItems={"center"}
            mt={1}
          >
            <form onSubmit={handleSubmit(HandleShowSubjects)}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-evenly"}
                gap={3}
                width="70vw"
              >
                <ControlledSelect
                  name={`class_id`}
                  control={control}
                  errors={errors}
                  label="Class"
                  rules={{ required: "Required" }}
                  options={classRecords.map((item: any) => ({
                    value: item.class_id,
                    label: item.name,
                  }))}
                  sx={{ width: "30%" }}
                  // selectProps={{ onChange: HandleClassChange }}
                />
                <ControlledSelect
                  name={`section_id`}
                  control={control}
                  errors={errors}
                  label="Section"
                  rules={{ required: "Required" }}
                  options={sectionList.map((item: any) => ({
                    value: item.section_id,
                    label: item.name,
                  }))}
                  sx={{ width: "30%" }}
                  // selectProps={{ onChange: HandleClassChange }}
                />

                <ControlledSelect
                  name={`session`}
                  control={control}
                  errors={errors}
                  label="Session"
                  rules={{ required: "Required" }}
                  options={[
                    { value: "", label: "Select" },
                    { value: "term1", label: "Term 1" },
                    { value: "term2", label: "Term 2" },
                  ]}
                  sx={{ width: "30%" }}
                  selectProps={{ onChange: HandleSessionChange }}
                />

                <ControlledSelect
                  name={`exam_id`}
                  control={control}
                  errors={errors}
                  label="Exam"
                  rules={{ required: "Required" }}
                  options={exams.map((item: any) => ({
                    value: item.exam_id,
                    label: item.name,
                  }))}
                  sx={{ width: "30%" }}
                  disabled={examSession == null || examSession == undefined}
                  // selectProps={{ onChange: HandleExamChange }}
                />

                <MyCustomButton
                  variant="contained"
                  type="submit"
                  sx={{
                    width: "10%",
                    height: "70%",
                    alignSelf: "center",
                  }}
                >
                  {"Go"}
                </MyCustomButton>
              </Box>
            </form>
            {rows && rows.length > 0 && (
              <>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  rowHeight={50}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[10, 20, 30]}
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
                    marginTop: "15px",

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
              </>
            )}
            {rows && rows.length > 0 && (
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
      </Box>
    </>
  );
};

export default ManageAttendance;
