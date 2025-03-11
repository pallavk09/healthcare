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
  GridCellEditStopParams,
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
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Get as GetClass } from "../../api/Control-Settings/manage-class";
import {
  Get,
  GetSubjectsToClass,
} from "../../api/Control-Settings/manage-subjects";
import { GetExams } from "../../api/Exams-Management/new_exam";
import {
  AddSchedules,
  GetSchedules,
  UpdateSchedules,
} from "../../api/Exams-Management/schedule-exam";

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

const ScheduleExam = () => {
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [classRecords, setClassRecords] = useState<any>([]);
  const [examRecords, setexamRecords] = useState<any>([]);
  const [exams, setExams] = useState<any>([]);
  const [selectedExam, setSelectedExam] = useState<any>();
  const [selectedClass, setSelectedClass] = useState<any>();
  const [examSession, setExamSession] = useState(undefined);
  const [subjectsList, setSubjectsList] = useState<any>([]);
  const [classSubject, setClassSubject] = useState<any>([]);

  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [examAlreadyScheduled, setExamAlreadyScheduled] =
    useState<boolean>(false);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [addingSchedule, setAddingSchedule] = useState(false);
  const [scheduledExamFromDB, setScheduledExamFromDB] = useState<any>();

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
    },
    mode: "onTouched",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [classes_records, classes, subjects, exam_records] =
          await Promise.all([
            GetClass(),
            GetSubjectsToClass(),
            Get(),
            GetExams(),
          ]);

        if (classes_records && classes_records.result.documents?.length > 0) {
          setClassRecords(classes_records.result.documents);
        }
        if (classes && classes.result.documents?.length > 0) {
          setClassSubject(classes.result.documents);
        }
        if (subjects && subjects.result.documents?.length > 0) {
          setSubjectsList(subjects.result.documents);
        }
        if (exam_records && exam_records.result.documents?.length > 0) {
          setexamRecords(exam_records.result.documents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // setClassRecords(classes_records);
    // setSubjectsList(subjects);
    // setClassSubject(classes);
    // setExamSchedules(exam_schedules);
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

  useEffect(() => {
    console.log("selectedSubjects");
    console.log(selectedSubjects);
    const exam_schedule = selectedSubjects.map((subject: any) => ({
      subject_id: subject.subject_id,
      subject: subject.title,
      examDate: "",
      startTime: "",
      endTime: "",
    }));
    setRows(exam_schedule);
  }, [selectedSubjects]);

  const ResetScreen = () => {
    setRows([]);
    setEdit(false);
    setExamAlreadyScheduled(false);
  };

  const HandleClassChange = (event: any) => {
    console.log("Class Change Event");
    // console.log(event.target.value);
    setSelectedClass(event.target.value);
    ResetScreen();
  };

  const HandleSessionChange = (event: any) => {
    console.log("Session Change Event");
    console.log(event.target.value);
    setExamSession(event.target.value);
    ResetScreen();
  };

  const HandleExamChange = (event: any) => {
    console.log("Exam Change Event");
    console.log(event.target.value);
    setSelectedExam(event.target.value);
    ResetScreen();
  };

  // Handle value changes for a cell
  const handleValueChange = (
    subject_id: string,
    field: string,
    value: string
  ) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row.subject_id === subject_id ? { ...row, [field]: value } : row
      )
    );
  };

  // Define columns with renderCell that always renders a TextField
  const columns: GridColDef[] = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      // This cell is read-only.
    },
    {
      field: "examDate",
      headerName: "Exam Date",
      flex: 1,
      renderCell: (params) => (
        <TextField
          type="date"
          value={params.value || ""}
          onChange={(e) =>
            handleValueChange(
              params.row.subject_id as string,
              params.field,
              e.target.value
            )
          }
          disabled={examAlreadyScheduled ? !edit : false}
          sx={{
            borderRadius: 1,
            padding: 1,
            paddingRight: 2,
            textAlign: "center",
            width: "100%",
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ),
    },
    {
      field: "startTime",
      headerName: "Start Time",
      flex: 1,
      renderCell: (params) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={params.value ? new Date(params.value) : null}
            disabled={examAlreadyScheduled ? !edit : false}
            onChange={(newValue) => {
              handleValueChange(
                params.id as string,
                params.field,
                newValue ? newValue.toISOString() : ""
              );
            }}
            ampm
            slotProps={{
              textField: {
                sx: {
                  // border: "1px solid #ccc",
                  borderRadius: 1,
                  padding: 1,
                  paddingRight: 2,
                  width: "100%",
                },
              },
            }}
          />
        </LocalizationProvider>
      ),
    },
    {
      field: "endTime",
      headerName: "End Time",
      flex: 1,
      renderCell: (params) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={params.value ? new Date(params.value) : null}
            disabled={examAlreadyScheduled ? !edit : false}
            onChange={(newValue: any) => {
              handleValueChange(
                params.id as string,
                params.field,
                newValue ? newValue.toISOString() : ""
              );
            }}
            ampm
            slotProps={{
              textField: {
                sx: {
                  // border: "1px solid #ccc",
                  borderRadius: 1,
                  padding: 1,
                  width: "100%",
                },
              },
            }}
          />
        </LocalizationProvider>
      ),
    },
  ];

  const HandleShowSubjects = async (data: any) => {
    console.log("Go Clicked for Class");
    console.log(data);
    try {
      setAdding(true);
      const examSchedules = await GetSchedules();

      //check if schedule already exisit
      const _exam_Schedule = examSchedules.result.documents.filter(
        (item: any) =>
          item.session === data.session &&
          item.class_id === data.class_id &&
          item.exam_id === data.exam_id
      );

      if (_exam_Schedule && _exam_Schedule?.length > 0) {
        console.log("Exam already scheduled");
        console.log(_exam_Schedule);
        const _exam_Schedule_json = JSON.parse(_exam_Schedule[0].exam_schedule);
        setRows(_exam_Schedule_json);
        setEdit(false);
        setExamAlreadyScheduled(true);
        setScheduledExamFromDB(_exam_Schedule[0]);
      } else {
        const _class_id = data.class_id;
        const classSubjectObj = classSubject.filter(
          (item: any) => item.class_id === _class_id
        );

        console.log("classSubjectObj");
        console.log(classSubjectObj);

        //classSubjectObj will have array of objects for same class but different sections.
        //Since all classes will be tought same subjects, we can take any one of them.
        const subjectObj_string = classSubjectObj[0].subjects;
        const subjectObj = JSON.parse(subjectObj_string);

        const list_subject_id = subjectObj.map((item: any) => item.subject_id);
        console.log(list_subject_id);
        console.log(subjectsList);

        const subject_for_selected_class = subjectsList.filter((subject: any) =>
          list_subject_id.includes(subject.subject_id)
        );

        console.log(subject_for_selected_class);
        setSelectedSubjects(subject_for_selected_class);
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const HandleReset = () => {
    reset({
      session: "",
      exam_id: "",
      class_id: "",
    });

    setRows([]);
    setEdit(false);
    setExamAlreadyScheduled(false);
  };

  const handleSave = async () => {
    try {
      setAddingSchedule(true);
      if (edit) {
        console.log("Exam Already Scheduled:", rows);
        console.log("scheduledExamFromDB:");
        console.log(scheduledExamFromDB);
        const exam_schedule_obj = {
          id: scheduledExamFromDB.schedule_id,
          schedule_id: scheduledExamFromDB.schedule_id,
          class_id: selectedClass,
          session: examSession,
          exam_id: selectedExam,
          exam_schedule: JSON.stringify(rows),
          user: "Pallav",
        };
        console.log(exam_schedule_obj);
        const updateItem = await UpdateSchedules(exam_schedule_obj);
        if (updateItem && updateItem.result) {
          setRows(rows);
          setEdit(false);
          setExamAlreadyScheduled(true);
          setScheduledExamFromDB(updateItem.result);
          snackbarRef.current?.showSnackbar(
            `Exam Schedule Updated.`,
            "success"
          );
        } else {
          snackbarRef.current?.showSnackbar(`Item not added`, "error");
        }
      } else {
        console.log("Saved data:", rows);
        const exam_schedule_array = [];
        const _id = uuid().slice(0, 5);

        const exam_schedule_obj = {
          id: _id,
          schedule_id: _id,
          class_id: selectedClass,
          session: examSession,
          exam_id: selectedExam,
          exam_schedule: JSON.stringify(rows),
          user: "Pallav",
          // exam_schedule: rows,
        };

        const addNewItem = await AddSchedules(exam_schedule_obj);
        if (addNewItem && addNewItem.result) {
          setRows(rows);
          setEdit(false);
          setExamAlreadyScheduled(true);
          setScheduledExamFromDB(addNewItem.result);
          snackbarRef.current?.showSnackbar(`Exam Scheduled.`, "success");
        } else {
          snackbarRef.current?.showSnackbar(`Item not added`, "error");
        }
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAddingSchedule(false);
    }
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={2}
        pb={0}
        gap={1}
      >
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
          flexDirection={"row"}
          justifyContent={"flex-end"}
          p={2}
          pb={0}
          gap={1}
        >
          <MyCustomButton
            variant="contained"
            endIcon={<ArrowRightIcon />}
            onClick={() => navigate("..")}
          >
            Admit Card
          </MyCustomButton>
        </Box>
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
            <strong>Schedule An Exam</strong>
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
                onReset={HandleReset}
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
                    selectProps={{ onChange: HandleClassChange }}
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
                    selectProps={{ onChange: HandleExamChange }}
                  />

                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    startIcon={adding ? <CircularProgress size={20} /> : null}
                    disabled={adding}
                    sx={{
                      alignSelf: "center",
                      height: "70%",
                      width: "10%",
                    }}
                  >
                    {adding ? "" : "Show"}
                  </MyCustomButton>
                  <MyCustomButton
                    variant="contained"
                    type="reset"
                    sx={{
                      alignSelf: "center",
                      height: "70%",
                      width: "10%",
                    }}
                  >
                    Clear
                  </MyCustomButton>

                  {/* <MyCustomButton
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "10%",
                      height: "70%",
                      alignSelf: "center",
                    }}
                  >
                    {"Go"}
                  </MyCustomButton> */}
                </Box>
              </form>
              {rows && rows.length > 0 && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  rowHeight={70}
                  getRowId={(row) => row.subject_id}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[50, 100, 150]}
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
              )}
              {rows &&
                rows.length > 0 &&
                (!examAlreadyScheduled ? (
                  <MyCustomButton
                    variant="contained"
                    onClick={handleSave}
                    sx={{ width: "10%", height: "70%", alignSelf: "center" }}
                    startIcon={
                      addingSchedule ? <CircularProgress size={20} /> : null
                    }
                    disabled={addingSchedule}
                  >
                    {addingSchedule ? "" : "Save"}
                  </MyCustomButton>
                ) : (
                  <MyCustomButton
                    variant="contained"
                    onClick={edit ? handleSave : () => setEdit(true)}
                    sx={{ width: "auto", height: "70%", alignSelf: "center" }}
                    disabled={addingSchedule}
                    startIcon={
                      addingSchedule ? <CircularProgress size={20} /> : null
                    }
                  >
                    {!edit
                      ? "Edit Schedule"
                      : addingSchedule
                      ? ""
                      : "Save Changes"}
                  </MyCustomButton>
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ScheduleExam;
