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
} from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Box,
  Grid,
  styled,
  Switch,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { subjects } from "../../Config/subjects";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { classes } from "../../Config/classes";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E186A", //theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const ManageTransport = () => {
  const rowData = [
    {
      id: 1,
      vehicle_no: 1,
      type: "auto",
      registration_no: "JH 03AF 1234",
      driver_name: "tom Harry",
      created_on: "10/12/2025",
    },
    {
      id: 2,
      vehicle_no: 1,
      type: "auto",
      registration_no: "JH 03AF 1234",
      driver_name: "tom Harry",
      created_on: "10/12/2025",
    },
    {
      id: 3,
      vehicle_no: 1,
      type: "auto",
      registration_no: "JH 03AF 1234",
      driver_name: "tom Harry",
      created_on: "10/12/2025",
    },
    {
      id: 4,
      vehicle_no: 1,
      type: "auto",
      registration_no: "JH 03AF 1234",
      driver_name: "tom Harry",
      created_on: "10/12/2025",
    },
  ];

  const rowDataStops = [
    {
      id: 1,
      name: "Jail Hata",
      created_on: "10/12/2025",
    },
    {
      id: 2,
      name: "Redma",
      created_on: "10/12/2025",
    },
    {
      id: 3,
      name: "Bairiya",
      created_on: "10/12/2025",
    },
    {
      id: 4,
      name: "Hamidganj",
      created_on: "10/12/2025",
    },
  ];
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [classList, setClassList] = useState<{}[]>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  const [dates, setDates] = useState({
    date1: null,
    date2: null,
    date3: null,
    date4: null,
  });
  useEffect(() => {
    const _classList = classes.map((classObj) => classObj.title);
    setClassList(_classList);
    setApplications(rowData);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Event Value: ", event.target.value);
  };

  const handleDateChange = (key: string, newValue: any) => {
    setDates((prev) => ({ ...prev, [key]: newValue }));
  };

  const saveData = async () => {
    console.log("Inside Save Data");
  };

  const columns: GridColDef[] = [
    { field: "vehicle_no", headerName: "Vehicle No", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "registration_no", headerName: "Registration No", flex: 1 },
    { field: "driver_name", headerName: "Driver", flex: 1 },
    { field: "created_on", headerName: "Created On", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <AnimatedButton
            label="Edit"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          />
          {"|"}
          <AnimatedButton
            label="Remove"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          />
        </>
      ),
    },
  ];

  const columnsStops: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "created_on", headerName: "Created On", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <AnimatedButton
            label="Edit"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          />
          {"|"}
          <AnimatedButton
            label="Remove"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          />
        </>
      ),
    },
  ];

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
            <strong>Add Vehicles</strong>
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            gap={3}
            width="auto"
          >
            <TextField
              // fullWidth
              variant="standard"
              label="Vehicle No"
              size="small"
              type="number"
              // value={row.code}
              onChange={handleChange}
              // error={!!row?.errors?.code}
              // helperText={row?.errors?.code}
              disabled={false}
            />

            <FormControl
              sx={{ minWidth: 130, ml: 0 }}
              size="small"
              // error={!!row.errors?.marking}
              disabled={false}
            >
              <InputLabel id="select-rebate-label">Type</InputLabel>
              <Select
                labelId="select-rebate-label"
                id="select-rebate"
                // value={row?.marking}
                label="Type"
                // onChange={(event) => handleClassSelect(index, event)}
                variant="standard"
                size="small"
              >
                <MenuItem value={"auto"}>Auto</MenuItem>
                <MenuItem value={"jeep"}>Jeep</MenuItem>
                <MenuItem value={"bus"}>Bus</MenuItem>
                <MenuItem value={"erikshaw"}>E-Rikshaw</MenuItem>
              </Select>
            </FormControl>

            <TextField
              // fullWidth
              variant="standard"
              label="Registration No"
              size="small"
              // value={row.code}
              onChange={handleChange}
              // error={!!row?.errors?.code}
              // helperText={row?.errors?.code}
              disabled={false}
            />
            <TextField
              // fullWidth
              variant="standard"
              label="Driver's Name"
              size="small"
              // value={row.code}
              onChange={handleChange}
              // error={!!row?.errors?.code}
              // helperText={row?.errors?.code}
              disabled={false}
            />
            <MyCustomButton
              onClick={saveData}
              variant="contained"
              disabled={false}
            >
              Add
            </MyCustomButton>
          </Box>

          <DataGrid
            rows={applications}
            columns={columns}
            rowHeight={40}
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
              height: "65vh",
              marginTop: "20px",

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
        </Box>

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
            <strong>Add Stops</strong>
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            gap={3}
            width="auto"
          >
            <TextField
              // fullWidth
              variant="standard"
              label="Stop Name"
              size="small"
              // value={row.code}
              onChange={handleChange}
              // error={!!row?.errors?.code}
              // helperText={row?.errors?.code}
              disabled={false}
            />

            <MyCustomButton
              onClick={saveData}
              variant="contained"
              disabled={false}
            >
              Add
            </MyCustomButton>
          </Box>

          <DataGrid
            rows={rowDataStops}
            columns={columnsStops}
            rowHeight={40}
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
              width: "50vw",
              maxWidth: "90vw",
              height: "65vh",
              marginTop: "20px",

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
        </Box>
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
          <Accordion
            sx={{
              mt: 2,
              width: "80vw",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <strong>Assign Stops to Vehicles</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} display={"flex"} flexDirection={"column"}>
                  <>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                      mb={2}
                    >
                      {/* <AnimatedButton
                            label="Generate Admit Card"
                            onClick={() => console.log("Get TC Clicked")}
                            disabled={false}
                          />
                          {"|"} */}
                      <AnimatedButton
                        label="Edit"
                        onClick={() => console.log("Get TC Clicked")}
                        disabled={false}
                      />
                      {"|"}
                      <AnimatedButton
                        label="Save"
                        onClick={() => console.log("Get TC Clicked")}
                        disabled={false}
                      />
                    </Box>
                    <TableContainer component={Paper}>
                      <Table size="medium" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Vehicles</StyledTableCell>
                            <StyledTableCell align="center">
                              Stops
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {classList.length > 0 &&
                            classList.map((name) => (
                              <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                  {`${name}`}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  <FormControl
                                    sx={{ width: 900 }}
                                    // disabled={disabled}
                                  >
                                    <InputLabel id="demo-multiple-checkbox-label">
                                      Stops
                                    </InputLabel>
                                    <Select
                                      labelId="demo-multiple-checkbox-label"
                                      id="demo-multiple-checkbox"
                                      multiple
                                      value={[]}
                                      // onChange={(e) =>
                                      //   handleChangeCheckBox(e, index)
                                      // }
                                      // onChange={handleChangeCheckBox}
                                      renderValue={(selected: any) =>
                                        selected.join(", ")
                                      }
                                      MenuProps={MenuProps}
                                      variant="standard"
                                    >
                                      <MenuItem value={"name1"}>
                                        <Checkbox
                                          checked={false}
                                          //  checked={row.subjects.includes(
                                          //     name
                                          //   )}
                                          // checked={row.subjects.includes(
                                          //   name
                                          // )}
                                        />

                                        <ListItemText primary={"name1"} />
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              mt: 2,
              width: "80vw",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <strong>Configure Monthly Cost</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} display={"flex"} flexDirection={"column"}>
                  <>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                      mb={2}
                    >
                      {/* <AnimatedButton
                            label="Generate Admit Card"
                            onClick={() => console.log("Get TC Clicked")}
                            disabled={false}
                          />
                          {"|"} */}
                      <AnimatedButton
                        label="Edit"
                        onClick={() => console.log("Get TC Clicked")}
                        disabled={false}
                      />
                      {"|"}
                      <AnimatedButton
                        label="Save"
                        onClick={() => console.log("Get TC Clicked")}
                        disabled={false}
                      />
                    </Box>
                    <TableContainer component={Paper}>
                      <Table size="medium" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell align="center">
                              Jan
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Feb
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Mar
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Apr
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <TableBody>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                {"Stop1"}
                              </StyledTableCell>
                              {["date1", "date2", "date3", "date4"].map(
                                (key) => (
                                  <StyledTableCell align="right" key={key}>
                                    <DatePicker
                                      value={dates[key as keyof typeof dates]}
                                      onChange={(newValue) =>
                                        handleDateChange(key, newValue)
                                      }
                                      format="DD/MM/YYYY"
                                      slotProps={{
                                        textField: {
                                          size: "small",
                                          fullWidth: true,
                                        },
                                      }}
                                    />
                                  </StyledTableCell>
                                )
                              )}
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                {"Stop2"}
                              </StyledTableCell>
                              {["date1", "date2", "date3", "date4"].map(
                                (key) => (
                                  <StyledTableCell align="right" key={key}>
                                    <DatePicker
                                      value={dates[key as keyof typeof dates]}
                                      onChange={(newValue) =>
                                        handleDateChange(key, newValue)
                                      }
                                      format="DD/MM/YYYY"
                                      slotProps={{
                                        textField: {
                                          size: "small",
                                          fullWidth: true,
                                        },
                                      }}
                                    />
                                  </StyledTableCell>
                                )
                              )}
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                {"Stop3"}
                              </StyledTableCell>
                              {["date1", "date2", "date3", "date4"].map(
                                (key) => (
                                  <StyledTableCell align="right" key={key}>
                                    <DatePicker
                                      value={dates[key as keyof typeof dates]}
                                      onChange={(newValue) =>
                                        handleDateChange(key, newValue)
                                      }
                                      format="DD/MM/YYYY"
                                      slotProps={{
                                        textField: {
                                          size: "small",
                                          fullWidth: true,
                                        },
                                      }}
                                    />
                                  </StyledTableCell>
                                )
                              )}
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                {"Stop4"}
                              </StyledTableCell>
                              {["date1", "date2", "date3", "date4"].map(
                                (key) => (
                                  <StyledTableCell align="right" key={key}>
                                    <DatePicker
                                      value={dates[key as keyof typeof dates]}
                                      onChange={(newValue) =>
                                        handleDateChange(key, newValue)
                                      }
                                      format="DD/MM/YYYY"
                                      slotProps={{
                                        textField: {
                                          size: "small",
                                          fullWidth: true,
                                        },
                                      }}
                                    />
                                  </StyledTableCell>
                                )
                              )}
                            </StyledTableRow>
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                {"Stop5"}
                              </StyledTableCell>
                              {["date1", "date2", "date3", "date4"].map(
                                (key) => (
                                  <StyledTableCell align="right" key={key}>
                                    <DatePicker
                                      value={dates[key as keyof typeof dates]}
                                      onChange={(newValue) =>
                                        handleDateChange(key, newValue)
                                      }
                                      format="DD/MM/YYYY"
                                      slotProps={{
                                        textField: {
                                          size: "small",
                                          fullWidth: true,
                                        },
                                      }}
                                    />
                                  </StyledTableCell>
                                )
                              )}
                            </StyledTableRow>
                          </TableBody>
                        </LocalizationProvider>
                      </Table>
                    </TableContainer>
                  </>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default ManageTransport;
