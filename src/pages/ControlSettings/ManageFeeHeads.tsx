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
import { classes_records } from "../../Config/classes_records";
import { classes } from "../../Config/classes";

import moment from "moment";
import { useForm } from "react-hook-form";
import { fee_heads_records } from "../../Config/fee_heads_record";
import { fees_structure_records } from "../../Config/fees_structure_records";
import { v4 as uuid } from "uuid";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import FeeMultiSelect from "./FeeMultiSelect/FeeMultiSelect";

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

const ManageFeeHeads = () => {
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [feeHeadsList, setFeeHeadsList] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [classList, setClassList] = useState<{}[]>([]);
  const [classFeesDefault, setClassFeesDefault] = useState<any>();
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  const [feesStructureRecords, setFeesStructureRecords] = useState<any>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      amount: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit: handleSubmitForm2,
    control: controlForm2,
    formState: { errors: errorsForm2 },
    reset: resetForm2,
  } = useForm({
    defaultValues: {
      fees_particulars: {},
    },
    mode: "onTouched",
  });

  useEffect(() => {
    console.log("useEffect 2");
    if (
      feesStructureRecords?.length > 0 &&
      classList?.length > 0 &&
      applications?.length > 0
    ) {
      const _classFeesDefault = generateFeesParticulars(
        feesStructureRecords,
        classList,
        applications
      );
      setClassFeesDefault(_classFeesDefault?.fees_particulars);
    }
  }, [feesStructureRecords, classList, applications]);

  useEffect(() => {
    console.log("useEffect 3");
    const feeHeadsListMultiSelect = applications.map((item: any) => ({
      id: item.id,
      title: item.title,
    }));
    setFeeHeadsList(feeHeadsListMultiSelect);
  }, [applications]);

  useEffect(() => {
    console.log("useEffect 1");
    setFeesStructureRecords(fees_structure_records);
    setClassList(classes_records);
    setApplications(fee_heads_records);

    // setClassFeesDefault({
    //   "2d154374": {
    //     January: [1, 2, 3],
    //     February: [3, 4, 2],
    //     March: [2, 3, 1],
    //     April: [2, 3, 4],
    //   },
    //   "2d154375": {},
    //   "2d154376": {},
    //   "2d154377": {},
    //   "2d154379": {},
    // });
  }, []);

  useEffect(() => {
    console.log("useEffect 4");
    if (classFeesDefault && Object.keys(classFeesDefault).length > 0) {
      resetForm2({ fees_particulars: classFeesDefault });
      console.log("Form reset with:", classFeesDefault);
    }
  }, [classFeesDefault, resetForm2]);

  useEffect(() => {
    console.log("useEffect 5");
    if (selectedRow) {
      reset(selectedRow); // Reset form with selected row values
    }
  }, [selectedRow, reset]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Fee Head ", flex: 1 },
    { field: "amount", headerName: "Amount (₹)", flex: 1 },
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
              setSelectedRow({
                id: params.row.id,
                amount: params.row.amount,
                title: params.row.title,
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

  const isDuplicate = (title: string) => {
    return applications.some((fee: any) => fee.title === title);
  };

  const updateItem = (updatedfee: any) => {
    setApplications((prevfee: any) =>
      prevfee.map((fee: any) =>
        fee.id === updatedfee.id ? { ...fee, ...updatedfee } : fee
      )
    );
  };

  const handleFormSubmit = async (data: any) => {
    // console.log("Handle submit for Subject");
    // console.log(data);
    if (edit) {
      updateItem(data);
      setEdit(false);
      reset({
        id: "",
        amount: "",
        title: "",
      });
      snackbarRef.current?.showSnackbar(
        `Entry updated successfully.`,
        "success"
      );
    } else {
      if (isDuplicate(data.title)) {
        // console.log("Duplicate");
        snackbarRef.current?.showSnackbar(
          `Subject Already Present.`,
          "warning"
        );
        return;
      }
      const _id = uuid().slice(0, 5);
      const newFeeHead = {
        ...data,
        created_on: moment().format("DD/MM/YYYY"),
        id: _id,
      };

      const newApplicationList = [...applications, newFeeHead];
      console.log(newApplicationList);
      setApplications(newApplicationList);
      setEdit(false);
      reset({
        id: "",
        amount: "",
        title: "",
      });
      snackbarRef.current?.showSnackbar(
        `Subject added successfully.`,
        "success"
      );
    }
  };

  const onResetHandler = () => {
    reset({
      id: "",
      amount: "",
      title: "",
    });
    setEdit(false);
  };

  const generateFeeStructure = (
    fee_heads_records: any,
    classes_records: any,
    outcome: any
  ) => {
    return classes_records.map((cls: any) => {
      const class_id = cls.class_id;
      const monthly_fees = outcome.fees_particulars[class_id]
        ? Object.entries(outcome.fees_particulars[class_id]).map(
            ([month, fee_ids]: [month: any, fee_ids: any]) => {
              let fees_particulars: any = {};

              // Map fee IDs to their corresponding amounts and titles
              fee_ids &&
                fee_ids.forEach((fee_id: any) => {
                  const fee_item = fee_heads_records.find(
                    (f: any) => f.id === fee_id
                  );
                  if (fee_item) {
                    fees_particulars[fee_item.title.toLowerCase()] = parseInt(
                      fee_item.amount,
                      10
                    );
                  }
                });
              let total_fees = 0;
              if (Object.keys(fees_particulars).length > 0) {
                // Only sum up the mapped fees
                //@ts-ignore
                total_fees = Object.values(fees_particulars).reduce(
                  //@ts-ignore
                  (sum, value) => sum + value,
                  0
                );
              } else {
                // If no fees are mapped, set fees_particulars as an empty object
                fees_particulars = {};
                total_fees = 0; // No fees, so total should be 0
              }

              return {
                month,
                fees_particulars,
                total_fees,
              };
            }
          )
        : [];

      return {
        id: uuid().slice(0, 5),
        fees_structure_id: uuid().slice(0, 5),
        academic_year: "",
        class: cls.name,
        fee_collection_cycle: 10,
        monthly_fees,
      };
    });
  };

  function generateFeesParticulars(
    feesStructureRecords: any,
    classesRecords: any,
    feeHeadsRecords: any
  ) {
    const feeHeadsMap = feeHeadsRecords.reduce((acc: any, head: any) => {
      acc[head.title.toLowerCase()] = head.id;
      return acc;
    }, {});

    const result = { fees_particulars: {} };

    // Initialize classes with empty objects
    //@ts-ignore
    classesRecords.forEach((cls) => {
      //@ts-ignore
      result.fees_particulars[cls.class_id] = {};
    });

    //@ts-ignore
    feesStructureRecords.forEach((record) => {
      //@ts-ignore
      const classId = classesRecords.find(
        (cls: any) => cls.name === record.class
      )?.class_id;
      if (!classId) return;

      const classFees = {};
      //@ts-ignore
      record.monthly_fees.forEach((monthlyFee) => {
        const month = monthlyFee.month;
        const feeIds = Object.keys(monthlyFee.fees_particulars)
          .map((fee) => feeHeadsMap[fee.toLowerCase()])
          .filter((id) => id !== undefined); // Filter out undefined fee IDs

        if (feeIds.length > 0) {
          //@ts-ignore
          classFees[month] = feeIds;
        }
      });

      if (Object.keys(classFees).length > 0) {
        //@ts-ignore
        result.fees_particulars[classId] = classFees;
      }
    });

    return result;
  }

  const HandleFeeStructureCreation = async (data: any) => {
    console.log("HandleFeeStructureCreation");
    console.log(data);
    const mappedData = generateFeeStructure(applications, classList, data);

    // console.log("mappedData");
    // console.log(mappedData);

    // Here records will be created and added to fees_structure_records, where each record will have its fees_structure_id:

    // under classes, for any given class and all sections fees_structure_id should be added
    const mappedData_withFee = classes.map((classObj: any) => {
      const feeItem = mappedData.find(
        (feeStructureItem: any) => classObj.title === feeStructureItem.class
      );

      if (feeItem) {
        // Update the fees_structure_id with the feeItem's id or fees_structure_id as needed
        classObj.fees_structure_id = feeItem.fees_structure_id;
      }

      return classObj;
    });

    console.log("mappedData_withFee");
    console.log(mappedData_withFee);
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
        {/* Create Fee Heads */}
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
            <strong>Create Fee Heads</strong>
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
              width="auto"
            >
              <ControlledTextField
                variant="standard"
                name="title"
                control={control}
                errors={errors}
                label="Fee Head"
                rules={{
                  required: "Required",
                }}
                required
              />
              <ControlledTextField
                variant="standard"
                name="amount"
                type="number"
                control={control}
                errors={errors}
                label="Amount (₹)"
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
          <Typography variant="h5" alignSelf={"center"} mt={2}>
            <strong>Create Fees Structure</strong>
          </Typography>
          {classList.map((classItem: any, classIndex: number) => (
            <Accordion
              key={classItem.class_id}
              sx={{
                mt: 2,
                width: "80vw",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  <strong>{`Class: ${classItem.name}`}</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form onSubmit={handleSubmitForm2(HandleFeeStructureCreation)}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                    >
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
                                <StyledTableCell>Month</StyledTableCell>
                                <StyledTableCell align="center">
                                  Fee Heads
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {MONTHS.map((month: any, index: number) => (
                                <StyledTableRow key={`${classIndex}-${index}`}>
                                  <StyledTableCell component="th" scope="row">
                                    {month}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    <FeeMultiSelect
                                      name={`fees_particulars.${classItem.class_id}.${month}`}
                                      control={controlForm2}
                                      errors={errorsForm2}
                                      label="Subjects"
                                      options={feeHeadsList}
                                      sx={{ width: 900 }}
                                    />
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    </Grid>
                  </Grid>
                </form>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ManageFeeHeads;
