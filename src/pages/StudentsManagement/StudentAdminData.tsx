import React, { useEffect, useRef, useState, useCallback } from "react";
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
  GridValueGetter,
} from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Box,
  Grid,
  styled,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import ProfileDialogStudentDetailsAdmin from "../../components/ProfileDialogStudentDetailsAdmin";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import { students, students_empty } from "../../Config/students";
import { academic_records } from "../../Config/academic_records";
import ProfileDialogStudentPerformance from "../../components/ProfileDialogStudentPerformance";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { classes_records } from "../../Config/classes_records";
import { sections } from "../../Config/sections_records";
import {
  AddAcademicsRecord,
  AddStudent,
  GetAcademicsRecord,
  GetAcademicsRecordStudent,
  GetStudents,
  UpdateStudent,
} from "../../api/Students-Management/add-view-students";
import { Get as GetClass } from "../../api/Control-Settings/manage-class";
import { GetSections } from "../../api/Students-Management/manage-section";
import {
  GetSchedules,
  GetSchedulesForClass,
} from "../../api/Exams-Management/schedule-exam";
import { v4 as uuid } from "uuid";
import { GetExams } from "../../api/Exams-Management/new_exam";
import { deleteFile, uploadFile, UploadFileType } from "../../api/upload";

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

// Create buttons with hover underline animation
const AnimatedButton = ({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        position: "relative",
        // fontFamily: "Motiva Sans Bold",
        // fontWeight: "Bold",
        padding: "0 10px",
        fontSize: "14px",
        textTransform: "none",
        color: "#2e186a",
        "&:hover": {
          fontWeight: "Bold",
        },
        "&::after": {
          content: '""',
          fontWeight: "Bold",
          position: "absolute",
          width: "0",
          height: "2px",
          left: "0",
          bottom: "-2px",
          backgroundColor: "rgb(255, 130, 92)",
          transition: "width 0.3s ease-in-out",
        },
        "&:hover::after": {
          width: "100%", // Underline expands on hover
        },
      }}
      disabled={disabled == null ? true : disabled}
    >
      <strong>{label}</strong>
    </Button>
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

const StudentAdminData = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);

  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const resetFormRef = useRef<() => void>(() => {});

  const snackbarRef = useRef<SnackbarHandle>(null);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [addNewStudent, setAddNewStudent] = useState<boolean>(false);

  const [classList, setClassList] = useState<any>([]);
  const [sectionList, setSectionList] = useState<any>([]);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [studentList, setStudentList] = useState<any>([]);
  const [academiceRecordList, setAcademiceRecordList] = useState<any>([]);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setProfileDialogOpen(false);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          students_records,
          academic_records,
          classes_records,
          section_records,
        ] = await Promise.all([
          GetStudents(),
          GetAcademicsRecord(),
          GetClass(),
          GetSections(),
        ]);

        if (students_records && students_records.result.documents?.length > 0) {
          const student_string = students_records.result.documents;
          const student_json_parsed = JSONParseStudentObject(student_string);

          setApplications(student_json_parsed);
        }
        if (academic_records && academic_records.result.documents?.length > 0) {
          setAcademiceRecordList(academic_records.result.documents);
        }
        if (classes_records && classes_records.result.documents?.length > 0) {
          setClassList(classes_records.result.documents);
        }
        if (section_records && section_records.result.documents?.length > 0) {
          setSectionList(section_records.result.documents);
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

  const CreatePerformaceObj = (examsList: any, exam_schedules: any) => {
    try {
      const performance = {};

      // Iterate over each exam
      examsList.forEach((exam: any) => {
        const {
          session,
          exam_id,
          name,
          max_marks,
          pass_marks,
          total_working_days,
        } = exam;

        // Initialize the session if not present
        //@ts-ignore
        if (!performance[session]) {
          //@ts-ignore
          performance[session] = { exams: {} };
        }

        // Find the corresponding exam schedule
        const schedule = exam_schedules.find(
          (sched: any) => sched.exam_id === exam_id
        );

        // Extract subjects from the schedule
        let marks_details = [];
        let totalMarks = 0;
        let totalPassMarks = 0;

        if (schedule) {
          const subjects = JSON.parse(schedule.exam_schedule);
          marks_details = subjects.map((subject: any) => {
            totalMarks += Number(max_marks); // Accumulate max marks
            totalPassMarks += Number(pass_marks); // Accumulate pass marks

            return {
              subject_name: subject.subject,
              marks_obtained: 0, // Default value
              subject_max_marks: Number(max_marks),
              subject_pass_marks: Number(pass_marks),
            };
          });
        }

        // Populate exam details
        //@ts-ignore
        performance[session].exams[exam_id] = {
          exam_name: name,
          max_marks: totalMarks, // Sum of all subjects' max marks
          pass_marks: totalPassMarks, // Sum of all subjects' pass marks
          total_marks_obtained: 0, // Will be sum of marks_obtained for all subjects
          total_working_days: total_working_days,
          total_days_present: 0, // Default value
          marks_details,
        };
      });

      return performance;
    } catch (error) {
      console.log("Error getting Performance object");
      console.log(error);
      return {};
    }
  };

  const JSONParseStudentObject = (student_string: any) => {
    try {
      const student_json_parsed = student_string.map((stud: any) => ({
        ...stud,
        transport_details: JSON.parse(stud.transport_details),
        personal_details: JSON.parse(stud.personal_details),
        guardian_details: JSON.parse(stud.guardian_details),
        father_details: JSON.parse(stud.father_details),
        mother_details: JSON.parse(stud.mother_details),
        previous_school: JSON.parse(stud.previous_school),
      }));

      return student_json_parsed;
    } catch (error) {
      console.log("Error JSON parsing student object");
      console.log(error);
      return [];
    }
  };

  const updateData = (data: any, updatedRecord: any) => {
    return data.map((record: any) => {
      return record.student_id === updatedRecord.student_id
        ? updatedRecord
        : record;
    });
  };

  const handleSaveProfile = async (data: any) => {
    try {
      if (data) {
        setAdding(true);
        console.log("Student data received to be added to DB");
        console.log(data);

        if (addNewStudent) {
          console.log("New Registration");
          let academic_records_obj = {};
          //Check if exams already scheduled
          const payload = {
            class_id: data.class_id,
          };
          const exam_schedules = await GetSchedulesForClass(payload);

          console.log("examSchedules");
          console.log(exam_schedules);

          if (exam_schedules && exam_schedules.result.documents.length > 0) {
            console.log("exam already scheduled");
            const examsList = await GetExams();

            const performance = CreatePerformaceObj(
              examsList.result.documents,
              exam_schedules.result.documents
            );

            console.log("Performace Object created");
            console.log(performance);

            const _id = uuid().slice(0, 5);
            academic_records_obj = {
              id: _id,
              academic_record_id: _id,
              student_id: data.student_id,
              name: data.personal_details.name,
              academic_year: "2025-2026",
              class_id: data.class_id,
              class_name: data.class_name,
              section_id: data.section_id,
              section: data.section_name,
              roll_number: parseInt(data.roll_number),
              performance: JSON.stringify(performance),
              user: "Pallav",
            };

            console.log("academic_records_obj Object created");
            console.log(academic_records_obj);

            //If Scheduled then create one academic_record with exam and marks and other placeholders details
          } else {
            //If Not scheduled then create standard academic_record
            console.log("exam not scheduled");
            const _id = uuid().slice(0, 5);
            academic_records_obj = {
              id: _id,
              academic_record_id: _id,
              student_id: data.student_id,
              name: data.personal_details.name,
              academic_year: "2025-2026",
              class_id: data.class_id,
              class_name: data.class_name,
              section_id: data.section_id,
              section: data.section_name,
              roll_number: parseInt(data.roll_number),
              user: "Pallav",
              performance: JSON.stringify({
                term1: {
                  exams: {},
                },
                term2: {
                  exams: {},
                },
              }),
            };

            console.log("academic_records_obj Object created");
            console.log(academic_records_obj);
          }

          const uploadFileObject: UploadFileType = {
            filepath: data.photofile!,
            bucket_id: process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
          };
          const upload = await uploadFile(uploadFileObject);

          console.log("Photo uploaded.");
          const photoUrl = upload?.$id || "";
          console.log(photoUrl);

          const student_item = {
            ...data,
            roll_number: parseInt(data.roll_number),
            photoUrl: photoUrl,
            discount: data.discount || "0",
            transport_details: JSON.stringify(data.transport_details),
            personal_details: JSON.stringify(data.personal_details),
            guardian_details: JSON.stringify(data.guardian_details),
            father_details: JSON.stringify(data.father_details),
            mother_details: JSON.stringify(data.mother_details),
            previous_school: JSON.stringify(data.previous_school),
            user: "pallav",
          };
          console.log("Student to be saved in DB");
          console.log(student_item);

          const addNewItem = await AddStudent(student_item);
          if (addNewItem && addNewItem.result) {
            console.log("Student saved in DB");
            const addNewItem_acad_record = await AddAcademicsRecord(
              academic_records_obj
            );
            if (addNewItem_acad_record && addNewItem_acad_record.result) {
              console.log("Academic record saved in DB");
              const jsonParsedStudent = JSONParseStudentObject([
                addNewItem.result,
              ]);
              setApplications([...applications, jsonParsedStudent[0]]);
              snackbarRef.current?.showSnackbar(
                `Student Added And Academics Updated`,
                "success"
              );
            } else {
              snackbarRef.current?.showSnackbar(
                `Academic Record Creation Failed.`,
                "error"
              );
            }
          } else {
            snackbarRef.current?.showSnackbar(`Student Not Added`, "error");
          }
        } else {
          console.log("Update Student");
          let student_item_updated = {};
          let photoUrl_new;
          //Update Photo if needed
          if (data.photofile) {
            console.log("New Photo added");
            const photoUrl_old = data.photoUrl;
            const uploadFileObject: UploadFileType = {
              filepath: data.photofile!,
              bucket_id:
                process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
            };
            const upload = await uploadFile(uploadFileObject);

            console.log("Photo uploaded.");

            photoUrl_new = upload?.$id || "";
            try {
              const delete_photoUrl = await deleteFile(
                process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
                photoUrl_old
              );
              if (delete_photoUrl)
                console.log("PhotoUrl has been removed from DB", photoUrl_old);
            } catch (error) {
              console.log("Error while deleting old photoUrl");
            }

            student_item_updated = {
              ...data,
              id: data.student_id,
              roll_number: parseInt(data.roll_number),
              photoUrl: photoUrl_new, //Updated photoUrl for updated photo
              discount: data.discount || "0",
              transport_details: JSON.stringify(data.transport_details),
              personal_details: JSON.stringify(data.personal_details),
              guardian_details: JSON.stringify(data.guardian_details),
              father_details: JSON.stringify(data.father_details),
              mother_details: JSON.stringify(data.mother_details),
              previous_school: JSON.stringify(data.previous_school),
              user: "pallav",
            };
          } else {
            student_item_updated = {
              ...data,
              id: data.student_id,
              roll_number: parseInt(data.roll_number),
              discount: data.discount || "0",
              transport_details: JSON.stringify(data.transport_details),
              personal_details: JSON.stringify(data.personal_details),
              guardian_details: JSON.stringify(data.guardian_details),
              father_details: JSON.stringify(data.father_details),
              mother_details: JSON.stringify(data.mother_details),
              previous_school: JSON.stringify(data.previous_school),
              user: "pallav",
            };
          }

          //Call API to update student
          console.log("Student to be updated");
          console.log(student_item_updated);
          const updateItem = await UpdateStudent(student_item_updated);
          //Call API to update academic records with class_name, class_id, section, section_id --- NOT NEEDED AS OF NOW
          if (updateItem && updateItem.result) {
            setApplications(
              updateData(applications, {
                ...data,
                photoUrl: photoUrl_new || data.photoUrl,
              })
            );
            snackbarRef.current?.showSnackbar(
              `Record has been updated`,
              "success"
            );
          } else {
            snackbarRef.current?.showSnackbar(`Item not updated`, "error");
          }
        }
      } else {
        console.log("Student data not received from modal");
      }
    } catch (error) {
      snackbarRef.current?.showSnackbar(`Error While Saving Record`, "error");
    } finally {
      setAdding(false);
    }
  };

  const handleViewClick = useCallback(async (rowData: any) => {
    console.log("View Clicked", rowData.student_id);
    let academic_record_student_array = [];
    const payload = {
      student_id: rowData.student_id,
    };
    const academic_record_response = await GetAcademicsRecordStudent(payload);
    if (
      academic_record_response.result &&
      Object.entries(academic_record_response.result.documents[0].length > 0)
    ) {
      const academic_record_student = {
        academic_record_id:
          academic_record_response.result.documents[0].academic_record_id,
        student_id: academic_record_response.result.documents[0].student_id,
        name: academic_record_response.result.documents[0].name,
        academic_year:
          academic_record_response.result.documents[0].academic_year,
        class_id: academic_record_response.result.documents[0].class_id,
        class_name: academic_record_response.result.documents[0].class_name,
        section_id: academic_record_response.result.documents[0].section_id,
        section: academic_record_response.result.documents[0].section,
        roll_number: academic_record_response.result.documents[0].roll_number,
        performance: JSON.parse(
          academic_record_response.result.documents[0].performance || []
        ),
        remarks: academic_record_response.result.documents[0].remarks,
      };
      academic_record_student_array.push(academic_record_student);
    }

    const student_full_Data = {
      ...rowData,
      academic_records: academic_record_student_array,
    };

    setProfileDialogOpen(true);
    setAddNewStudent(false);
    setSelectedRow(student_full_Data);
    console.log("Row Data:", student_full_Data);

    // Slightly defer setting selectedRow to prevent blocking UI rendering
    // setTimeout(() => {
    //   // setSelectedRow(rowData);
    //   setSelectedRow(student_full_Data);
    //   console.log("Row Data:", student_full_Data);
    // }, 0); // Delay execution until the next event loop cycle
  }, []);

  const handleAddNewStudent = () => {
    console.log("Add New Student Clicked");
    setProfileDialogOpen(true);
    setAddNewStudent(true);
  };

  // Define columns with DataGrid
  const columns: GridColDef[] = [
    { field: "admission_id", headerName: "Admission ID", flex: 1 },
    {
      field: "personal_details",
      headerName: "Name",
      flex: 1,
      valueGetter: (_, row) => row.personal_details.name,
    },
    {
      field: "parent_details",
      headerName: "Father's Name",
      flex: 1,
      valueGetter: (_, row) => row.father_details.name,
    },
    {
      field: "class",
      headerName: "Class",
      flex: 1,
      valueGetter: (_, row) => row.class_name,
      // valueGetter: (_, row) => {
      //   const classItem = classList.find(
      //     (item: any) => item.class_id === row.academic_records[0]?.class_id
      //   );

      //   if (classItem) return classItem.name;
      // },
    },
    {
      field: "Section",
      headerName: "Section",
      flex: 0.5,
      valueGetter: (_, row) => row.section_name,
      // valueGetter: (_, row) => {
      //   const sectionItem = sectionList.find(
      //     (item: any) => item.section_id === row.academic_records[0]?.section_id
      //   );

      //   if (sectionItem) return sectionItem.name;
      // },
    },
    {
      field: "roll_number",
      headerName: "Roll No.",
      flex: 0.5,
      valueGetter: (_, row) => row.roll_number,
      // valueGetter: (_, row) => row.academic_records[0]?.roll_number,
    },

    {
      field: "parent_contact",
      headerName: "Contact",
      flex: 1,
      valueGetter: (_, row) =>
        row.father_details.contact ||
        row.mother_details.contact ||
        row.guardian_details.contact,
    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 1,
              backgroundColor:
                params.row.is_active === "active" ? "#00c9a6" : "lightgray",
              borderRadius: 4,
              padding: "4px 8px",
              marginTop: 0.6,
              //   marginTop: 1,
            }}
          >
            <Box
              display={"flex"}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  params.row.is_active === "active" ? "green" : "gray",
              }}
            />
            <Typography variant="body2">
              {params.row.is_active === "active" ? "Active" : "In-Active"}
            </Typography>
          </Box>
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <AnimatedButton
            label="Details"
            onClick={() => {
              handleViewClick(params.row);
            }}
            disabled={false}
          />
          {/* {"|"}
          <AnimatedButton
            label="Performance"
            onClick={() => setPerformanceDialogOpen(true)}
            disabled={false}
          /> */}
          {/* {"|"}
          <AnimatedButton
            label="TC"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          /> */}
          {/* {"|"}
          <AnimatedButton
            label="Character"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          /> */}
          {/* {"|"}
          <AnimatedButton
            label="DeActivate"
            onClick={() => console.log("Disabled Clicked")}
            disabled={false}
          /> */}
        </>
      ),
    },
  ];

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />

      <Box
        display={"flex"}
        flexDirection={"column"}
        p={2}
        height="auto"
        // style={{ minHeight: "100vh" }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          {/* <Typography variant="body1">
            <span>
              <strong>Total Students Count: </strong>
            </span>
            {"6"}
          </Typography> */}
          {/* <MyCustomButton
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/home")}
          >
            Home
          </MyCustomButton> */}
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
          <MyCustomButton
            variant="contained"
            startIcon={adding ? <CircularProgress /> : <PersonAddIcon />}
            onClick={handleAddNewStudent}
            disabled={adding}
          >
            {adding ? "...WAIT" : "NEW STUDENT"}
          </MyCustomButton>
        </Box>

        <Typography variant="body2" sx={{ alignSelf: "center", mb: -3 }}>
          <strong> {`STUDENT COUNT : ${applications.length || 0}`}</strong>
        </Typography>

        {/**This is Datagrid */}
        <Grid container direction="column" mt={4}>
          <Grid item xs={12}>
            <DataGrid
              rows={applications}
              columns={columns}
              rowHeight={40}
              getRowId={(row) => row.student_id}
              loading={loading}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel} // Controls pagination behavior
              pageSizeOptions={[50, 100, 150]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              slots={{
                toolbar: GridToolbar,
                noRowsOverlay: () => <CustomNoRowsOverlay loading={loading} />,
              }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              //   slots={{
              //     // toolbar: GridToolbar, // Enables search functionality and other features
              //     toolbar: CustomToolbar,
              //   }}
              sx={{
                maxWidth: "98vw",
                height: "65vh", // Fixed height for the grid
                // Target the column headers specifically

                "& .MuiDataGrid-row:hover": {
                  transform: "scale(1)", // Hover zoom effect
                  backgroundColor: "#f5f5f5", // Light background on hover
                  "& .MuiDataGrid-cell": {
                    color: "#2E186A", // Change text color on hover
                    fontWeight: "bold", // Bold text on hover
                  },
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "#f0f0f0", // Active row background color
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1e88e5", // Custom background color for header
                  // fontFamily: "Motiva Sans Bold",
                  color: "#2e186a", // Custom text color for header
                  fontSize: "1rem", // Increase font size of header
                  borderBottom: "2px solid #fff", // Add a border at the bottom of headers
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  textOverflow: "clip", // Prevent ellipsis from appearing
                  whiteSpace: "normal", // Ensure text wraps if it's too long
                  lineHeight: "1", // Adjust line height
                },
                "& .MuiDataGrid-columnHeader": {
                  padding: "0px 10px", // Add padding to header cells
                },
              }}
              // onRowClick={(params) => handleOpenModal(params.row)}
              //   onCellClick={(params) => {
              //     // Exclude the "actions" column from opening the modal
              //     if (params.field !== "actions") {
              //       console.log("Cell Clicked");
              //     }
              //   }}
            />
          </Grid>
        </Grid>
      </Box>

      {isProfileDialogOpen && (
        <ProfileDialogStudentDetailsAdmin
          isOpen={isProfileDialogOpen}
          onClose={onClose}
          onSubmit={handleSaveProfile}
          profileData={addNewStudent ? students_empty[0] : selectedRow}
          // profileData={addNewStudent ? {paste data from student.ts} : selectedRow}
          resetFormRef={resetFormRef}
          isEditing={addNewStudent ? true : isEditing}
          onEdit={() => setIsEditing(true)}
          addSibling={addNewStudent}
        />
      )}
    </>
  );
};

export default React.memo(StudentAdminData);
