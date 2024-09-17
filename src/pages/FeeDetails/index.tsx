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
import { Typography, Box, Grid } from "@mui/material";

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
    feeAmount: 500,
    dueDate: "2014-09-15",
    amountPaid: 200,
    // balance: 300,
    paymentStatus: "",
    paymentDate: "",
  },
  {
    id: 2,
    registrationId: 1002,
    studentName: "Mary Jane",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    feeAmount: 600,
    dueDate: "2014-09-20",
    amountPaid: 0,
    // balance: 0,
    paymentStatus: "Paid",
    paymentDate: "2024-09-10",
  },
  {
    id: 3,
    registrationId: 1003,
    studentName: "Pallav umar",
    guardianName: "Peter Parker",
    contact: "987-654-3210",
    feeAmount: 600,
    dueDate: "2014-09-20",
    amountPaid: 0,
    // balance: 0,
    paymentStatus: "",
    paymentDate: "",
  },
  // Add more rows...
];

const totalFeeAmount = 5000; // Replace with actual calculation
const totalAmountPaid = 3000; // Replace with actual calculation
const totalBalance = totalFeeAmount - totalAmountPaid;
const pendingPayments = 5; // Replace with actual count
const overduePayments = 2; // Replace with actual count

const FeeDetails: React.FC<any> = (props) => {
  React.useState<any>(null);
  console.log("Props received");
  console.log(props);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 5 });

  // Helper function to determine cell color based on status and date
  const getStatusStyle = (status: string, dueDate: string) => {
    // const today = new Date();
    const _dueDate = new Date(dueDate);
    // const daysDiff = Math.ceil(
    //   (_dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    // );
    const daysDiff = _dueDate.getDate() - new Date().getDate();
    console.log("Days Diff", daysDiff);
    if (status === "Paid") {
      return {
        status: "Paid",
        style: { backgroundColor: "#d4edda", color: "#155724" },
      }; // Elegant Green
    } else if (daysDiff <= 4 && daysDiff >= 0) {
      return {
        status: "Upcoming",
        style: { backgroundColor: "#fff3cd", color: "#856404" },
      }; // Elegant Amber
    } else if (daysDiff < 0) {
      return {
        status: "Overdue",
        style: { backgroundColor: "#f8d7da", color: "#721c24" },
      }; // Elegant Red
    }
    return {};
  };

  // Columns for Fee Payments DataGrid
  const columns: GridColDef[] = [
    { field: "registrationId", headerName: "Registration ID", width: 150 },
    { field: "studentName", headerName: "Student Name", width: 200 },
    { field: "guardianName", headerName: "Guardian Name", width: 200 },
    { field: "contact", headerName: "Contact", width: 180 },
    {
      field: "feeAmount",
      headerName: "Fee Amount",
      width: 150,
      type: "number",
      renderCell: (params) => `$${params.value}`,
    },
    { field: "dueDate", headerName: "Due Date", width: 180 },
    {
      field: "amountPaid",
      headerName: "Amount Paid",
      width: 150,
      type: "number",
      renderCell: (params) => `$${params.value}`,
    },
    // {
    //   field: "balance",
    //   headerName: "Balance",
    //   width: 150,
    //   type: "number",
    //   renderCell: (params) => `$${params.value}`,
    // },
    { field: "paymentDate", headerName: "Payment Date", width: 180 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        const { paymentStatus, dueDate } = params.row;
        const { status, style } = getStatusStyle(paymentStatus, dueDate);

        return (
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              borderRadius: "4px",
              padding: "8px",
              textAlign: "center",
              mt: 0.8,
              ...style,
            }}
          >
            {status}
          </Typography>
        );
      },
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
              <Typography variant="body1">Total Fee Amount</Typography>
              <Typography variant="h4">{totalFeeAmount}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ p: 2, backgroundColor: "#e0f7fa", borderRadius: "8px" }}>
              <Typography variant="body1">Total Amount Paid</Typography>
              <Typography variant="h4">{totalAmountPaid}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ p: 2, backgroundColor: "#fff3e0", borderRadius: "8px" }}>
              <Typography variant="body1">Pending Payments</Typography>
              <Typography variant="h4">{pendingPayments}</Typography>
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
              <Typography variant="body1">Overdue Payments</Typography>
              <Typography variant="h4">{overduePayments}</Typography>
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
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FeeDetails;
