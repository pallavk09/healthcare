import React, { useCallback, useEffect, useRef, useState } from "react";
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

import ToastSnackbar, {
  SnackbarHandle,
} from "../../../common/ToastNotification";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import ProfileDialogTeacherDetailsAdmin from "../../../components/ProfileDialogTeacherDetailsAdmin";
import ProfileDialogTeacherCreds from "../../../components/ProfileDialogTeacherCreds";

import { teachers_data, teachers_empty } from "../../../Config/teachers";

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
  const [teachers, setTeachers] = useState<any>([]);
  const [addNewTeacher, setAddNewTeacher] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});

  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const resetFormRef = useRef<() => void>(() => {});

  const snackbarRef = useRef<SnackbarHandle>(null);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  useEffect(() => {
    teachers_data && teachers_data.length > 0 && setTeachers(teachers_data);
  }, [teachers_data]);

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setProfileDialogOpen(false);
    setIsEditing(false);
  };

  const updateData = (data: any, updatedRecord: any) => {
    return data.map((record: any) => {
      return record.teacher_id === updatedRecord.teacher_id
        ? updatedRecord
        : record;
    });
  };

  const handleSaveProfile = async (data: any) => {
    try {
      if (data) {
        console.log("Student data received to be added to DB");
        console.log(data);
        addNewTeacher
          ? setTeachers([...teachers, data])
          : setTeachers(updateData(teachers, data));

        snackbarRef.current?.showSnackbar(`Record has been updated`, "success");
      } else {
        console.log("Student data not received from modal");
      }
    } catch (error) {
      snackbarRef.current?.showSnackbar(`Error While Saving Record`, "error");
    }
  };

  const handleAddNewTeacher = () => {
    console.log("Add New Teacher Clicked");
    setProfileDialogOpen(true);
    setAddNewTeacher(true);
  };

  const handleViewClick = useCallback((rowData: any) => {
    console.log("View Clicked");
    setProfileDialogOpen(true); // Open the dialog immediately
    setAddNewTeacher(false);

    // Slightly defer setting selectedRow to prevent blocking UI rendering
    setTimeout(() => {
      setSelectedRow(rowData);
      console.log("Row Data:", rowData);
    }, 0);
  }, []);

  // Define columns with DataGrid
  const columns: GridColDef[] = [
    {
      field: "personal_details",
      headerName: "Name",
      flex: 1,
      valueGetter: (_, row) => row?.personal_details?.name || "N/A",
    },
    { field: "adhaar", headerName: "Adhaar ID", flex: 1 },
    { field: "oasis_id", headerName: "Oasis ID", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 0.5 },
    { field: "type", headerName: "Catagory", flex: 0.5 },
    // {
    //   field: "personal_details",
    //   headerName: "Contact",
    //   flex: 1,
    //   valueGetter: (_, row) => row.personal_details.contact,
    // },
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
              padding: "4px 4px",
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
            label="View"
            onClick={() => {
              console.log("View Clicked");
              handleViewClick(params.row);
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
            label="Class Assignment"
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
          <MyCustomButton
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/home")}
          >
            Home
          </MyCustomButton>
          <MyCustomButton
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAddNewTeacher}
          >
            ADD TEACHER
          </MyCustomButton>
        </Box>

        {/**This is Datagrid */}
        <Grid container direction="column" mt={4}>
          <Grid item xs={12}>
            <DataGrid
              rows={teachers}
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
          </Grid>
        </Grid>
      </Box>

      {isProfileDialogOpen && (
        <ProfileDialogTeacherDetailsAdmin
          isOpen={isProfileDialogOpen}
          onClose={onClose}
          onSubmit={handleSaveProfile}
          profileData={addNewTeacher ? teachers_empty[0] : selectedRow}
          resetFormRef={resetFormRef}
          isEditing={addNewTeacher ? true : isEditing}
          onEdit={() => setIsEditing(true)}
          addSibling={addNewTeacher}
        />
      )}

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

export default React.memo(TeachersAdminData);
