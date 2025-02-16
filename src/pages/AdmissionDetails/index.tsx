import React, { useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridPaginationModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridOverlay,
} from "@mui/x-data-grid";
import {
  Button,
  Modal,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";
import {
  ListAllApplications,
  ScheduleInterview,
  UpdateApplicationStatus,
} from "../../api/newAdmission";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import { MyCustomButton } from "../../common/MyCustomControls";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";
import NewAdmissionForm from "../../components/Services/NewAdmission";
import Header from "../../components/Header";

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

// const CustomToolbar: React.FC = () => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarFilterButton />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// };

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
      {label}
    </Button>
  );
};

const AdmissionDetails: React.FC = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedRegistration, setSelectedRegistration] =
    React.useState<any>(null);
  const [applications, setApplications] = useState<any>();
  const [totalRegistrations, setTotalRegistrations] = useState<number>(0);
  const [totalPending, setTotalPending] = useState<any>();
  const [totalScheduled, setTotalScheduled] = useState<any>();
  const [totalCompleted, setTotalCompleted] = useState<any>();
  const [open, setOpen] = useState(false);
  const [actionName, setActionName] = useState<string>();
  const [dialogTitle, setDialogTitle] = useState<string>();
  const [dialogSubTitle, setDialogSubTitle] = useState<string>();
  const [selectedAppId, setSelectedAppId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>("");
  const [isAdmissionDialogOpen, setAdmissionDialogOpen] =
    useState<boolean>(false);

  const [applicationData, setApplicationData] = useState<any>();

  const resetFormRef = useRef<() => void>(() => {});

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
  ];

  const snackbarRef = useRef<SnackbarHandle>(null);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  const handleOpenModal = (registration: any) => {
    console.log(`registration:`);
    console.log(registration);
    // setSelectedRegistration(registration);
    const formData = {
      ...registration,
      applicationData: JSON.stringify(registration.applicationData),
    };
    setApplicationData(formData);
    setAdmissionDialogOpen(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAction = (action: string, registrationId: number) => {
    console.log(`${action} for Registration ID: ${registrationId}`);
    if (action === "Verify") {
      setDialogTitle("Verify Application");
      setDialogSubTitle(
        "Confirm if application is valid and you want to proceed?"
      );
      setActionName("Verify");
      setSelectedAppId(registrationId);
      setOpen(true);
    }
    if (action === "Interview") {
      setDialogTitle("Schedule Interview");
      setDialogSubTitle("");
      setActionName("Interview");
      setSelectedAppId(registrationId);
      setOpen(true);
    }
    if (action === "Interview Scheduled") {
      setActionName("Interview Scheduled");
      const rowObj = applications.filter(
        (row: any) => row.id === registrationId
      );
      console.log(`Row found: ${rowObj[0].interview}`);
      console.log(rowObj);
      setDialogTitle("Interview has been scheduled");
      setDialogSubTitle(`Student to visit school on ${rowObj[0].interview}`);

      setSelectedAppId(registrationId);
      setOpen(true);
    }
  };

  // Define columns with DataGrid
  const columns: GridColDef[] = [
    { field: "applicationId", headerName: "Application ID", flex: 1 },
    { field: "studentName", headerName: "Student Name", flex: 1 },
    // { field: "guardianName", headerName: "Guardian Name", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <AnimatedButton
            label={params.row.status === "Interview" ? "Verified" : "Verify"}
            onClick={() => handleAction("Verify", params.row.id)}
            disabled={params.row.status === "Verification" ? false : true}
          />
          {"|"}
          <AnimatedButton
            label={
              params.row.status === "Interview Scheduled"
                ? "View Slot"
                : "Interview"
            }
            onClick={() => handleAction(params.row.status, params.row.id)}
            disabled={
              params.row.status === "Interview" ||
              params.row.status === "Interview Scheduled"
                ? false
                : true
            }
          />
          {"|"}
          <AnimatedButton
            label="Select"
            onClick={() => handleAction("Confirm Selection", params.row.id)}
            disabled={
              params.row.status === "Interview Scheduled" ? false : true
            }
          />
          {"|"}
          <AnimatedButton
            label="Reject"
            onClick={() => handleAction("Reject Selection", params.row.id)}
            disabled={
              params.row.status === "Interview Scheduled" ? false : true
            }
          />
        </>
      ),
    },
  ];

  const formatRows = (data: any) => {
    console.log("Data Received as");
    console.log(data);
    let formattedRows = [];
    for (let rowdata of data) {
      const detailsObj = JSON.parse(rowdata.applicationData);
      let rowObject = {
        id: rowdata.$id,
        interview: rowdata.interview,
        applicationId: rowdata.applicationId,
        studentName: detailsObj.studentFullName,
        guardianName: detailsObj.fatherName,
        contact: detailsObj.fatherEmail,
        status: rowdata.currentStatus,
        applicationData: detailsObj,
        submissionDate: rowdata.submissionDate,
        photoUrl: rowdata.photoUrl,
      };
      rowdata.currentStatus && formattedRows.push(rowObject);
    }

    return formattedRows;
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const LoadAllApplications = async () => {
      try {
        console.log(`Calling ListAllApplications`);
        const applicationList = await ListAllApplications();
        if (applicationList?.result && applicationList?.result.length > 0) {
          const rows = formatRows(applicationList?.result);
          console.log("Formatted Rows");
          console.log(rows);
          // Example of summary counts (you would calculate these based on your data)
          const totalRegistrations = rows.length;
          const totalPending = rows.filter(
            (row) => row.status === "Verification"
          ).length;
          const totalScheduled = rows.filter(
            (row) =>
              row.status === "Interview" || row.status === "Interview Scheduled"
          ).length;
          const totalCompleted = rows.filter(
            (row) => row.status === "Selected"
          ).length;

          console.log("All Applications List");
          console.log(rows);
          setTotalRegistrations(totalRegistrations);
          setTotalPending(totalPending);
          setTotalScheduled(totalScheduled);
          setTotalCompleted(totalCompleted);
          setApplications(rows);
        } else {
          setApplications([]);
        }
      } catch (error: any) {
        snackbarRef.current?.showSnackbar(
          `Error while fetching data ${error.message}`,
          "error"
        );
      }
    };

    LoadAllApplications();
  }, []);

  const handleApplicationAction = async (actionName: string) => {
    console.log("handleVerifyApplication. Action is: ", actionName);
    setLoading(true);
    try {
      console.log("Inside handleApplicationAction");
      if (actionName === "Verify") {
        const updatedApplication = await UpdateApplicationStatus(
          selectedAppId?.toString()!,
          "Interview"
        );

        console.log("Application Updated");
        console.log(updatedApplication);
        //Update application list
        let updatedList = applications.map((row: any) =>
          row.id === selectedAppId ? { ...row, status: "Interview" } : row
        );
        console.log("Printing Updated List");
        console.log(updatedList);
        setApplications(updatedList);
        snackbarRef.current?.showSnackbar(
          `Application updated successfully.`,
          "success"
        );
        setOpen(false);
      } else if (actionName === "Interview") {
        console.log(
          `Interview to be scheduled for ${moment(selectedDate).format(
            "DD/MM/YY"
          )} and slot ${selectedSlot}`
        );

        const updatedApplication = await ScheduleInterview(
          selectedAppId?.toString()!,
          `${moment(selectedDate).format("DD/MM/YY")} between ${selectedSlot}`,
          "Interview Scheduled"
        );

        console.log("Interview Scheduled and Application Updated");
        console.log(updatedApplication);

        let updatedList = applications.map((row: any) =>
          row.id === selectedAppId
            ? {
                ...row,
                status: "Interview Scheduled",
                interview: `${moment(selectedDate).format(
                  "DD/MM/YY"
                )} between ${selectedSlot}`,
              }
            : row
        );
        console.log("Printing Updated List");
        console.log(updatedList);
        setApplications(updatedList);
        snackbarRef.current?.showSnackbar(
          `Interview scheduled and Application updated successfully.`,
          "success"
        );
        setOpen(false);
      } else if (actionName === "Interview Scheduled") {
        setOpen(false);
      }
    } catch (error: any) {
      console.log("Error while updating application status");
      console.log(error);
      snackbarRef.current?.showSnackbar(
        `Error while updating application data ${error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const onAdmissionDialogClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setAdmissionDialogOpen(false);
    // setIsEditing(false);
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h6">
            <strong>{dialogTitle}</strong>
          </Typography>
        </DialogTitle>
        <DialogContent>
          {actionName === "Verify" && (
            <DialogContentText>
              <Typography variant="body1">{dialogSubTitle}</Typography>
            </DialogContentText>
          )}
          {actionName === "Interview" && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Interview Date"
                  value={selectedDate}
                  format="DD-MM-YYYY"
                  onChange={(newDate) => setSelectedDate(newDate)}
                  // minDate={new Date()}
                  slots={{
                    textField: (textFieldProps) => (
                      <TextField
                        {...textFieldProps}
                        fullWidth
                        margin="normal"
                      />
                    ),
                  }}
                />
              </LocalizationProvider>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Slot</InputLabel>
                <Select
                  value={selectedSlot}
                  onChange={(e: any) => setSelectedSlot(e.target.value)}
                  label="Select Slot"
                >
                  {timeSlots.map((slot, index) => (
                    <MenuItem key={index} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {actionName === "Interview Scheduled" && (
            <DialogContentText>
              <Typography variant="body1">{dialogSubTitle}</Typography>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {actionName !== "Interview Scheduled" && (
            <MyCustomButton
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Cancel
            </MyCustomButton>
          )}
          <MyCustomButton
            onClick={() => handleApplicationAction(actionName!)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            variant="contained"
            color="primary"
            autoFocus
          >
            {actionName === "Verify" && (loading ? "...Wait" : "Verify")}
            {actionName === "Interview" && (loading ? "...Wait" : "Schedule")}
            {actionName === "Interview Scheduled" && "Ok"}
          </MyCustomButton>
        </DialogActions>
      </Dialog>
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
              <Typography variant="body1">Verification</Typography>
              <Typography variant="h4">{totalPending}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ p: 2, backgroundColor: "#fff3e0", borderRadius: "8px" }}>
              <Typography variant="body1">Interview</Typography>
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
              <Typography variant="body1">Selected</Typography>
              <Typography variant="h4">{totalCompleted}</Typography>
            </Box>
          </Grid>
        </Grid>
        {/**This is Datagrid */}
        <Grid container direction="column" mt={4}>
          <Grid item xs={12}>
            <DataGrid
              rows={applications}
              columns={columns}
              rowHeight={40}
              // autoHeight
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel} // Controls pagination behavior
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              slots={{
                toolbar: GridToolbar,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              // slots={{
              //   // toolbar: GridToolbar, // Enables search functionality and other features
              //   toolbar: CustomToolbar,
              // }}
              sx={{
                maxWidth: "95vw",
                height: 350, // Fixed height for the grid
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
              // onRowClick={(params) => handleOpenModal(params.row)}
              onCellClick={(params) => {
                // Exclude the "actions" column from opening the modal
                if (params.field !== "actions") {
                  handleOpenModal(params.row);
                }
              }}
            />

            {/* This shows the actual form for Admin verification */}
            <Dialog
              open={isAdmissionDialogOpen}
              onClose={onAdmissionDialogClose}
              maxWidth="lg"
              // disableEscapeKeyDown
            >
              <DialogContent
                sx={{
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "11px", // Default width of the scrollbar
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1", // Background of the scrollbar track
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888", // Color of the scroll thumb
                    borderRadius: "10px", // Rounded corners
                    transition: "all 0.3s ease", // Smooth transition for hover effect
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555", // Darker color on hover for the thumb
                    width: "15px", // Increased thumb width on hover
                    transform: "scaleX(1.5)", // Scale the thumb horizontally
                  },
                }}
              >
                <NewAdmissionForm
                  onClose={onAdmissionDialogClose}
                  onSubmit={() => console.log("Ignore")}
                  newApplicationData={applicationData}
                  resetFormRef={resetFormRef}
                  isEditing={false}
                  onEdit={() => console.log("Ignore")}
                  viewOnly={true}
                />
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
      <FooterLogin />
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
