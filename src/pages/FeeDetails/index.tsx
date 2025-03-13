import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Typography,
  Box,
  Grid,
  Button,
  styled,
  Paper,
  Grid2,
  Divider,
  CircularProgress,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProfileDialogFeesPayment from "../../components/ProfileDialogFeesPayment";

import moment from "moment";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
// import { student_transport_collection } from "../../Config/student_transport_collection";
// import { transport_fees_structure } from "../../Config/transport_fees_structure";
// import { students } from "../../Config/students";
// import { fees_structure_records } from "../../Config/fees_structure_records";
import { student_fee_collection_records } from "../../Config/student_fee_collection_records";
// import { fee_payment_collection_records } from "../../Config/fee_payment_collection_records";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import {
  GetClassFeeStructure,
  GetClassWiseStudentCount,
  GetClassWiseTotalFees,
  GetFeeCollectionRecords,
  GetFeeCollectionReport,
  GetFeeSummary,
  GetStopWiseStudentCount,
  GetStopWiseTotalFees,
  GetTransportFeeStructure,
} from "../../api/Fees-Collection/fee-collection";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";

// Create buttons with hover underline animation
const AnimatedButton = ({
  label,
  onClick,
  disabled,
  startIcon,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  startIcon?: any;
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      startIcon={startIcon}
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

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const _currentMonth = moment().format("MMMM");
const _currentYear = moment().year();
const _currentAcademicYear = `${_currentYear}-${_currentYear + 1}`;

const CustomToolbar: React.FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

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

const FeeDetails: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  // const [applicationData, setApplicationData] = useState<any>([]);
  const [feeSummaryData, setFeeSummaryData] = useState<any>([]);
  const [feeCollectionReport, setFeeCollectionReport] = useState<any>();
  // const [pendingMonths, setPendingMonths] = useState<{}>({});
  // const [pendingMonthsTransport, setPendingMonthsTransport] = useState<{}>({});
  const [totalViewOnlyFees, setTotalViewOnlyFees] = useState<number>(0);
  const [collectedThisMonth, setCollectedThisMonth] = useState<number>(0);
  const [classFeeExpected_Month, setClassFeeExpected_Month] =
    useState<number>(0);
  const [transpFeeExpected_Month, setTranspFeeExpected_Month] =
    useState<number>(0);
  const [amountCollectedThisAY, setAmountCollectedThisAY] = useState<number>(0);
  const [transport_collection, setTransport_collection] = useState<number>(0);
  const [class_fee_collection, setClass_fee_collection] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [printingReceipt, setPrintingReceipt] = useState(false);
  const [fees_structure_records, setFees_structure_records] = useState<any>([]);
  const [class_student_summary, setClass_student_summary] = useState<any>([]);
  const [stops_student_summary, setStops_student_summary] = useState<any>([]);
  const [class_fees_summary, setClass_fees_summary] = useState<any>([]);
  const [stop_fees_summary, setStop_fees_summary] = useState<any>([]);
  const [
    fees_structure_records_trasnport,
    setFees_structure_records_trasnport,
  ] = useState<any>([]);

  interface FeeParticulars {
    [key: string]: number;
  }
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [selectedStudent, setSelectedStudent] = useState<any>();
  const [selected_fees_particulars, setSelected_fees_particulars] =
    useState<FeeParticulars>({});

  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const resetFormRef = useRef<() => void>(() => {});

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const current_month = moment().format("MMMM");
    const result = calculateExpectedFee(
      JSON.parse(JSON.stringify(class_student_summary)), // Deep copy of student summary
      JSON.parse(JSON.stringify(class_fees_summary)), // Deep copy of fees summary
      current_month
    );

    const result_transport = calculateExpectedFee(
      JSON.parse(JSON.stringify(stops_student_summary)), // Deep copy of student summary
      JSON.parse(JSON.stringify(stop_fees_summary)), // Deep copy of fees summary
      current_month
    );

    console.log(current_month);
    console.log(result);
    setClassFeeExpected_Month(result.totalExpectedFee);
    setTranspFeeExpected_Month(result_transport.totalExpectedFee);
  }, [
    class_student_summary,
    class_fees_summary,
    stop_fees_summary,
    stops_student_summary,
  ]);

  function calculateExpectedFee(
    classwiseStudentCount: any,
    classwiseFees: any,
    targetMonth: any
  ) {
    const expectedFeeCollection = {};

    let totalExpectedFee = 0;

    for (const className in classwiseFees) {
      if (classwiseFees[className].monthwise[targetMonth]) {
        const monthlyFee = classwiseFees[className].monthwise[targetMonth];
        const studentCount = classwiseStudentCount[className] || 0;

        const expectedAmount = monthlyFee * studentCount;
        //@ts-ignore
        expectedFeeCollection[className] = expectedAmount;

        totalExpectedFee += expectedAmount;
      }
    }

    return {
      expectedFeeCollection,
      totalExpectedFee,
    };
  }

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setProfileDialogOpen(false);
    setIsEditing(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        class_fees,
        transport_fees,
        class_wise_student_count,
        class_wise_total_fees,
        stop_wise_total_fees,
        stop_wise_student_count,
        fee_summary,
        fee_collection_report,
      ] = await Promise.all([
        GetClassFeeStructure(),
        GetTransportFeeStructure(),
        GetClassWiseStudentCount(),
        GetClassWiseTotalFees(),
        GetStopWiseTotalFees(),
        GetStopWiseStudentCount(),
        GetFeeSummary(),
        GetFeeCollectionReport(),
      ]);
      if (class_fees && class_fees.result) {
        const class_fees_json = class_fees.result.documents.map((fee: any) => ({
          ...fee,
          monthly_fees: JSON.parse(fee.monthly_fees || "[]"),
        }));

        console.log(class_fees_json);

        setFees_structure_records(class_fees_json);
      }
      if (transport_fees && transport_fees.result) {
        const transport_fees_json = transport_fees.result.documents.map(
          (fee: any) => ({
            ...fee,
            monthly_fees: JSON.parse(fee.monthly_fees || "[]"),
          })
        );

        console.log(transport_fees);

        setFees_structure_records_trasnport(transport_fees_json);
      }
      if (class_wise_student_count && class_wise_student_count.result) {
        console.log(class_wise_student_count.result);
        setClass_student_summary(class_wise_student_count.result);
      }
      if (class_wise_total_fees && class_wise_total_fees.result) {
        console.log(class_wise_total_fees.result);
        setClass_fees_summary(class_wise_total_fees.result);
      }
      if (stop_wise_total_fees && stop_wise_total_fees.result) {
        setStop_fees_summary(stop_wise_total_fees.result);
      }
      if (stop_wise_student_count && stop_wise_student_count.result) {
        console.log(stop_wise_student_count.result);
        setStops_student_summary(stop_wise_student_count.result);
      }
      if (fee_summary && fee_summary.result) {
        console.log(fee_summary.result);
        setFeeSummaryData(fee_summary.result);
      }
      if (fee_collection_report && fee_collection_report.result) {
        // console.log("fee_collection_report");
        // console.log(fee_collection_report.result);
        const collection_report_obj = fee_collection_report.result;
        const current_month_year = `${moment().format(
          "MMMM"
        )}-${moment().format("YYYY")}`;
        const transport_collection =
          collection_report_obj[current_month_year]?.transport_collection || 0;
        const class_fee_collection =
          collection_report_obj[current_month_year]?.class_fee_collection || 0;

        const overallTotalCollection = Object.values(
          collection_report_obj
        ).reduce(
          //@ts-ignore
          (sum, entry) => sum + entry.total_collection,
          0
        );

        console.log(
          `class_fee_collection: ${class_fee_collection}, transport_collection: ${transport_collection}, overallTotalCollection: ${overallTotalCollection}`
        );
        setClass_fee_collection(class_fee_collection);
        setTransport_collection(transport_collection);
        //@ts-ignore
        setAmountCollectedThisAY(parseFloat(overallTotalCollection));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      snackbarRef.current?.showSnackbar(`Error fetching data`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (isFeePaymentUpdated: any) => {
    console.log("Fee Details. Inside Handle Save Profile.");
    try {
      if (isFeePaymentUpdated) {
        await fetchData();
        snackbarRef.current?.showSnackbar("Fee Payment Updated", "success");
      } else {
        snackbarRef.current?.showSnackbar("Fee Payment Failed", "error");
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    }
  };

  const HandleFeeDepositClick = (data: any) => {
    console.log("View Clicked");
    console.log(data);
    try {
      setSelectedStudent({ student_id: data.student_id });
      setProfileDialogOpen(true);
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    }
  };

  const HandlePrintReceipt = async (data: any) => {
    console.log("HandlePrintReceipt");
    console.log(data);
    try {
      setPrintingReceipt(true);
      const response = await GetFeeCollectionRecords({
        student_id: data.student_id,
      });
      const fee_collection_records_str = response.result[0];
      const fee_collection_records_json = {
        ...fee_collection_records_str,
        monthly_payments: JSON.parse(
          fee_collection_records_str.monthly_payments || "[]"
        ),
      };
      //BIND DATA TO THE FORMAT AND SEND FOR PRINT
      console.log(fee_collection_records_json);
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setPrintingReceipt(false);
    }
  };

  const handleCellClick = (rowData: any) => {
    setSelectedRow(rowData);
    console.log("Row Data:", rowData);
    const currentMonth = moment().format("MMMM");
    const fees_particulars_obj = rowData.monthly_fees.find(
      (feeObj: any) => feeObj.month === currentMonth
    );

    setSelected_fees_particulars(fees_particulars_obj.fees_particulars);
    setTotalViewOnlyFees(fees_particulars_obj.total_fees);
  };

  // Columns for Fee Payments DataGrid

  const columns: GridColDef[] = [
    { field: "admission_id", headerName: "Admission ID", flex: 1 },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      valueGetter: (_, row) => row.name,
    },
    {
      field: "class_name",
      headerName: "Class",
      flex: 0.6,
      valueGetter: (_, row) => row.class_name,
    },
    {
      field: "section_name",
      headerName: "Sec",
      flex: 0.5,
      valueGetter: (_, row) => row.section_name,
    },
    {
      field: "roll_number",
      headerName: "Roll No",
      flex: 0.5,
      valueGetter: (_, row) => row.roll_number,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
      valueGetter: (_, row) => row.contact,
    },
    {
      field: "last_paid",
      headerName: "Last Paid",
      flex: 1,
      valueGetter: (_, row) => row.last_paid,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      // Since I need to use isPaid in multiple columns inside Material UI DataGrid.
      // Ishould compute it once and store it inside params.row.
      valueGetter: (_, row) => {
        return row.status;
      },
      renderCell: (params) => {
        // const isPaid = params.value === "Paid"; // Use precomputed value

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 1,
              backgroundColor:
                params.value === "Paid"
                  ? "#00c9a6"
                  : params.value === "Partial"
                  ? "#FDCDBE"
                  : "lightgray",
              borderRadius: 4,
              padding: "4px 8px",
              marginTop: 0.6,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  params.value === "Paid"
                    ? "green"
                    : params.value === "Partial"
                    ? "#FF825B"
                    : "gray",
              }}
            />
            <Typography variant="body2">
              {params.value === "Paid"
                ? "Paid"
                : params.value === "Partial"
                ? "Partial"
                : "Pending"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return row.status;
      },
      renderCell: (params) => {
        // const isPaid = params.row.payment_status === "Paid"; // Use computed value
        return (
          <>
            <AnimatedButton
              label="Fee Deposit"
              onClick={() => HandleFeeDepositClick(params.row)}
              disabled={params.value === "Paid"}
            />

            {"|"}
            <AnimatedButton
              label={printingReceipt ? "...Wait" : "Print Receipts"}
              onClick={() => HandlePrintReceipt(params.row)}
              disabled={printingReceipt || params.value !== "Paid"}
              startIcon={
                printingReceipt ? <CircularProgress size={10} /> : null
              }
            />
            {/* {printingReceipt ? (
              <CircularProgress size={20} />
            ) : (
              <AnimatedButton
                label={printingReceipt ? "...Wait" : "Print Receipts"}
                onClick={() => HandlePrintReceipt(params.row)}
                disabled={params.value !== "Paid"}
                startIcon={
                  printingReceipt ? <CircularProgress size={20} /> : null
                }
              />
            )} */}
            {"|"}
            <AnimatedButton
              label="History"
              onClick={() => console.log("Get TC Clicked")}
              disabled={false}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={2}
        pb={0}
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
          startIcon={
            !loading ? <RefreshIcon /> : <CircularProgress size={20} />
          }
          onClick={async () => await fetchData()}
          disabled={loading}
          sx={{
            backgroundColor: "#ff825b",
          }}
        >
          {loading ? "...Refreshing" : "Refresh Data"}
        </MyCustomButton>
      </Box>
      <Box display={"flex"} flexDirection={"column"} p={2} height="auto">
        <Grid container direction={"row"} gap={1}>
          {/* School Fee and Transport Fee Summary Box */}
          <Grid container direction="column" gap={1} xs={3} spacing={1}>
            {/* School Fee Summary Box */}
            <Grid item xs={3}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  p: 2,
                  backgroundColor: "transparent",
                  border: "1.7px solid #FF825B",
                  borderRadius: "8px",
                  height: "7em",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  textAlign={"center"}
                  gap={2}
                >
                  <DateRangeIcon
                    style={{
                      width: "50px",
                      height: "50px",
                      color: "#2E186A",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ color: "#2E186A", alignSelf: "center" }}
                  >
                    {`School Fee - ${moment().format("MMM")}`}
                  </Typography>
                </Box>
                {!loading ? (
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      textAlign={"center"}
                      gap={5}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        Amount Received
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        {/* ₹ {collectedThisMonth} */}₹ {class_fee_collection}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      textAlign={"center"}
                      gap={5}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        Amount Expected
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        ₹ {classFeeExpected_Month}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                  >
                    <CircularProgress />
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Transport Fee Summary Box */}
            <Grid item xs={3}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  p: 2,
                  backgroundColor: "transparent",
                  border: "1.7px solid #FF825B",
                  borderRadius: "8px",
                  height: "7em",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  textAlign={"center"}
                  gap={2}
                >
                  <DirectionsBusIcon
                    style={{
                      width: "50px",
                      height: "50px",
                      color: "#2E186A",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ color: "#2E186A", alignSelf: "center" }}
                  >
                    {`Transport Fee - ${moment().format("MMM")}`}
                  </Typography>
                </Box>
                {!loading ? (
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      textAlign={"center"}
                      gap={5}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        Amount Received
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        {/* ₹ {collectedThisMonth} */}₹ {transport_collection}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      textAlign={"center"}
                      gap={5}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        Amount Expected
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                      >
                        ₹ {transpFeeExpected_Month}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100px"
                  >
                    <CircularProgress />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          {/*Total Expense and Total Collection Box */}
          <Grid container direction="column" gap={1} xs={2} spacing={1}>
            {/*Total Expense Box */}
            <Grid item xs={3}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  p: 2,
                  backgroundColor: "transparent",
                  border: "1.7px solid #FF825B",
                  borderRadius: "8px",
                  height: "7em",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#cb3d64",
                      alignSelf: "center",
                      cursor: "pointer",
                    }}
                  >
                    <strong>Total Expense</strong>
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    sx={{
                      color: "rgb(255, 255, 255)",
                      alignSelf: "center",
                      background: "#FF825B",
                      padding: 0.2,
                      borderRadius: 2,
                    }}
                  >
                    {_currentAcademicYear}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                  >
                    {/* ₹ {amountCollectedThisAY} */}₹ XXXX
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/*Total Collection Box */}
            <Grid item xs={3}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                  p: 2,
                  backgroundColor: "transparent",
                  border: "1.7px solid #FF825B",
                  borderRadius: "8px",
                  height: "7em",
                }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "#2E186A", alignSelf: "center" }}
                  >
                    <strong>Total Collection</strong>
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={1}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    sx={{
                      color: "rgb(255, 255, 255)",
                      alignSelf: "center",
                      background: "#FF825B",
                      padding: 0.2,
                      borderRadius: 2,
                    }}
                  >
                    {_currentAcademicYear}
                  </Typography>
                  {!loading ? (
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                      sx={{ color: "rgb(99, 100, 101)", alignSelf: "center" }}
                    >
                      ₹ {amountCollectedThisAY}
                    </Typography>
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="50px"
                    >
                      <CircularProgress size={20} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/*Fee Structure and View Particulars Box */}
          <Grid container direction="row" gap={1} xs={7}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{
                p: 1,
                backgroundColor: "transparent",
                border: "1.7px solid #FF825B",
                borderRadius: "8px",
                width: "100%",
                // height: "18em",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={2}
                // height={"100%"}
              >
                {/*List of Class Fee Structure */}
                <Box
                  display="flex"
                  flexDirection={"column"}
                  // columnGap={1}
                  width={"30%"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  height={"18em"}
                >
                  <TableContainer
                    component={Paper}
                    // elevation={4}
                    sx={{
                      height: "100%", // Ensures the table fits its parent's height
                      overflowX: "hidden", // Hides horizontal scroll
                      overflowY: "hidden", // Enables vertical scrolling for overflow
                      backgroundColor: "transparent",
                      "&:hover": {
                        overflowY: "auto", // Shows scrollbar on hover
                      },
                      "&::-webkit-scrollbar": {
                        width: "8px", // Slim width
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888", // Thumb color
                        borderRadius: "4px", // Rounded edges
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#2E186A", // Thumb color on hover
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1", // Track color
                        borderRadius: "4px", // Rounded edges for the track
                      },
                    }}
                  >
                    {/* Fee head Details will come here */}
                    {!loading ? (
                      <Table size="small" aria-label="a dense table">
                        <TableBody>
                          {fees_structure_records &&
                            fees_structure_records.map(
                              (fees_structure: any) => (
                                <TableRow
                                  key={fees_structure.fees_structure_id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                    transition: "transform 0.2s ease-in-out", // Smooth animation
                                    background:
                                      selectedRow.fees_structure_id ===
                                      fees_structure.fees_structure_id
                                        ? "#f0f0f0"
                                        : "transparent",
                                    "&:hover": {
                                      // transform: "translate(-4px, -4px)", // Raise the row slightly
                                      transform: "scale(1.01)",
                                      backgroundColor: "#f5f5f5", // Optional: Add a subtle background color change
                                      "& td, & th": {
                                        color: "#2E186A", // Change text color on hover
                                        fontWeight: "bold",
                                      },
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                      fontWeight:
                                        selectedRow.fees_structure_id ===
                                        fees_structure.fees_structure_id
                                          ? "bold"
                                          : "",
                                      color:
                                        selectedRow.fees_structure_id ===
                                        fees_structure.fees_structure_id
                                          ? "#2E186A"
                                          : "",
                                    }}
                                  >
                                    {`${
                                      fees_structure.class
                                    } - ${moment().format("MMM")}`}
                                    {/* {`${fees_structure.class} - ${moment().format(
                                  "MM"
                                )} - ${fees_structure.academic_year}`} */}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    onClick={() =>
                                      handleCellClick(fees_structure)
                                    }
                                  >
                                    {
                                      <VisibilityIcon
                                        style={{
                                          cursor: "pointer",
                                          color: "#2E186A",
                                        }}
                                      />
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100px"
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </TableContainer>
                </Box>

                {/*List of Transport Fee Structure */}
                <Box
                  display="flex"
                  flexDirection={"column"}
                  // columnGap={1}
                  width={"30%"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  height={"18em"}
                >
                  <TableContainer
                    component={Paper}
                    // elevation={4}
                    sx={{
                      height: "100%", // Ensures the table fits its parent's height
                      overflowX: "hidden", // Hides horizontal scroll
                      overflowY: "hidden", // Enables vertical scrolling for overflow
                      backgroundColor: "transparent",
                      "&:hover": {
                        overflowY: "auto", // Shows scrollbar on hover
                      },
                      "&::-webkit-scrollbar": {
                        width: "8px", // Slim width
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888", // Thumb color
                        borderRadius: "4px", // Rounded edges
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#2E186A", // Thumb color on hover
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1", // Track color
                        borderRadius: "4px", // Rounded edges for the track
                      },
                    }}
                  >
                    {/* Fee head Details will come here */}
                    {!loading ? (
                      <Table size="small" aria-label="a dense table">
                        <TableBody>
                          {fees_structure_records_trasnport &&
                            fees_structure_records_trasnport.map(
                              (fees_structure: any) => (
                                <TableRow
                                  key={fees_structure.transport_structure_id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                    transition: "transform 0.2s ease-in-out", // Smooth animation
                                    background:
                                      selectedRow.transport_structure_id ===
                                      fees_structure.transport_structure_id
                                        ? "#f0f0f0"
                                        : "transparent",
                                    "&:hover": {
                                      // transform: "translate(-4px, -4px)", // Raise the row slightly
                                      transform: "scale(1.01)",
                                      backgroundColor: "#f5f5f5", // Optional: Add a subtle background color change
                                      "& td, & th": {
                                        color: "#2E186A", // Change text color on hover
                                        fontWeight: "bold",
                                      },
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                      fontWeight:
                                        selectedRow.transport_structure_id ===
                                        fees_structure.transport_structure_id
                                          ? "bold"
                                          : "",
                                      color:
                                        selectedRow.transport_structure_id ===
                                        fees_structure.transport_structure_id
                                          ? "#2E186A"
                                          : "",
                                    }}
                                  >
                                    {`${
                                      fees_structure.stop_name
                                    } - ${moment().format("MMM")}`}
                                    {/* {`${fees_structure.class} - ${moment().format(
                                  "MM"
                                )} - ${fees_structure.academic_year}`} */}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    onClick={() =>
                                      handleCellClick(fees_structure)
                                    }
                                  >
                                    {
                                      <VisibilityIcon
                                        style={{
                                          cursor: "pointer",
                                          color: "#2E186A",
                                        }}
                                      />
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100px"
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </TableContainer>
                </Box>

                {/*View of Fee Particulars */}
                <Box
                  display="flex"
                  flexDirection={"column"}
                  columnGap={1}
                  width={"60%"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  height={"18em"}
                >
                  {Object.entries(selected_fees_particulars as FeeParticulars)
                    .length > 0 && (
                    <Typography
                      variant="h5"
                      alignSelf={"center"}
                      sx={{ opacity: "0.8" }}
                    >
                      {"Fees Particulars"}
                    </Typography>
                  )}
                  {Object.entries(selected_fees_particulars as FeeParticulars)
                    .length > 0 ? (
                    Object.entries(
                      selected_fees_particulars as FeeParticulars
                    ).map(([key, value]) => {
                      return (
                        <>
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            gap={0}
                            width={"90%"}
                            key={key}
                          >
                            <Box
                              display={"flex"}
                              flexDirection="row"
                              justifyContent={"space-between"}
                            >
                              <Typography variant="h6">
                                {key
                                  .split(" ")
                                  .map((word) =>
                                    word
                                      .slice(0, 1)
                                      .toUpperCase()
                                      .concat(word.slice(1, key.length))
                                  )
                                  .join(" ")}
                              </Typography>
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"flex-start"}
                                alignItems="flex-start"
                                width={"15%"}
                              >
                                <Typography
                                  variant="h6"
                                  alignSelf={"flex-start"}
                                >
                                  <strong>₹ {value}</strong>
                                </Typography>
                              </Box>
                            </Box>
                            <Divider />
                          </Box>
                        </>
                      );
                    })
                  ) : (
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      gap={0}
                      width={"90%"}
                      height={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Typography
                        variant="h5"
                        alignSelf={"center"}
                        sx={{ opacity: "0.5" }}
                      >
                        {"NO DATA"}
                      </Typography>
                    </Box>
                  )}
                  {totalViewOnlyFees > 0 && (
                    <Typography variant="h6">
                      <strong>TOTAL ₹ {totalViewOnlyFees}</strong>
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/**This is Datagrid */}
        <Grid container direction="column" mt={4}>
          <Grid item xs={12}>
            <DataGrid
              // rows={applicationData}
              rows={feeSummaryData}
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
              sx={{
                width: "97vw",
                maxWidth: "100vw",
                height: "65vh",
                marginTop: "15px",

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
            />
          </Grid>
        </Grid>
      </Box>

      {isProfileDialogOpen && (
        <ProfileDialogFeesPayment
          isOpen={isProfileDialogOpen}
          onClose={onClose}
          onSubmit={handleSaveProfile}
          profileData={selectedStudent}
          // profileData={pendingMonths}
          resetFormRef={resetFormRef}
          isEditing={true}
        />
      )}
    </>
  );
};

export default FeeDetails;
