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
  GridRenderEditCellParams,
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
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const [sectionList, setSectionList] = useState<any>([]);
  const [classRecords, setClassRecords] = useState<any>([]);
  const [exams, setExams] = useState<any>([]);
  const [examSession, setExamSession] = useState(undefined);
  const [rows, setRows] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [examRecords, setexamRecords] = useState<any>([]);
  const [subjects, setSubjects] = useState<any>([]);
  const [subject_max_marks, setSubject_max_marks] = useState<any>([]);
  const [searchState, setSearchState] = useState<any>({
    session: "",
    exam_id: "",
    class_id: "",
    section_id: "",
  });
  const [saveMarks, setSaveMarks] = useState(false);

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
  const handleValueChange = (id: string, field: string, value: any) => {
    console.log(id, field, value);
    if (value > subject_max_marks) {
      snackbarRef.current?.showSnackbar(
        `Cannot Be More Than Max Marks`,
        "error"
      );
      return;
    }

    if (parseInt(value) < 0) {
      snackbarRef.current?.showSnackbar(`Invalid Marks`, "error");
      return;
    }

    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  let columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      editable: false,
    },
    {
      field: "roll_number",
      headerName: "Roll Number",
      flex: 1,
      editable: false,
    },
    {
      field: "max_marks",
      headerName: "Max Marks",
      flex: 1,
      editable: false,
    },
    {
      field: "pass_marks",
      headerName: "Pass Marks",
      flex: 1,
      editable: false,
    },
    ...subjects.map((subject: any) => ({
      field: subject,
      headerName: subject,
      width: 120,
      type: "number",
      renderCell: (params: any) => (
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
    })),
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

  const onResetHandler = () => {
    reset({
      session: "",
      exam_id: "",
      class_id: "",
      section_id: "",
    });
    setRows([]);
  };

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
        // console.log(academic_records_list.result.documents);
        // console.log(
        //   JSON.parse(academic_records_list.result.documents[0].performance)
        // );

        const students = academic_records_list.result.documents.map(
          (item: any) => ({
            ...item,
            performance: JSON.parse(item.performance),
          })
        );

        const firstStudent = students.find(
          //@ts-ignore
          (student) => student.performance?.[session]?.exams?.[exam_id]
        );
        const marksDetails =
          //@ts-ignore
          firstStudent?.performance?.[session]?.exams?.[exam_id]
            ?.marks_details || [];

        const subjects = marksDetails.map((m: any) => m.subject_name);
        const subjectMaxMarks = marksDetails[0]?.subject_max_marks || 0;
        const subjectPassMarks = marksDetails[0]?.subject_pass_marks || 0;

        const student_mapped = students.map((student: any) => {
          //@ts-ignore
          const exam = student.performance?.[session]?.exams?.[exam_id] || {};
          const marksDetails = exam.marks_details || [];

          return {
            ...student,
            id: student.academic_record_id,
            // name: student.name,
            // roll_number: student.roll_number,
            max_marks: subjectMaxMarks, // Total max marks
            pass_marks: subjectPassMarks, // Total pass marks
            ...Object.fromEntries(
              marksDetails.map((m: any) => [m.subject_name, m.marks_obtained])
            ),
          };
        });
        setSubjects(subjects);
        setSearchState(data);
        setSubject_max_marks(subjectMaxMarks);
        console.log("student_mapped");
        console.log(student_mapped);
        setRows(student_mapped);
      }
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

      // const flatMappedExamData = flattenAcademicRecords(academic_records);
      // console.log("flatMappedExamData");
      // console.log(flatMappedExamData);

      // setRows(flatMappedExamData);
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const HandleSessionChange = (event: any) => {
    console.log("Session Change Event");
    console.log(event.target.value);
    setExamSession(event.target.value);
  };

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

  const handleSave = async () => {
    try {
      setSaveMarks(true);
      console.log("Saved data:", rows);
      const student_json_performance = rows.map((student: any) => {
        const updatedStudent = { ...student };
        const exam =
          updatedStudent.performance?.[searchState.session]?.exams?.[
            searchState.exam_id
          ];
        if (exam && exam.marks_details) {
          // Update marks_obtained for each subject
          exam.marks_details.forEach((subject: any) => {
            if (updatedStudent[subject.subject_name] !== undefined) {
              subject.marks_obtained = Number(
                updatedStudent[subject.subject_name]
              ); // Convert to number
            }
          });
          exam.total_marks_obtained = exam.marks_details.reduce(
            //@ts-ignore
            (sum, subject) => sum + subject.marks_obtained,
            0
          );
        }

        const updated_performance_obj = {
          id: updatedStudent.academic_record_id,
          performance: JSON.stringify(updatedStudent.performance),
        };

        return updated_performance_obj;
      });

      console.log(student_json_performance);
      const payload = {
        user: "pallav",
        arrayOfItems: student_json_performance,
      };

      const response = await UpdateMultipleAcademicRecords(payload);

      if (response.status === "SUCCESS") {
        snackbarRef.current?.showSnackbar(`Marks Updated.`, "success");
      } else {
        snackbarRef.current?.showSnackbar(`Marks Not Updated.`, "warning");
      }
    } catch (error) {
      console.log("Exception Occured");
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error Occured`, "error");
    } finally {
      setSaveMarks(false);
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
            <strong>Update Marks</strong>
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
                    // onCellEditStop={handleEditCellChange}
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
              )}
              {rows && rows.length > 0 && (
                <MyCustomButton
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    width: "20%",
                    height: "70%",
                    alignSelf: "center",
                    mt: 2,
                  }}
                  startIcon={saveMarks ? <CircularProgress size={20} /> : null}
                  disabled={saveMarks}
                >
                  {saveMarks ? "" : "Update Marks"}
                </MyCustomButton>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ManageMarks;
