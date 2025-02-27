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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { classes } from "../../Config/classes";

import moment from "moment";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";
import { vehicles_records } from "../../Config/vehicles_records";
import { stops_records } from "../../Config/stops_records";

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
  type,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      type={type}
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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ManageTransport = () => {
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });
  const [selectedRow, setSelectedRow] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);

  const [applicationsStops, setApplicationsStop] = useState<any>([]);
  const [selectedRowStop, setSelectedRowStop] = useState<any>();
  const [editStop, setEditStop] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      vehicle_no: "",
      type: "",
      registration_no: "",
      driver_name: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit: handleSubmitStops,
    control: controlStops,
    formState: { errors: errorsStop },
    reset: resetStops,
  } = useForm({
    defaultValues: {
      name: "",
      vehicle_id: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit: handleSubmitTransportCost,
    control: controlTransportCost,
    formState: { errors: errorsTransportCost },
    reset: resetTransportCost,
  } = useForm({
    defaultValues: {},
    mode: "onTouched",
  });

  useEffect(() => {
    const _classList = classes.map((classObj) => classObj.title);
    setApplications(vehicles_records);
    setApplicationsStop(stops_records);
  }, []);

  useEffect(() => {
    const stop_records_vehicle = stops_records.map((record: any) => {
      const {
        vehicle_no = "",
        registration_no = "",
        driver_name = "",
      } = applications.find(
        (item: any) => item.vehicle_id === record.vehicle_id
      ) || {};
      return {
        ...record,
        vehicle_no,
        registration_no,
        driver_name,
      };
    });
    console.log("stop_records_vehicle");
    console.log(stop_records_vehicle);
    setApplicationsStop(stop_records_vehicle);
  }, [applications]);

  useEffect(() => {
    if (selectedRow) {
      reset(selectedRow); // Reset form with selected row values
    }
  }, [selectedRow, reset]);

  useEffect(() => {
    if (selectedRowStop) {
      resetStops(selectedRowStop); // Reset form with selected row values
    }
  }, [selectedRowStop, resetStops]);

  //Vehicle Table
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
            onClick={() => {
              console.log(params);
              setSelectedRow({
                vehicle_no: params.row.vehicle_no,
                type: params.row.type,
                registration_no: params.row.registration_no,
                driver_name: params.row.driver_name,
              });
              setEdit(true);
            }}
            disabled={false}
          />
          {/* {"|"}
          <AnimatedButton
            label="Remove"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          /> */}
        </>
      ),
    },
  ];

  //Stops Table
  const columnsStops: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "vehicle_no", headerName: "Vehicle No", flex: 1 },
    { field: "registration_no", headerName: "Registration", flex: 1 },
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
            onClick={() => {
              console.log(params);
              setSelectedRowStop({
                stop_id: params.row.stop_id,
                name: params.row.name,
                vehicle_id: params.row.vehicle_id,
              });
              setEditStop(true);
            }}
            disabled={false}
          />
          {/* {"|"}
          <AnimatedButton
            label="Remove"
            onClick={() => console.log("Get TC Clicked")}
            disabled={false}
          /> */}
        </>
      ),
    },
  ];

  const onResetHandler = () => {
    reset({
      vehicle_no: "",
      type: "",
      registration_no: "",
      driver_name: "",
    });
    setEdit(false);
  };

  const isDuplicate = (vehicle_no: string, registration_no: string) => {
    return applications.some(
      (vehicle: any) =>
        vehicle.vehicle_no === vehicle_no ||
        vehicle.registration_no === registration_no
    );
  };

  const updateItem = (updatedVehicle: any) => {
    setApplications((prevVehicle: any) =>
      prevVehicle.map((vehicle: any) =>
        vehicle.vehicle_no === updatedVehicle.vehicle_no
          ? { ...vehicle, ...updatedVehicle }
          : vehicle
      )
    );
  };

  const handleFormSubmit = async (data: any) => {
    console.log("Handle submit for Subject");
    console.log(data);
    if (edit) {
      updateItem(data);
      setEdit(false);
      reset({
        vehicle_no: "",
        type: "",
        registration_no: "",
        driver_name: "",
      });
      snackbarRef.current?.showSnackbar(
        `Vehicle updated successfully.`,
        "success"
      );
    } else {
      if (isDuplicate(data.vehicle_no, data.registration_no)) {
        console.log("Duplicate");
        snackbarRef.current?.showSnackbar(
          `Vehicle Already Present.`,
          "warning"
        );
        return;
      }
      const _id = uuid().slice(0, 5);
      const vehicle_item = {
        ...data,
        vehicle_id: _id,
        id: _id,
        created_on: moment().format("DD/MM/YYYY"),
      };

      const newApplicationList = [...applications, vehicle_item];
      console.log(newApplicationList);
      setApplications(newApplicationList);
      setEdit(false);
      reset({
        vehicle_no: "",
        type: "",
        registration_no: "",
        driver_name: "",
      });
      snackbarRef.current?.showSnackbar(
        `Vehicle added successfully.`,
        "success"
      );
    }
  };

  const onResetHandlerStops = () => {
    resetStops({
      name: "",
      vehicle_id: "",
    });
    setEditStop(false);
  };

  const isDuplicateStop = (name: string) => {
    return applicationsStops.some(
      (stopItem: any) =>
        stopItem.name?.toString().toLowerCase() ===
        name?.toString().toLowerCase()
    );
  };

  const updateStop = (updatedStop: any) => {
    console.log("updatedStop");
    console.log(updatedStop);
    setApplicationsStop((prevStop: any) => {
      console.log("prevStop");
      console.log(prevStop);
      const {
        vehicle_no = "",
        registration_no = "",
        driver_name = "",
      } = applications.find(
        (item: any) => updatedStop.vehicle_id === item.vehicle_id
      ) || {};

      return prevStop.map((stopItem: any) =>
        stopItem.stop_id === updatedStop.stop_id
          ? {
              ...stopItem,
              name: updatedStop.name,
              vehicle_id: updatedStop.vehicle_id,
              vehicle_no,
              registration_no,
              driver_name,
            }
          : stopItem
      );
    });
  };

  const handleFormSubmitStop = async (data: any) => {
    console.log("Handle Stops for Subject");
    console.log(data);
    if (editStop) {
      updateStop(data);
      setEditStop(false);
      resetStops({
        name: "",
        vehicle_id: "",
      });
      snackbarRef.current?.showSnackbar(
        `Entry updated successfully.`,
        "success"
      );
    } else {
      if (isDuplicateStop(data.name)) {
        console.log("Duplicate");
        snackbarRef.current?.showSnackbar(`Stop Already Present.`, "warning");
        return;
      }
      const _id = uuid().slice(0, 5);

      const {
        vehicle_no = "",
        registration_no = "",
        driver_name = "",
      } = applications.find(
        (item: any) => item.vehicle_id === data.vehicle_id
      ) || {};

      const newStop_record = {
        name: data.name,
        vehicle_no,
        registration_no,
        driver_name,
        stop_id: _id,
        id: _id,
        created_on: moment().format("DD/MM/YYYY"),
      };

      const newApplicationList = [...applicationsStops, newStop_record];
      console.log(newApplicationList);
      setApplicationsStop(newApplicationList);
      setEditStop(false);
      resetStops({
        name: "",
        vehicle_id: "",
      });
      snackbarRef.current?.showSnackbar(`Stop added successfully.`, "success");
    }
  };

  const handleFormSubmitTransportCost = async (data: any) => {
    console.log("Under handleFormSubmitTransportCost");
    console.log(data);

    const costData = Object.entries(data).map(([key, value]: [string, any]) => {
      const _id = uuid().slice(0, 5);
      return {
        id: _id,
        transport_structure_id: _id,
        stop_name: key,
        fee_collection_cycle: 10,
        monthly_fees: value
          ? Object.entries(value).map(([_month, fee]) => {
              const feeAmount = Number(fee); // Ensure it's treated as a number
              return {
                month: _month,
                fees_particulars: {
                  transport: feeAmount,
                },
                total_fees: feeAmount,
              };
            })
          : [],
      };
    });

    console.log("costData");
    console.log(costData);
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
        {/* Add Vehicle */}
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
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            onReset={onResetHandler}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              gap={3}
              width="70vw"
            >
              <ControlledTextField
                variant="standard"
                name="vehicle_no"
                control={control}
                errors={errors}
                label="Vehicle No"
                rules={{
                  required: "Required",
                }}
                required
              />

              <ControlledSelect
                name="type"
                control={control}
                errors={errors}
                label="Type"
                rules={{ required: "Required" }}
                options={[
                  { value: "", label: "Select" },
                  { value: "auto", label: "Auto" },
                  { value: "jeep", label: "Jeep" },
                  { value: "bus", label: "Bus" },
                  { value: "eriskshaw", label: "E-Rikshaw" },
                ]}
                sx={{ width: "50%" }}
              />

              <ControlledTextField
                variant="standard"
                name="registration_no"
                control={control}
                errors={errors}
                label="Registration No"
                rules={{
                  required: "Required",
                }}
                required
              />

              <ControlledTextField
                variant="standard"
                name="driver_name"
                control={control}
                errors={errors}
                label="Driver Name"
                rules={{
                  required: "Required",
                }}
                required
              />

              <MyCustomButton
                variant="contained"
                type="submit"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                {!edit ? "Add" : "Save"}
              </MyCustomButton>
              <MyCustomButton
                variant="contained"
                type="reset"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                Clear
              </MyCustomButton>
            </Box>
          </form>
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

        {/* Add Stops */}
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
          <form
            onSubmit={handleSubmitStops(handleFormSubmitStop)}
            onReset={onResetHandlerStops}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              gap={3}
              width="50vw"
            >
              <ControlledTextField
                variant="standard"
                name="name"
                control={controlStops}
                errors={errorsStop}
                label="Stop Name"
                rules={{
                  required: "Required",
                }}
                sx={{ width: "30%" }}
                required
              />

              <ControlledSelect
                name="vehicle_id"
                control={controlStops}
                errors={errorsStop}
                label="Vehicle No"
                rules={{ required: "Required" }}
                options={applications.map((vehicleItem: any) => ({
                  value: vehicleItem.vehicle_id,
                  label: vehicleItem.vehicle_no,
                }))}
                sx={{ width: "30%" }}
              />

              <MyCustomButton
                variant="contained"
                type="submit"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                {!editStop ? "Add" : "Save"}
              </MyCustomButton>
              <MyCustomButton
                variant="contained"
                type="reset"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                Clear
              </MyCustomButton>
            </Box>
          </form>
          <DataGrid
            rows={applicationsStops}
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

        {/* Configure Monthly Cost */}
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
            onSubmit={handleSubmitTransportCost(handleFormSubmitTransportCost)}
          >
            <Accordion
              sx={{
                mt: 2,
                width: "95vw",
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
                        <AnimatedButton
                          label="Edit"
                          onClick={() => console.log("Get TC Clicked")}
                          disabled={false}
                        />
                        {"|"}
                        <AnimatedButton
                          label="Save"
                          disabled={false}
                          type={"submit"}
                        />
                      </Box>
                      <TableContainer component={Paper}>
                        <Table size="medium" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Stops</StyledTableCell>
                              {MONTHS.map((month: string) => (
                                <StyledTableCell align="center" key={month}>
                                  {month}
                                </StyledTableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {applicationsStops.map(
                              (stopItem: any, stopIndex: number) => (
                                <StyledTableRow key={stopIndex}>
                                  <StyledTableCell component="th" scope="row">
                                    {stopItem.name}
                                  </StyledTableCell>
                                  {/* <StyledTableCell
                                    align="right"
                                    key={stopIndex}
                                  >OPTION TO ENTER AMOUNT FOR ALL MONTHS</StyledTableCell> */}
                                  {MONTHS.map((key) => (
                                    <StyledTableCell align="right" key={key}>
                                      <ControlledTextField
                                        variant="standard"
                                        name={`${stopItem.name}.${key}`}
                                        control={controlTransportCost}
                                        errors={errorsTransportCost}
                                        // label="₹Amount"
                                        type="number"
                                        // rules={{
                                        //   required: "Required",
                                        // }}
                                        // sx={{ width: "40%" }}
                                        // required
                                      />
                                    </StyledTableCell>
                                  ))}
                                </StyledTableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ManageTransport;
