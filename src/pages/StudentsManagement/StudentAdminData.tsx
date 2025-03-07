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
import { Button, Typography, Box, Grid, styled } from "@mui/material";
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

const rows = students;

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
  const [isPerformanceDialogOpen, setPerformanceDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const resetFormRef = useRef<() => void>(() => {});

  const snackbarRef = useRef<SnackbarHandle>(null);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [addNewStudent, setAddNewStudent] = useState<boolean>(false);

  const [classList, setClassList] = useState<any>([]);
  const [sectionList, setSectionList] = useState<any>([]);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setProfileDialogOpen(false);
    setIsEditing(false);
  };

  const onClosePerformanceDialog = () => {
    setPerformanceDialogOpen(false);
  };

  useEffect(() => {
    const mergedStudents = students.map((student) => {
      const studentAcademicRecords = academic_records
        .filter((record) => record.student_id === student.student_id)
        .sort((a, b) => b.academic_year.localeCompare(a.academic_year)); // Sort by academic_year in descending order

      return {
        ...student,
        academic_records: studentAcademicRecords,
      };
    });
    console.log(mergedStudents);

    setApplications(mergedStudents);
  }, []);

  useEffect(() => {
    if (
      classes_records &&
      classes_records.length > 0 &&
      sections &&
      sections.length > 0
    ) {
      setClassList(classes_records);
      setSectionList(sections);
    }
  }, [classes_records, sections]);

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
        console.log("Student data received to be added to DB");
        console.log(data);
        addNewStudent
          ? setApplications([...applications, data])
          : setApplications(updateData(applications, data));

        snackbarRef.current?.showSnackbar(`Record has been updated`, "success");
      } else {
        console.log("Student data not received from modal");
      }
    } catch (error) {
      snackbarRef.current?.showSnackbar(`Error While Saving Record`, "error");
    }
  };

  const handleViewClick = useCallback((rowData: any) => {
    console.log("View Clicked");
    setProfileDialogOpen(true); // Open the dialog immediately
    setAddNewStudent(false);

    // Slightly defer setting selectedRow to prevent blocking UI rendering
    setTimeout(() => {
      setSelectedRow(rowData);
      console.log("Row Data:", rowData);
    }, 0); // Delay execution until the next event loop cycle
  }, []);

  // const handleViewClick = (rowData: any) => {
  //   console.log("View Clicked");
  //   setProfileDialogOpen(true);
  //   setAddNewStudent(false);
  //   setSelectedRow(rowData);
  //   console.log("Row Data:", rowData);
  // };

  const handleAddNewStudent = () => {
    console.log("Add New Student Clicked");
    setProfileDialogOpen(true);
    setAddNewStudent(true);
  };

  // Define columns with DataGrid
  const columns: GridColDef[] = [
    // { field: "student_id", headerName: "Student ID", flex: 1 },
    // { field: "admission_id", headerName: "Admission ID", flex: 1 },
    {
      field: "personal_details",
      headerName: "Student Name",
      flex: 1,
      valueGetter: (_, row) => row.personal_details.name,
    },
    {
      field: "class",
      headerName: "Class",
      flex: 0.5,
      valueGetter: (_, row) => {
        const classItem = classList.find(
          (item: any) => item.class_id === row.academic_records[0]?.class_id
        );

        if (classItem) return classItem.name;
      },
    },
    {
      field: "Section",
      headerName: "Section",
      flex: 0.5,
      valueGetter: (_, row) => {
        const sectionItem = sectionList.find(
          (item: any) => item.section_id === row.academic_records[0]?.section_id
        );

        if (sectionItem) return sectionItem.name;
      },
    },
    {
      field: "roll_number",
      headerName: "Roll No.",
      flex: 0.5,
      valueGetter: (_, row) => row.academic_records[0]?.roll_number,
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
      flex: 0.5,
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
      flex: 3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <AnimatedButton
            label="View"
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
          {"|"}
          <AnimatedButton
            label="TC"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          />
          {"|"}
          <AnimatedButton
            label="Character"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          />
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
            startIcon={<PersonAddIcon />}
            onClick={handleAddNewStudent}
          >
            NEW STUDENT
          </MyCustomButton>
        </Box>

        {/**This is Datagrid */}
        <Grid container direction="column" mt={4}>
          <Grid item xs={12}>
            <DataGrid
              rows={applications}
              columns={columns}
              rowHeight={40}
              //   autoHeight
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel} // Controls pagination behavior
              pageSizeOptions={[50, 100, 150]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              slots={{
                toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
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
