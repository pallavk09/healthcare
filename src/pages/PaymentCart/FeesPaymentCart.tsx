import { Box, Divider, Typography, Grid } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import Container from "../../common/Container";
import { MyCustomButton } from "../../common/MyCustomControls";
import LockIcon from "@mui/icons-material/Lock";
import {
  cartContextType_FEE,
  feePaymentContext,
} from "../../store/cartContext";
import { feeConfig } from "../../Config/feeConfig";
import { Link } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const FeesPaymentCart = () => {
  const fee_context = useContext(feePaymentContext);
  const [cartItems, setCartItems] = useState<cartContextType_FEE[] | []>([]);

  useEffect(() => {
    console.log("Inside Fees Payment cart");

    const cartItems = fee_context?.state_Fee_payment;
    setCartItems(cartItems!);
  }, []);

  const getFeeDetailsElement = (items: cartContextType_FEE[]) => {
    return items.map((obj, index) => {
      const className = obj.student.studentObj.academicsDetails.class;
      const tution = feeConfig[className].tution;
      const computer = feeConfig[className].computer;
      const library = feeConfig[className].library;
      const annual = feeConfig[className].annual;
      const activity = feeConfig[className].activity;
      const total = tution + computer + library + annual + activity;

      return (
        <Box width={"90%"} mt={1} mb={1} boxShadow={4} p={2} key={index}>
          <Box
            p={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>{`Name: ${obj.student.studentObj.personalDetails.studentfullname}`}</Typography>
            <Typography>{`Std: ${obj.student.studentObj.academicsDetails.class}`}</Typography>
            <Typography>{`Div: ${obj.student.studentObj.academicsDetails.section}`}</Typography>
            <Typography>{`Roll No: ${obj.student.studentObj.academicsDetails.rollnumber}`}</Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>
              <strong>Sr.</strong>
            </Typography>
            <Typography textAlign={"left"}>
              <strong>Particulars</strong>
            </Typography>
            <Typography>
              <strong>Amount</strong>
            </Typography>
          </Box>
          <Divider
            style={{
              color: "#000",
              border: "0.5px solid",
            }}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>1</Typography>
            <Typography textAlign={"left"}>Tution Fee</Typography>
            <Typography>{tution} INR</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>2</Typography>
            <Typography textAlign={"left"}>Computer Fee</Typography>
            <Typography>{computer} INR</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>3</Typography>
            <Typography textAlign={"left"}>Library Fee</Typography>
            <Typography>{library} INR</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>4</Typography>
            <Typography textAlign={"left"}>Annual Fee</Typography>
            <Typography>{annual} INR</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>5</Typography>
            <Typography textAlign={"left"}>Activity Fee</Typography>
            <Typography>{activity} INR</Typography>
          </Box>
          <Divider
            style={{
              color: "#000",
              border: "0.5px solid",
            }}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography>
              <strong>Total Amount</strong>
            </Typography>
            <Typography>
              <strong>{total} INR</strong>
            </Typography>
          </Box>
        </Box>
      );
    });
  };

  const getSummaryElement = (items: cartContextType_FEE[]) => {
    return items.map((obj, index) => {
      const className = obj.student.studentObj.academicsDetails.class;
      const tution = feeConfig[className].tution;
      const computer = feeConfig[className].computer;
      const library = feeConfig[className].library;
      const annual = feeConfig[className].annual;
      const activity = feeConfig[className].activity;
      const total = tution + computer + library + annual + activity;

      return (
        <Box textAlign={"left"} m={2}>
          <Typography variant="h6">
            <strong>
              {obj.student.studentObj.personalDetails.studentfullname}
            </strong>
          </Typography>
          <Typography variant="body2">JULY - 2024</Typography>
          <Divider style={{ color: "#000", border: "0.5px solid" }} />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body2" display={"inline"} fontSize={20}>
              <strong>AMOUNT</strong>
            </Typography>
            <Typography variant="body2" display={"inline"} fontSize={20}>
              <strong>{total} INR</strong>
            </Typography>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ height: "80vh", width: "100vw" }}>
        <Grid item xs={7} sx={{ padding: "5px" }} textAlign={"center"}>
          <Typography variant="h6" fontSize={30}>
            <strong>
              <u>FEE DETAILS</u>
            </strong>
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxHeight: "70vh",
              overflowY: "auto",
              paddingLeft: 1,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            {cartItems &&
              cartItems.length > 0 &&
              getFeeDetailsElement(cartItems)}
          </Box>
        </Grid>

        <Grid item xs={4} sx={{ padding: "0px" }} textAlign={"center"}>
          <Typography variant="h6" fontSize={30}>
            <strong>
              <u>SUMMARY</u>
            </strong>
          </Typography>
          {getSummaryElement(cartItems)}

          <Typography variant="caption" display={"inline"} color="#ef4b4b">
            <strong> Plateform Charge: + 60 INR</strong>
          </Typography>

          <Box textAlign={"center"} m={5}>
            <MyCustomButton
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<LockIcon />}
            >
              PAY 6060 INR
            </MyCustomButton>
          </Box>
        </Grid>
      </Grid>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        m={3}
      >
        <Link to={".."} relative="path" style={{ textDecoration: "none" }}>
          <MyCustomButton
            variant="contained"
            color="primary"
            startIcon={<NavigateBeforeIcon />}
          >
            Go Back
          </MyCustomButton>
        </Link>
      </Box>
    </Container>
  );
};

export default FeesPaymentCart;
