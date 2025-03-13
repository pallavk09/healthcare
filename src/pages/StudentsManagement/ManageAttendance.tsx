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
  styled,
  TextField,
  CircularProgress,
} from "@mui/material";

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
import { Get as GetClass } from "../../api/Control-Settings/manage-class";
import { GetSections } from "../../api/Students-Management/manage-section";
import { GetExams } from "../../api/Exams-Management/new_exam";
import {
  ListAcademicRecordClassSection,
  UpdateMultipleAcademicRecords,
} from "../../api/Students-Management/manage-attendance";

const CustomNoRowsOverlay = ({ loading }: { loading: boolean }) => {
  return (
    <GridOverlay
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box sx={{ textAlign: "center", padding: 2 }}>
        {loading ? (
          <>
            <CircularProgress size={40} />
            <Typography variant="h6" color="textSecondary" mt={2}>
              Loading data...
            </Typography>
          </>
        ) : (
          <Typography variant="h5" color="textSecondary">
            NO DATA AVAILABLE
          </Typography>
        )}
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
  const snackbarRef = React.useRef<SnackbarHandle>(null);
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
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [examRecords, setexamRecords] = useState<any>([]);
  const [saveAttendance, setSaveAttendance] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [classes_records, section_records, exam_records] =
          await Promise.all([GetClass(), GetSections(), GetExams()]);

        if (classes_records && classes_records.result.documents?.length > 0) {
          setClassRecords(classes_records.result.documents);
        }
        if (section_records && section_records.result.documents?.length > 0) {
          setSectionList(section_records.result.documents);
        }
        if (exam_records && exam_records.result.documents?.length > 0) {
          setexamRecords(exam_records.result.documents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        snackbarRef.current?.showSnackbar(`Error fetching data`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(examSession);
    console.log(examRecords);
    const filteredExamList = examRecords.filter(
      (examItem: any) => examItem.session === examSession
    );

    console.log(filteredExamList);
    setExams(filteredExamList);
  }, [examSession]);

  // useEffect(() => {
  //   console.log(examSession);
  //   const filteredExamList = exam_records.filter(
  //     (examItem) => examItem.session === examSession
  //   );

  //   console.log("filteredExamList");
  //   console.log(filteredExamList);
  //   setExams(filteredExamList);
  // }, [examSession]);

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

  const HandleShowSubjects = async (data: any) => {
    try {
      setAdding(true);
      console.log("Go Clicked for Class");
      console.log(data);
      const { class_id, section_id, session, exam_id } = data;
      const payload = {
        class_id,
        section_id,
      };
      const academic_records_list = await ListAcademicRecordClassSection(
        payload
      );
      if (academic_records_list && academic_records_list.result) {
        console.log(academic_records_list.result.documents);
        const attendanceRecords = academic_records_list.result.documents.map(
          (record: any) => ({
            ...record,
            id: record.academic_record_id,
            total_working_days:
              JSON.parse(record.performance)[session].exams[exam_id]
                .total_working_days || "",
            total_days_present:
              JSON.parse(record.performance)[session].exams[exam_id]
                .total_days_present || "",
          })
        );
        setSearchState(data);
        console.log("attendanceRecords");
        console.log(attendanceRecords);
        setRows(attendanceRecords);
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const onResetHandler = () => {
    reset({
      session: "",
      exam_id: "",
      class_id: "",
      section_id: "",
    });
    setRows([]);
  };

  const HandleSessionChange = (event: any) => {
    setExamSession(event.target.value);
  };

  // const updateAttendanceRecords = (
  //   attendanceRecords: any,
  //   studentsAttendance: any
  // ) => {
  //   studentsAttendance.forEach((record: any) => {
  //     const {
  //       id,
  //       student_id,
  //       name,
  //       exam_id,
  //       session,
  //       code,
  //       exam_name,
  //       total_working_days,
  //       total_days_present,
  //     } = record;

  //     const { class_id, section_id } = searchState;

  //     if (!attendanceRecords[student_id]) {
  //       attendanceRecords[student_id] = {
  //         id: student_id,
  //         student_id,
  //         name,
  //         academic_year: "2025-2026",
  //         class_id: class_id,
  //         section_id: section_id,
  //         attendance: {},
  //         remarks: "Aut tripudio vilis.",
  //       };
  //     }

  //     if (!attendanceRecords[student_id].attendance[session]) {
  //       attendanceRecords[student_id].attendance[session] = { exams: {} };
  //     }

  //     if (!attendanceRecords[student_id].attendance[session].exams[exam_id]) {
  //       attendanceRecords[student_id].attendance[session].exams[exam_id] = {
  //         code,
  //         exam_name,
  //         total_working_days: total_working_days,
  //         total_days_present: total_days_present,
  //       };
  //     }
  //   });

  //   return Object.values(attendanceRecords);
  // };

  const handleSave = async () => {
    try {
      setSaveAttendance(true);

      console.log("Saved data:", rows);
      const hasError = rows.some((row: any) => {
        const working_days = parseInt(row.total_working_days) || 0;
        const days_present = parseInt(row.total_days_present) || 0;

        if (days_present > working_days) {
          snackbarRef.current?.showSnackbar(
            `Days Present Cannot be Greater Than Working Days`,
            "warning"
          );
          return true; // Stops iteration
        }
        return false;
      });

      if (hasError) return;

      const updated_performance = rows.map((row: any) => {
        const {
          academic_record_id,
          performance,
          total_days_present,
          ...others
        } = row;

        const performace_json = JSON.parse(performance);
        performace_json[searchState.session].exams[
          searchState.exam_id
        ].total_days_present = total_days_present;
        return {
          id: academic_record_id,
          performance: JSON.stringify(performace_json),
        };
      });

      console.log("updated_performance");
      console.log(updated_performance);

      const payload = {
        user: "pallav",
        arrayOfItems: updated_performance,
      };

      const response = await UpdateMultipleAcademicRecords(payload);

      if (response.status === "SUCCESS") {
        snackbarRef.current?.showSnackbar(`Attendance Saved.`, "success");
      } else {
        snackbarRef.current?.showSnackbar(`Attendance Not Saved.`, "warning");
      }

      // const updatedAcademicRecords = updateAttendanceRecords([], rows);
      // console.log("updatedAcademicRecords");
      // console.log(updatedAcademicRecords);
    } catch (error) {
      console.log("Exception Occured");
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error Occured`, "error");
    } finally {
      setSaveAttendance(false);
    }
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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <CircularProgress />
            </Box>
          ) : (
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
              <form
                onSubmit={handleSubmit(HandleShowSubjects)}
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
                    startIcon={adding ? <CircularProgress size={20} /> : null}
                    disabled={adding}
                    sx={{
                      alignSelf: "center",
                      height: "70%",
                      width: "30%",
                    }}
                  >
                    {adding ? "" : "Fetch Students"}
                  </MyCustomButton>
                  <MyCustomButton
                    variant="contained"
                    type="reset"
                    sx={{
                      alignSelf: "center",
                      height: "70%",
                      width: "30%",
                    }}
                  >
                    Clear
                  </MyCustomButton>
                </Box>
              </form>
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
                  loading={loading}
                  slots={{
                    toolbar: GridToolbar,
                    noRowsOverlay: () => (
                      <CustomNoRowsOverlay loading={loading} />
                    ),
                  }}
                  slotProps={{ toolbar: { showQuickFilter: true } }}
                  sx={{
                    width: "60vw",
                    maxWidth: "70vw",
                    height: "65vh", // Ensures sufficient height
                    minHeight: "300px", // Ensures the No Data message is always visible properly
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
              {rows && rows.length > 0 && (
                <MyCustomButton
                  variant="contained"
                  onClick={handleSave}
                  sx={{ width: "20%", height: "70%", alignSelf: "center" }}
                  startIcon={
                    saveAttendance ? <CircularProgress size={20} /> : null
                  }
                  disabled={saveAttendance}
                >
                  {saveAttendance ? "" : "Save Attendance"}
                </MyCustomButton>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ManageAttendance;
