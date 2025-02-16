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
  GridToolbarQuickFilter,
  GridValueGetter,
  GridValueSetter,
} from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Box,
  Grid,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { classes } from "../../Config/classes";

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
  const rowData = [
    {
      id: 1,
      name: "John Doe",
      roll_no: 2,
      subjects: {
        hindi: 0,
        english: 0,
        maths: 0,
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      roll_no: 4,
      subjects: {
        hindi: 0,
        english: 0,
        maths: 0,
      },
    },
    {
      id: 3,
      name: "Alice Brown",
      roll_no: 5,
      subjects: {
        hindi: 0,
        english: 0,
        maths: 0,
      },
    },
  ];
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [attendanceRecord, setAttendanceRecord] = useState({
    exam: false,
    subject: false,
  });

  const [classList, setClassList] = useState<{}[]>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  useEffect(() => {
    setClassList(classes);
  }, []);

  // Handle row updates
  const handleProcessRowUpdate = (newRow: any) => {
    setApplications((prevRows: any) =>
      prevRows.map((row: any) => (row.id === newRow.id ? newRow : row))
    );
  };

  const RecordAttendanceChangeHandler = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    if (event.target.value === "exam") {
      setAttendanceRecord({
        exam: true,
        subject: false,
      });
    }
    if (event.target.value === "subject") {
      setAttendanceRecord({
        exam: false,
        subject: true,
      });
    }
  };

  const ShowStudentsHandler = async () => {
    console.log("Inside Save Data");
    setApplications(rowData);
  };

  // Function to save all attendance data
  const handleSave = () => {
    console.log("Saving attendance:", applications);
    // Make API call here to save data
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, type: "number" },
    { field: "name", headerName: "Student Name", flex: 1, type: "string" },
    { field: "roll_no", headerName: "Roll No", flex: 1, type: "string" },

    {
      field: "hindi",
      headerName: "Hindi",
      flex: 1,
      editable: true,
      type: "number",
      valueGetter: (_, row) => row.subjects.hindi,
      valueSetter: (params: any) => {
        if (!params || !params.row) return params; // Prevent undefined errors
        return {
          ...params.row,
          subjects: { ...params.row.subjects, hindi: params.value || 0 },
        };
      },
    },
    {
      field: "english",
      headerName: "English",
      flex: 1,
      editable: true,
      type: "number",
      valueGetter: (_, row) => row.subjects.english,
      valueSetter: (params: any) => {
        if (!params || !params.row) return params;
        return {
          ...params.row,
          subjects: { ...params.row.subjects, english: params.value || 0 },
        };
      },
    },
    {
      field: "maths",
      headerName: "Maths",
      flex: 1,
      editable: true,
      type: "number",
      valueGetter: (_, row) => row.subjects.maths,
      valueSetter: (params: any) => {
        if (!params || !params.row) return params;
        return {
          ...params.row,
          subjects: { ...params.row.subjects, maths: params.value || 0 },
        };
      },
    },
  ];

  // const initialState = {
  //   columns: {
  //     columnVisibilityModel: {}, // Ensures all columns are visible
  //   },
  //   editing: {
  //     editRowsModel: {
  //       // ✅ Enables edit mode for all rows in "Days Present" by default
  //       1: { daysPresent: { mode: "edit" } },
  //       2: { daysPresent: { mode: "edit" } },
  //       3: { daysPresent: { mode: "edit" } },
  //     },
  //   },
  // };

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
          <FormControl
            sx={{ minWidth: 180, ml: 0 }}
            size="small"
            disabled={false}
          >
            <InputLabel id="select-attendance-label">
              Record Attendance
            </InputLabel>
            <Select
              labelId="select-attendance-label"
              id="select-attendance"
              label="Record Attendance"
              onChange={RecordAttendanceChangeHandler}
              variant="standard"
            >
              <MenuItem value={"exam"}>Exam Wise</MenuItem>
              <MenuItem value={"month"}>Month Wise</MenuItem>
            </Select>
          </FormControl>

          {(attendanceRecord.subject || attendanceRecord.exam) && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              gap={3}
              width="auto"
              mt={3}
              mb={3}
            >
              <FormControl
                sx={{ minWidth: 130, ml: 0 }}
                size="small"
                disabled={false}
              >
                <InputLabel id="select-class-label">Class</InputLabel>
                <Select
                  labelId="select-class-label"
                  id="select-class"
                  label="Class"
                  // onChange={(event) => handleClassSelect(index, event)}
                  variant="standard"
                >
                  {classList &&
                    classList?.length > 0 &&
                    classList.map((item: any, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{ minWidth: 130, ml: 0 }}
                size="small"
                disabled={false}
              >
                <InputLabel id="select-section-label">Section</InputLabel>
                <Select
                  labelId="select-section-label"
                  id="select-section"
                  label="Section"
                  // onChange={(event) => handleClassSelect(index, event)}
                  variant="standard"
                >
                  <MenuItem value="a">A</MenuItem>
                  <MenuItem value="b">B</MenuItem>
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="d">D</MenuItem>
                </Select>
              </FormControl>

              {attendanceRecord.exam ? (
                <FormControl
                  sx={{ minWidth: 130, ml: 0 }}
                  size="small"
                  disabled={false}
                >
                  <InputLabel id="select-exam-label">Exam</InputLabel>
                  <Select
                    labelId="select-exam-label"
                    id="select-exam"
                    label="Select Exam"
                    // onChange={(event) => handleClassSelect(index, event)}
                    variant="standard"
                  >
                    <MenuItem value="pt1">Term 1: PT</MenuItem>
                    <MenuItem value="sea1">Term 1: SEA</MenuItem>
                    <MenuItem value="sa1">Term 1: SA</MenuItem>
                    <MenuItem value="pt2">Term 2: PT</MenuItem>
                    <MenuItem value="sea2">Term 2: SEA</MenuItem>
                    <MenuItem value="sa2">Term 2: SA</MenuItem>
                  </Select>
                </FormControl>
              ) : attendanceRecord.subject ? (
                <FormControl
                  sx={{ minWidth: 130, ml: 0 }}
                  size="small"
                  disabled={false}
                >
                  <InputLabel id="select-exam-label">Month</InputLabel>
                  <Select
                    labelId="select-exam-label"
                    id="select-exam"
                    label="Select Exam"
                    // onChange={(event) => handleClassSelect(index, event)}
                    variant="standard"
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="hindi">Hindi</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                ""
              )}

              <MyCustomButton
                onClick={ShowStudentsHandler}
                variant="contained"
                disabled={false}
                type="button"
              >
                Show Students
              </MyCustomButton>
            </Box>
          )}

          <DataGrid
            rows={applications}
            columns={columns}
            rowHeight={40}
            // initialState={initialState}
            processRowUpdate={handleProcessRowUpdate}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[50, 100, 150]}
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
              minHeight: "40vh",
              height: "65vh",
              marginTop: "15px",
              "& .MuiDataGrid-cell--editable": {
                backgroundColor: "white", // White background for editable fields
                border: "1px solid #2E186A", // Gray border for a subtle look
                paddingTop: "2px",
                paddingBottom: "2px",
              },
              "& .MuiDataGrid-cell--editing": {
                backgroundColor: "#fff", // Ensure background remains white while editing
                border: "2px solid #35821d", // Blue border when focused
                boxShadow: "1px 1px 5px #35821d", // Optional shadow effect
                paddingTop: "2px",
                paddingBottom: "2px",
              },

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

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: 20 }}
          >
            Save Attendance
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ManageMarks;
