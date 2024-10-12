import React, { useContext, useEffect, useState } from "react";
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
// const CustomToolbar: React.FC = () => {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarFilterButton />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// };

// const getStatusStyle = (status: string, dueDate: string) => {
//   const _dueDate = new Date(dueDate);
//   const daysDiff = _dueDate.getDate() - new Date().getDate();
//   if (status === "Paid") {
//     return {
//       status: "Paid",
//       style: { backgroundColor: "#d4edda", color: "#155724" },
//     }; // Elegant Green
//   } else if (daysDiff <= 4 && daysDiff >= 0) {
//     return {
//       status: "Upcoming",
//       style: { backgroundColor: "#fff3cd", color: "#856404" },
//     }; // Elegant Amber
//   } else if (daysDiff < 0) {
//     return {
//       status: "Overdue",
//       style: { backgroundColor: "#f8d7da", color: "#721c24" },
//     }; // Elegant Red
//   }
//   return {};
// };

// const rows: any[] = [
//   {
//     id: 1,
//     transId: 1001,
//     studentName: "John Doe",
//     guardianName: "Jane Doe",
//     contact: "123-456-7890",
//     feeAmount: 500,
//     dueDate: "2014-09-15",
//     amountPaid: 200,
//     // balance: 300,
//     paymentStatus: "",
//     paymentDate: "",
//   },
//   {
//     id: 2,
//     transId: 1002,
//     studentName: "Mary Jane",
//     guardianName: "Peter Parker",
//     contact: "987-654-3210",
//     feeAmount: 600,
//     dueDate: "2014-09-20",
//     amountPaid: 0,
//     // balance: 0,
//     paymentStatus: "Paid",
//     paymentDate: "2024-09-10",
//   },
//   {
//     id: 3,
//     transId: 1003,
//     studentName: "Pallav umar",
//     guardianName: "Peter Parker",
//     contact: "987-654-3210",
//     feeAmount: 600,
//     dueDate: "2014-09-20",
//     amountPaid: 0,
//     // balance: 0,
//     paymentStatus: "",
//     paymentDate: "",
//   },
// ];

// Custom No Data Component

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
  if (lastPaidMonth) {
  } else {
    console.log("First time payment");
    const today = moment();
    const feeDueDate = moment().date(monthFeeTimeGap_days);

    if (today.isAfter(feeDueDate)) {
      console.log("Fee overdue");
    } else if (today.isSame(feeDueDate)) {
      console.log("Today is the last day");
    } else {
      console.log("Fee payment not active yet");
    }
  }
};

const FeesOverView = () => {
  const {
    selectedStudent,
    _userId,
  }: { selectedStudent: studentData; _userId: string } = useOutletContext();

  const [feeData, setFeeData] = useState<any>();

  useEffect(() => {
    console.log("Inside Fees Overview screen");
    //0. Fee table should have userId, phone, student_docId, transId, month, due_date, payment_date, amount
    //1. Load all past payments for given user ID
    // const feeData = [
    //   {
    //     //Gaurav
    //     userId: "670128a30034d22f9e5c",
    //     student_doc_id: "6703627b001f9504a6cb",
    //     transactionId: "",
    //     FeeForMonth: "",
    //     dueDate: "",
    //     paymentDate: "",
    //     feeAmount: 0,
    //   },
    //   {
    //     //Gaurav
    //     userId: "670128a30034d22f9e5c",
    //     student_doc_id: "6703627b001f9504a6cb",
    //     transactionId: "",
    //     FeeForMonth: "",
    //     dueDate: "",
    //     paymentDate: "",
    //     feeAmount: 0,
    //   },
    //   {
    //     //Pallav
    //     userId: "670128a30034d22f9e5c",
    //     student_doc_id: "67014fe30014337de953",
    //     transactionId: "",
    //     FeeForMonth: "",
    //     dueDate: "",
    //     paymentDate: "",
    //     feeAmount: 0,
    //   },
    //   {
    //     //Pallav
    //     userId: "670128a30034d22f9e5c",
    //     student_doc_id: "67014fe30014337de953",
    //     transactionId: "",
    //     FeeForMonth: "",
    //     dueDate: "",
    //     paymentDate: "",
    //     feeAmount: 0,
    //   },
    //   {
    //     //Pallav
    //     userId: "670128a30034d22f9e5c",
    //     student_doc_id: "67014fe30014337de953",
    //     transactionId: "",
    //     FeeForMonth: "",
    //     dueDate: "",
    //     paymentDate: "",
    //     feeAmount: 0,
    //   },
    // ];
    const feeData: any = []; //Empty as no data present
    if (feeData && feeData.length === 0) {
      console.log("No fee Data available. Paying for the first time");
      setFeeData(feeData);
      checkIfFeePaymentActive(null);
    } else {
      //Filter master data based on selected student's ducument Id
      //2. Save this master data into useState. To be filtered based on student's selection
      setFeeData(feeData);
      //3. Check for last payement Month and current Month
      //4. If last payment month and current month is same ---> No dues. Button should be disabled
      //5. If current month is subsequent month(s) of last payment month ----> Show active payment. Button should be enabled now
      //6. IT should also check for overdue months
    }
  }, []);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  // Columns for Fee Payments DataGrid
  const columns: GridColDef[] = [
    { field: "transId", headerName: "Transaction ID", flex: 1 },
    { field: "FeeForMonth", headerName: "Month", flex: 1 },
    {
      field: "feeAmount",
      headerName: "Fee Amount",
      flex: 1,
    },
    { field: "dueDate", headerName: "Due Date", flex: 1 },

    { field: "paymentDate", headerName: "Payment Date", flex: 1 },

    // {
    //   field: "paymentStatus",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: (params) => {
    //     const { paymentStatus, dueDate } = params.row;
    //     const { status, style } = getStatusStyle(paymentStatus, dueDate);

    //     return (
    //       // <MyCustomButton
    //       //   variant="contained"
    //       //   color="primary"
    //       //   customcolor="#e66980"
    //       //   custombackground="#c44f68"
    //       //   // startIcon={<LockIcon />}
    //       //   endIcon={<ShoppingCartOutlinedIcon fontSize="medium" />}
    //       //   onClick={() => {
    //       //     console.log("Update fee context");
    //       //     fee_context?.dispatch_Fee_payment({
    //       //       type: "ADD_TO_CART_FEES_PAYMENT",
    //       //       payload: {
    //       //         type: "FEES_PAYMENT",
    //       //         student: selectedStudent,
    //       //         status: "PENDING_PAYMENT",
    //       //       },
    //       //     });
    //       //   }}
    //       // >
    //       //   ADD TO
    //       // </MyCustomButton>
    //       <Typography
    //         sx={{
    //           mt: 1,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           width: "60%",
    //           borderRadius: "4px",
    //           textAlign: "center",
    //           ...style,
    //         }}
    //       >
    //         {status}
    //       </Typography>
    //     );
    //   },
    // },
  ];

  return (
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
            rows={feeData as any[]}
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
          >
            Make Payment
          </MyCustomButton>
        </Link>
      </Box>
    </Box>
  );
};

export default FeesOverView;
