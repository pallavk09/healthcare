import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridPaginationModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button, Modal, Typography, Box, Grid } from "@mui/material";

const CustomToolbar: React.FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const rows = [
  {
    id: 1,
    registrationId: 1001,
    studentName: "John Doe",
    guardianName: "Jane Doe",
    contact: "123-456-7890",
    status: "Pending",
  },
  {
    id: 2,
    registrationId: 1002,
    studentName: "Mary Jane",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    status: "Test Scheduled",
  },
  {
    id: 3,
    registrationId: 1003,
    studentName: "John Doe",
    guardianName: "Jane Doe",
    contact: "123-456-7890",
    status: "Pending",
  },
  {
    id: 4,
    registrationId: 1004,
    studentName: "Mary Jane",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    status: "Test Scheduled",
  },
  {
    id: 5,
    registrationId: 1005,
    studentName: "John Doe",
    guardianName: "Jane Doe",
    contact: "123-456-7890",
    status: "Pending",
  },
  {
    id: 6,
    registrationId: 1006,
    studentName: "Mary Jane",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    status: "Test Scheduled",
  },
  {
    id: 7,
    registrationId: 1007,
    studentName: "John Doe",
    guardianName: "Jane Doe",
    contact: "123-456-7890",
    status: "Pending",
  },
  {
    id: 8,
    registrationId: 1007,
    studentName: "Mary Jane",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    status: "Test Scheduled",
  },
  {
    id: 9,
    registrationId: 1009,
    studentName: "John Doe",
    guardianName: "Jane Doe",
    contact: "123-456-7890",
    status: "Pending",
  },
  {
    id: 10,
    registrationId: 1010,
    studentName: "Mary Jane",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    status: "Test Scheduled",
  },
];

// Example of summary counts (you would calculate these based on your data)
const totalRegistrations = rows.length;
const totalPending = rows.filter((row) => row.status === "Pending").length;
const totalScheduled = rows.filter(
  (row) => row.status === "Test Scheduled"
).length;
const totalCompleted = rows.filter(
  (row) => row.status === "Admission Completed"
).length;

// Create buttons with hover underline animation
const AnimatedButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
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
    >
      {label}
    </Button>
  );
};

const AdmissionDetails: React.FC = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedRegistration, setSelectedRegistration] =
    React.useState<any>(null);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  const handleOpenModal = (registration: any) => {
    setSelectedRegistration(registration);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAction = (action: string, registrationId: number) => {
    console.log(`${action} for Registration ID: ${registrationId}`);
  };

  // Define columns with DataGrid
  const columns: GridColDef[] = [
    { field: "registrationId", headerName: "Registration ID", width: 150 },
    { field: "studentName", headerName: "Student Name", width: 200 },
    { field: "guardianName", headerName: "Guardian Name", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "status", headerName: "Status", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      renderCell: (params) => (
        <>
          <AnimatedButton
            label="Approve"
            onClick={() => handleAction("Approve", params.row.id)}
          />
          <AnimatedButton
            label="Schedule Test"
            onClick={() => handleAction("Schedule Test", params.row.id)}
          />
          <AnimatedButton
            label="Confirm Admission"
            onClick={() => handleAction("Confirm Admission", params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={2}
        style={{ minHeight: "100vh" }}
      >
        {/**This summary on top */}
        <Grid container direction="row" spacing={1}>
          <Grid item xs={3}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#f0f4f7",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1">Total Registrations</Typography>
              <Typography variant="h4">{totalRegistrations}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ p: 2, backgroundColor: "#e0f7fa", borderRadius: "8px" }}>
              <Typography variant="body1">Pending</Typography>
              <Typography variant="h4">{totalPending}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ p: 2, backgroundColor: "#fff3e0", borderRadius: "8px" }}>
              <Typography variant="body1">Test Scheduled</Typography>
              <Typography variant="h4">{totalScheduled}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
                width: "13rem",
              }}
            >
              <Typography variant="body1">Admission Completed</Typography>
              <Typography variant="h4">{totalCompleted}</Typography>
            </Box>
          </Grid>
        </Grid>
        {/**This is Datagrid */}
        <Grid container direction="column" mt={4}>
          <Grid item xs={12}>
            <DataGrid
              rows={rows}
              columns={columns}
              // autoHeight
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel} // Controls pagination behavior
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              slots={{
                // toolbar: GridToolbar, // Enables search functionality and other features
                toolbar: CustomToolbar,
              }}
              sx={{
                maxWidth: "95vw",
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
                // Optional: Add hover effect on header
                // "& .MuiDataGrid-columnHeader:hover": {
                //   backgroundColor: "#1565c0", // Darker shade on hover
                // },
                // Add additional customization to cell hover effect
                // "& .MuiDataGrid-cell:hover": {
                //   backgroundColor: "#f5f5f5", // Light grey on cell hover
                // },
              }}
              onRowClick={(params) => handleOpenModal(params.row)}
            />

            {/* Modal for detailed info */}
            <Modal open={openModal} onClose={handleCloseModal}>
              <Box sx={{ ...modalStyle }}>
                {selectedRegistration && (
                  <>
                    <Typography variant="h6">Student Information</Typography>
                    <Typography variant="body1">
                      <strong>Student Name:</strong>{" "}
                      {selectedRegistration.studentName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Guardian Name:</strong>{" "}
                      {selectedRegistration.guardianName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Contact:</strong> {selectedRegistration.contact}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Status:</strong> {selectedRegistration.status}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleAction("Approve", selectedRegistration.id)
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        handleAction("Schedule Test", selectedRegistration.id)
                      }
                    >
                      Schedule Test
                    </Button>
                  </>
                )}
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default AdmissionDetails;
