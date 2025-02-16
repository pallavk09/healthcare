import React, { useRef, useState } from "react";
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
import { Button, Typography, Box, Grid, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";

import ProfileDialogStudentDetailsAdmin from "../../components/ProfileDialogStudentDetailsAdmin";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import ProfileDialogTeacherDetailsAdmin from "../../components/ProfileDialogTeacherDetailsAdmin";
import ProfileDialogTeacherCreds from "../../components/ProfileDialogTeacherCreds";

const rows = [
  {
    id: 1,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 2,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 3,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 4,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 5,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 6,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 7,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 8,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 9,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 10,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 11,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: "B.Tech",
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 13,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 14,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 15,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 16,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 17,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 18,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 19,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 20,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 21,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 22,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 23,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 24,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 25,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 26,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 27,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 28,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 29,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 30,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 31,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 32,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 33,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 34,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 35,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 36,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 37,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 38,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 39,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 40,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 41,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 42,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 43,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Pallav Kumar",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 44,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Ved Prakash",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 45,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aaryan Dev Singh",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 46,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Aarnav Tiwari",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "inactive",
  },
  {
    id: 47,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Gaurav Rajat",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
  {
    id: 48,
    teachersid: "stud123",
    adhaarid: "adm123",
    teacherName: "Jaikush Vishwakarma",
    class: 14,
    qualification: "B.Tech",
    contact: "8876754367",
    status: "active",
  },
];

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

const TeachersAdminData = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>(rows);

  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const resetFormRef = useRef<() => void>(() => {});

  const snackbarRef = useRef<SnackbarHandle>(null);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setProfileDialogOpen(false);
    setIsEditing(false);
  };

  const handleSaveProfile = async (data: any) => {
    console.log("Inside Handle Save Profile. With PhotoFile");
  };

  // Define columns with DataGrid
  const columns: GridColDef[] = [
    { field: "teachersid", headerName: "Teacher ID", flex: 1 },
    { field: "adhaarid", headerName: "Adhaar ID", flex: 1 },
    { field: "teacherName", headerName: "Teacher Name", flex: 2 },
    { field: "class", headerName: "Class", flex: 0.5 },
    { field: "qualification", headerName: "Qualification", flex: 0.5 },
    { field: "contact", headerName: "Contact", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.6,
      renderCell: (params) => (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              //   justifyContent: "center",
              gap: 1,
              backgroundColor:
                params.value === "active" ? "lightgreen" : "lightgray",
              borderRadius: 4,
              padding: "4px 8px",
              marginTop: 0.6,
              //   marginTop: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: params.value === "active" ? "green" : "gray",
              }}
            />
            <Typography variant="body2">{params.value}</Typography>
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
            label="View"
            onClick={() => {
              console.log("View Clicked");
              setProfileDialogOpen(true);
            }}
            disabled={false}
          />
          {"|"}
          <AnimatedButton
            label="Credentials"
            onClick={() => console.log("Assign Clicked")}
            disabled={false}
          />

          {"|"}
          <AnimatedButton
            label="DeActivate"
            onClick={() => console.log("Disabled Clicked")}
            disabled={false}
          />
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
          <MyCustomButton
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/schooladmin")}
          >
            Home
          </MyCustomButton>
          <MyCustomButton variant="contained" startIcon={<PersonAddIcon />}>
            ADD TEACHER
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

      <ProfileDialogTeacherDetailsAdmin
        isOpen={isProfileDialogOpen}
        onClose={onClose}
        onSubmit={handleSaveProfile}
        profileData={{}}
        resetFormRef={resetFormRef}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />

      {/* Need to generate all variables being passed here specifically for this Credential Manager */}
      {/* <ProfileDialogTeacherCreds
        isOpen={isProfileDialogOpen}
        onClose={onClose}
        onSubmit={handleSaveProfile}
        profileData={{}}
        resetFormRef={resetFormRef}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      /> */}
    </>
  );
};

export default TeachersAdminData;
