import React from "react";
import { Button, Card, Typography, Box } from "@mui/material";
import FeeDetails from "../../pages/FeeDetails";

const dummyData = [
  {
    "Fee Amount": "500",
    "Due Date": "30-Sep-2024",
    "Payment Date": "25-Sep-2024",
    "Trasnaction ID": "64737-36yt-776",
  },
  {
    "Fee Amount": "1000",
    "Due Date": "30-Sep-2024",
    "Payment Date": "",
    "Trasnaction ID": "",
  },
  {
    "Fee Amount": "2000",
    "Due Date": "01-Aug-2024",
    "Payment Date": "10-Aug-2024",
    "Trasnaction ID": "64737-36yt-776",
  },
];
const FeePaymentCard = ({
  feeAmount,
  dueDate,
  paymentDate,
  status,
}: {
  feeAmount: any;
  dueDate: any;
  paymentDate: any;
  status: any;
}) => {
  return (
    <>
      <Card
        sx={{
          borderRadius: "12px",
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "95%",
          margin: "5px 0",
          minHeight: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Fee Amount */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              <strong>Fee Amount:</strong>
            </Typography>
            <Typography variant="body1">${feeAmount}</Typography>
          </Box>

          {/* Due Date */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              <strong>Due Date:</strong>
            </Typography>
            <Typography variant="body1">{dueDate}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              <strong>Payment Date:</strong>
            </Typography>
            <Typography variant="body1">{dueDate}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">
              <strong>Trasnaction ID:</strong>
            </Typography>
            <Typography variant="body1">{"64737-36yt-776"}</Typography>
          </Box>

          {/* Payment Status */}
          <Box sx={{ flex: 1, textAlign: "right" }}>
            {/* <Typography variant="body1">
                <strong>Payment Status:</strong>
              </Typography> */}
            {status === "Paid" ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "50px",
                  textTransform: "none",
                  borderRadius: "20px",
                  background: "#ef006e",
                  "&:disabled": {
                    color: "#fff",
                    backgroundColor: "#008c6f",
                  },
                }}
                disabled={true}
              >
                PAID
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  background: "#ef006e",
                  "&:hover": {
                    color: "#fff",
                    border: "1px solid rgb(255, 130, 92)",
                    backgroundColor: "rgb(255, 130, 92)",
                  },
                }}
                onClick={() => alert("Redirect to payment")}
              >
                PAY NOW
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default FeePaymentCard;
