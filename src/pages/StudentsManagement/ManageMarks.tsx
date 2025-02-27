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

const ManageMarks = () => {
  const navigate = useNavigate();
  const [sectionList, setSectionList] = useState<any>([]);
  const [classRecords, setClassRecords] = useState<any>([]);
  const [exams, setExams] = useState<any>([]);
  const [examSession, setExamSession] = useState(undefined);
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

  // Handle row updates
  // const handleProcessRowUpdate = (newRow: any) => {
  //   setApplications((prevRows: any) =>
  //     prevRows.map((row: any) => (row.id === newRow.id ? newRow : row))
  //   );
  // };

  // Handle value changes for a cell
  const handleValueChange = (id: string, field: string, value: string) => {
    console.log(id, field, value);
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Student Name", flex: 1, type: "string" },
    { field: "subject_name", headerName: "Subject", flex: 1, type: "string" },
    {
      field: "max_marks",
      headerName: "Max Marks",
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
      field: "pass_marks",
      headerName: "Passing Marks",
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
      field: "marks_obtained",
      headerName: "Marks Obtained",
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

  const flattenAcademicRecords = (academicRecords: any) => {
    const flatData = [] as any;

    academicRecords.forEach((student: any) => {
      const { id, student_id, name, performance } = student;

      Object.entries(performance).forEach(([session, termData]: [any, any]) => {
        Object.entries(termData.exams).forEach(
          ([exam_id, exam]: [any, any]) => {
            exam.marks_details.forEach((subject: any) => {
              flatData.push({
                id: `${id}-${exam_id}-${subject.subject_name}`, // Unique row ID
                student_id,
                name,
                subject_name: subject.subject_name,
                exam_id,
                session,
                code: exam.exam_code || "", // Ensure code is available
                exam_name: exam.exam_name,
                max_marks: subject.subject_max_marks.toString(),
                pass_marks: subject.subject_pass_marks.toString(),
                marks_obtained: subject.marks_obtained.toString(),
              });
            });
          }
        );
      });
    });

    return flatData;
  };

  const HandleShowSubjects = (data: any) => {
    console.log("Go Clicked for Class");
    console.log(data);
    // //As soon as class is assingned to any students, its entry will be made in academic_Records
    // //For given class_id and section_id fetch all students
    // const student_list = academic_records.filter(
    //   (item: any) =>
    //     item.class_id === data.class_id && item.section_id === data.section_id
    // );

    // //For given session and exam_id fetch max_marks and pass_marks
    // const marksDetails = exam_records.find(
    //   (item: any) =>
    //     item.session === data.session && item.exam_id === data.exam_id
    // );

    // const _max_marks = marksDetails?.max_marks;
    // const _pass_marks = marksDetails?.pass_marks;

    // const exam_schedule_details = exam_schedules.find(
    //   (item: any) =>
    //     item.class_id === data.class_id &&
    //     item.session === data.session &&
    //     item.exam_id === data.exam_id
    // );

    // const exam_schedule_array = exam_schedule_details?.exam_schedule;

    // const student_subject_marks = student_list.flatMap((student: any) =>
    //   exam_schedule_array?.map((subjectObj) => ({
    //     id: `${student.id}-${subjectObj.id}`,
    //     student_id: student.student_id,
    //     name: student.name,
    //     subject_name: subjectObj.subject,
    //     exam_id: marksDetails?.exam_id,
    //     session: marksDetails?.session,
    //     exam_code: marksDetails?.code,
    //     exam_name: marksDetails?.name,
    //     max_marks: marksDetails?.max_marks,
    //     pass_marks: marksDetails?.pass_marks,
    //     marks_obtained: 0,
    //   }))
    // );

    // console.log("student_subject_marks");
    // console.log(student_subject_marks);

    const flatMappedExamData = flattenAcademicRecords(academic_records);
    console.log("flatMappedExamData");
    console.log(flatMappedExamData);

    setRows(flatMappedExamData);
  };

  const ResetScreen = () => {};

  // const HandleClassChange = (event: any) => {
  //   console.log("Class Change Event");
  //   // console.log(event.target.value);
  //   setSelectedClass(event.target.value);
  //   ResetScreen();
  // };

  const HandleSessionChange = (event: any) => {
    console.log("Session Change Event");
    console.log(event.target.value);
    setExamSession(event.target.value);
    ResetScreen();
  };

  // const HandleExamChange = (event: any) => {
  //   console.log("Exam Change Event");
  //   console.log(event.target.value);
  //   setSelectedExam(event.target.value);
  //   ResetScreen();
  // };

  const updateAcademicRecords = (academicRecords: any, examResults: any) => {
    examResults.forEach((record: any) => {
      const {
        student_id,
        session,
        exam_id,
        code: exam_code,
        exam_name,
        subject_name,
        max_marks,
        pass_marks,
        marks_obtained,
        total_working_days = 0, // Default value
        total_days_present = 0, // Default value
      } = record;

      // Find student record
      const studentRecord = academicRecords.find(
        (s: any) => s.student_id === student_id
      );
      if (!studentRecord) return; // Skip if student not found

      // Ensure performance[session] exists
      if (!studentRecord.performance[session]) {
        studentRecord.performance[session] = { exams: {} };
      }

      // Check if the exam exists
      if (!studentRecord.performance[session].exams[exam_id]) {
        studentRecord.performance[session].exams[exam_id] = {
          exam_code,
          exam_name,
          max_marks: 0,
          pass_marks: 0,
          total_marks_obtained: 0,
          total_working_days,
          total_days_present,
          marks_details: [],
        };
      }

      const examRef = studentRecord.performance[session].exams[exam_id];

      // Check if subject already exists in marks_details
      const subjectIndex = examRef.marks_details.findIndex(
        (m: any) => m.subject_name === subject_name
      );

      if (subjectIndex > -1) {
        // If subject exists, update marks_obtained
        examRef.marks_details[subjectIndex].marks_obtained =
          Number(marks_obtained);
      } else {
        // If subject does not exist, add it
        examRef.marks_details.push({
          subject_name,
          marks_obtained: Number(marks_obtained),
          subject_max_marks: Number(max_marks),
          subject_pass_marks: Number(pass_marks),
        });
      }

      // Recalculate total max_marks, pass_marks, and total_marks_obtained
      examRef.max_marks = examRef.marks_details.reduce(
        (sum: any, s: any) => sum + Number(s.subject_max_marks),
        0
      );
      examRef.pass_marks = examRef.marks_details.reduce(
        (sum: any, s: any) => sum + Number(s.subject_pass_marks),
        0
      );
      examRef.total_marks_obtained = examRef.marks_details.reduce(
        (sum: any, s: any) => sum + Number(s.marks_obtained),
        0
      );
    });

    return academicRecords;
  };

  const handleSave = () => {
    // Replace this with your save logic, such as an API call
    console.log("Saved data:", rows);
    const updatedAcademicRecords = updateAcademicRecords(
      academic_records,
      rows
    );
    console.log(updatedAcademicRecords);

    // const academic_Records = [
    //   {
    //     id: "3dd5eb92",
    //     student_id: "2d154321",
    //     name: "Diane Lowe 1",
    //     academic_year: "2025-2026",
    //     class_id: "2d154378",
    //     section_id: "2d154374",
    //     roll_number: 24,
    //     performance: {
    //       term1: {
    //         exams: {
    //           "2d154374": {
    //             exam_code: "PT",
    //             exam_name: "Periodic Test",
    //             max_marks: 10,
    //             pass_marks: 5,
    //             total_working_days: 183,
    //             total_days_present: 180,
    //             marks_details: [
    //               {
    //                 subject_name: "Maths",
    //                 marks_obtained: 7,
    //               },
    //               {
    //                 subject_name: "English",
    //                 marks_obtained: 4,
    //               },
    //               {
    //                 subject_name: "Hindi",
    //                 marks_obtained: 8,
    //               },
    //             ],
    //           },
    //         },
    //       },
    //       term2: {
    //         exams: {},
    //       },
    //     },
    //     remarks: "Aut tripudio vilis.",
    //   },
    // ];

    // const academic_Records = [
    //   {
    //     id: "3dd5eb92",
    //     student_id: "2d154321",
    //     name: "Diane Lowe 1",
    //     academic_year: "2025-2026",
    //     class_id: "2d154378",
    //     section_id: "2d154374",
    //     roll_number: 24,
    //     performance: [
    //       {
    //         session: "term1",
    //         exam_performance: [
    //           {
    //             exam_id: "",
    //             exam_code: "",
    //             exam_name: "",
    //             max_marks: "",
    //             pass_marks: "",
    //             total_working_days: "",
    //             total_days_present: "",
    //             marks_details: [
    //               {
    //                 subject_name: "",
    //                 marks_obtained: "",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         session: "term2",
    //         exam_performance: [
    //           {
    //             exam_id: "",
    //             exam_code: "",
    //             exam_name: "",
    //             max_marks: "",
    //             pass_marks: "",
    //             total_working_days: "",
    //             total_days_present: "",
    //             marks_details: [
    //               {
    //                 subject_name: "",
    //                 marks_obtained: "",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],

    //     remarks: "Aut tripudio vilis.",
    //   },
    // ];
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
          onClick={() => navigate("/schooladmin")}
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
            <strong>Update Marks</strong>
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

export default ManageMarks;
