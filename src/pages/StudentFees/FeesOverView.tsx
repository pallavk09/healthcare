import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Box, Divider, Typography, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridOverlay,
} from "@mui/x-data-grid";
import { studentData } from "../../common/types";
import { MyCustomButton } from "../../common/MyCustomControls";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import moment from "moment";
import { monthFeeTimeGap_days } from "../../Config/feeConfig";
import userDataContext from "../../store/userContext";
import { jwtDecode } from "jwt-decode";
import { GetFeeData } from "../../api/fees";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";

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

const checkIfFeePaymentActive = (lastPaidMonth: any) => {
  let activePayment = false;
  if (lastPaidMonth) {
  } else {
    console.log("First time payment");
    const today = moment();
    const feeDueDate = moment().date(monthFeeTimeGap_days);

    if (today.isAfter(feeDueDate)) {
      console.log("Fee overdue");
      activePayment = true;
    } else if (today.isSame(feeDueDate)) {
      console.log("Today is the last day");
      activePayment = true;
    } else {
      console.log("Fee payment not active yet");
    }
  }

  return activePayment;
};

const FeesOverView = () => {
  const ctx_userData = useContext(userDataContext);
  const { selectedStudent }: { selectedStudent: studentData; _userId: string } =
    useOutletContext();

  const snackbarRef = useRef<SnackbarHandle>(null);

  const [feeData, setFeeData] = useState<any | []>([]);
  const [feeDataFilterd, setFeeDataFiltered] = useState<any | []>([]);
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const [feePaymentActive, setFeePaymentActive] = useState<boolean>(false);

  useEffect(() => {
    console.log("Under useEffect of FeesOverView.");
    console.log(ctx_userData?.user_state);
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    if (ctx_userData?.user_state.phone && ctx_userData?.user_state.userId) {
      console.log("Phone and userId already present in context");
      setPhone(ctx_userData?.user_state.phone);
      setUserId(ctx_userData?.user_state.userId);
    } else if (accessToken) {
      console.log("Phone and userId not there in context");
      console.log("Token found. Updating context");
      const accessToken_decode = jwtDecode(accessToken) as {
        phone: string;
        userId: string;
      };
      console.log("Token found. Decoded");
      console.log(accessToken_decode);
      setPhone(accessToken_decode.phone);
      setUserId(accessToken_decode.userId);

      ctx_userData?.user_dispatch({
        type: "UPDATE_USER_LOGGEDIN",
        payload: {
          phone: accessToken_decode.phone,
          userId: accessToken_decode.userId,
        },
      });

      const LoadFeesData = async (userId: string) => {
        try {
          console.log(`Calling GetFeeData. userId!: ${userId}`);
          const feesData = await GetFeeData(userId!);
          if (feesData?.result && feesData?.result.length > 0) {
            console.log("Fees data present");
            setFeeData(feesData.result);
          } else {
            console.log("Fees data empty. Need to pay for the current month");
            let activePayment = checkIfFeePaymentActive(null);
            console.log(`Checking for active fees payemnt: ${activePayment}`);
            activePayment &&
              snackbarRef.current?.showSnackbar(
                `Fees payment is pending. Click on Make Payment button below.`,
                "info"
              );
            setFeePaymentActive(activePayment);
            setFeeData([]);
          }
        } catch (error: any) {
          console.log("Error while fetching fees data: ", error.message);
          snackbarRef.current?.showSnackbar(
            `Error while fetching data ${error.message}`,
            "error"
          );
        }
      };

      LoadFeesData(accessToken_decode.userId);
    }

    //0. Fee table should have userId, phone, student_docId, transId, month, due_date, payment_date, amount
    //1. Load all past payments for given user ID

    // const feeData: any = []; //Empty as no data present
    // if (feeData && feeData.length === 0) {
    //   console.log("No fee Data available. Paying for the first time");
    //   setFeeData(feeData);
    //   checkIfFeePaymentActive(null);
    // } else {
    //   //Filter master data based on selected student's ducument Id
    //   //2. Save this master data into useState. To be filtered based on student's selection
    //   setFeeData(feeData);
    //   //3. Check for last payement Month and current Month
    //   //4. If last payment month and current month is same ---> No dues. Button should be disabled
    //   //5. If current month is subsequent month(s) of last payment month ----> Show active payment. Button should be enabled now
    //   //6. IT should also check for overdue months
    // }
  }, []);

  useEffect(() => {
    let feesDataFiltered = feeData.filter(
      (row: any) => row.student_docId === selectedStudent.documentId
    );

    console.log("Filtered Row");
    console.log(feesDataFiltered);
    setFeeDataFiltered(feesDataFiltered);
  }, [selectedStudent]);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  // Columns for Fee Payments DataGrid
  const columns: GridColDef[] = [
    { field: "transId", headerName: "Transaction ID", flex: 1 },
    { field: "month", headerName: "Month", flex: 1 },
    {
      field: "amount",
      headerName: "Fee Amount",
      flex: 1,
    },
    { field: "due_date", headerName: "Due Date", flex: 1 },

    { field: "payment_date", headerName: "Payment Date", flex: 1 },
  ];

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        p={1}
        gap={0.75}
        width={"100%"}
      >
        <Box
          textAlign={"left"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          gap={2}
        >
          <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
            <strong> Full Name:</strong>{" "}
            {selectedStudent?.studentObj?.personalDetails.studentfullname
              .toString()
              .toUpperCase()}
          </Typography>{" "}
          <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
            <strong>Guardian:</strong>{" "}
            {selectedStudent?.studentObj?.guardianDetails.guardianname
              .toString()
              .toUpperCase()}
          </Typography>
          <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
            <strong>Std:</strong>{" "}
            {selectedStudent?.studentObj?.academicsDetails.class
              .toString()
              .toUpperCase()}
          </Typography>
          <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
            <strong>Div:</strong>{" "}
            {selectedStudent?.studentObj?.academicsDetails.section
              .toString()
              .toUpperCase()}
          </Typography>
        </Box>
        <Divider
          style={{ color: "#FF825C", border: "1.5px solid rgb(255, 130, 92)" }}
        />
        <Grid container direction="column" mt={1}>
          <Grid item xs={12}>
            <DataGrid
              sx={{
                maxWidth: "70vw",
                height: 350, // Fixed height for the grid
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1e88e5",
                  color: "#2e186a",
                  fontSize: "1rem",
                  borderBottom: "2px solid #fff",
                },
              }}
              rows={feeDataFilterd as any[]}
              columns={columns}
              rowHeight={40}
              // autoHeight
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel} // Controls pagination behavior
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </Grid>
        </Grid>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Link to={".."} relative="path" style={{ textDecoration: "none" }}>
            <MyCustomButton
              variant="contained"
              color="primary"
              startIcon={<NavigateBeforeIcon />}
            >
              Back to Dashboard
            </MyCustomButton>
          </Link>

          <Link
            to={`/student/${_userId}/paymentcart`}
            relative="path"
            style={{ textDecoration: "none" }}
          >
            <MyCustomButton
              variant="contained"
              color="primary"
              endIcon={<ChevronRightIcon />}
              customcolor="#007e67"
              custombackground="#00b49a"
            >
              View Active Payments
            </MyCustomButton>
          </Link>

          {/* {!feePaymentActive ? (
            <MyCustomButton
              variant="contained"
              color="primary"
              endIcon={<ChevronRightIcon />}
              disabled
            >
              Make Payment
            </MyCustomButton>
          ) : (
            <Link
              to={`/student/${_userId}/paymentcart`}
              relative="path"
              style={{ textDecoration: "none" }}
            >
              <MyCustomButton
                variant="contained"
                color="primary"
                endIcon={<ChevronRightIcon />}
                customcolor="#007e67"
                custombackground="#00b49a"
              >
                Make Payment
              </MyCustomButton>
            </Link>
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default FeesOverView;
