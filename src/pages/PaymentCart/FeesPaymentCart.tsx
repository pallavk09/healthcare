import { Box, Divider, Typography, Grid } from "@mui/material";
import { useEffect, useContext, useState, useRef } from "react";
import Container from "../../common/Container";
import { MyCustomButton } from "../../common/MyCustomControls";
import LockIcon from "@mui/icons-material/Lock";
import {
  cartContextType_FEE,
  feePaymentContext,
} from "../../store/cartContext";
import { feeConfig, monthFeeTimeGap_days } from "../../Config/feeConfig";
import { Link, useNavigate } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import userDataContext from "../../store/userContext";
import { jwtDecode } from "jwt-decode";
import { ListStudents } from "../../api/students";
import formatDate from "../../common/utils/formatDate";
import { studentData } from "../../common/types";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import moment from "moment";
import { GetFeeData } from "../../api/fees";

const FeesPaymentCart = () => {
  const months = [
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

  const monthOrder = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  const ctx_userData = useContext(userDataContext);
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const [students, setStudents] = useState<studentData[] | null>();
  const snackbarRef = useRef<SnackbarHandle>(null);
  const [feeData, setFeeData] = useState<any | []>([]);
  const navigate = useNavigate();

  // const fee_context = useContext(feePaymentContext);
  // const [cartItems, setCartItems] = useState<cartContextType_FEE[] | []>([]);

  const formatStudentDataForContext = (studentArray: any) => {
    let siblingsArray: studentData[] | null;
    try {
      console.log("formatStudentDataForContext. studentArray received as");
      console.log(studentArray);
      // let siblingsArray: studentData[] | {} = {};
      siblingsArray = studentArray.map((student: any) => {
        return {
          documentId: student.$id,
          userId: student.userId,
          phone: student.phone,
          newAdmission: student.newAdmission,
          fees: student.fees,
          studentObj: {
            photoUrl: student.photoUrl,
            id: student.studentId,
            personalDetails: {
              ...student.personalDetails,
              studentdob: formatDate(student.personalDetails.studentdob),
            },
            guardianDetails: student.guardianDetails,
            academicsDetails: student.academicsDetails,
          },
        };
      });
      return siblingsArray;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const PaymentActive = () => {
    let activePayment = false;
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

    return activePayment;
  };

  useEffect(() => {
    console.log("Under useEffect of FeesPaymentCart.");
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

      const fetchData = async () => {
        console.log("Inside FetchData");
        try {
          // Use Promise.all to wait for both promises to resolve
          const [res1, res2] = await Promise.all([
            ListStudents(accessToken_decode.userId),
            GetFeeData(accessToken_decode.userId),
          ]);

          console.log("Response received");

          const studentFormatted = formatStudentDataForContext(res1?.result);

          // Set the data to state
          setStudents(studentFormatted);
          setFeeData(res2?.result);
        } catch (err) {
          // Handle errors
        }
      };

      fetchData();
    } else {
      console.log("Token not found. Logging out");
      navigate("/student");
    }
  }, []);

  const getFeeDetailsElement = (studentList: studentData[]) => {
    if (feeData && feeData.length === 0) {
      console.log("Inside FeePaymentCart: getFeeDetailsElement");
      console.log(feeData);
      if (PaymentActive()) {
        return studentList.map((student, index) => {
          const className = student.studentObj.academicsDetails.class;
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
                <Typography>{`${student.studentObj.personalDetails.studentfullname.toUpperCase()}`}</Typography>
                <Typography>{`Std: ${student.studentObj.academicsDetails.class.toUpperCase()}-${student.studentObj.academicsDetails.section.toUpperCase()}`}</Typography>
                <Typography>{`Roll No: ${student.studentObj.academicsDetails.rollnumber}`}</Typography>
                <Typography>{`Month: ${months[moment().month()]}`}</Typography>
                <Typography>{`Due By: ${moment()
                  .date(monthFeeTimeGap_days)
                  .format("DD/MM/YY")}`}</Typography>
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
      } else {
        return [];
      }
    } else if (feeData && feeData.length > 0) {
      console.log("Fees data present");
      let feeCardArray: any[] = [];
      //For each student check fees paid upto which month
      for (const student of students!) {
        console.log("Loop started");
        const feeFiltered = feeData.filter(
          (row: any) => row.student_docId === student.documentId
        );

        const feeFiltered_sorted = feeFiltered.sort(
          //@ts-ignore
          (a: any, b: any) => monthOrder[a.month] - monthOrder[b.month]
        );

        console.log("Sorted Data");
        console.log(feeFiltered_sorted);

        const paidUntil_index =
          //@ts-ignore
          monthOrder[feeFiltered_sorted[feeFiltered_sorted.length - 1].month];

        console.log(
          `Fees paid upto month index of: ${paidUntil_index}. Current Month index is: ${moment().month()}`
        );
        const startMonth = paidUntil_index + 1;
        const endMonth = PaymentActive()
          ? moment().month() + 1
          : moment().month();
        let pendingMonth = months.slice(startMonth, endMonth);
        console.log("Pending Months are");
        console.log(pendingMonth);

        const feeCardArray_student = pendingMonth.map((month, index) => {
          const className = student.studentObj.academicsDetails.class;
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
                <Typography>{`${student.studentObj.personalDetails.studentfullname.toUpperCase()}`}</Typography>
                <Typography>{`Std: ${student.studentObj.academicsDetails.class.toUpperCase()}-${student.studentObj.academicsDetails.section.toUpperCase()}`}</Typography>
                <Typography>{`Roll No: ${student.studentObj.academicsDetails.rollnumber}`}</Typography>
                <Typography>{`Month: ${month}`}</Typography>
                <Typography>{`Due By: ${moment()
                  //@ts-ignore
                  .month(monthOrder[month])
                  .date(monthFeeTimeGap_days)
                  .format("DD/MM/YY")}`}</Typography>
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
        feeCardArray.push(feeCardArray_student);
      }

      return feeCardArray;
    } else {
      console.log("Error");
    }
  };

  const getSummaryElement = (studentList: studentData[]) => {
    let totalFeeToBePaid = 0;
    let platformCharge = 60;
    totalFeeToBePaid += platformCharge;
    if (PaymentActive()) {
      if (feeData && feeData.length === 0) {
        return (
          <>
            {studentList.map((student, index) => {
              const className = student.studentObj.academicsDetails.class;
              const tution = feeConfig[className].tution;
              const computer = feeConfig[className].computer;
              const library = feeConfig[className].library;
              const annual = feeConfig[className].annual;
              const activity = feeConfig[className].activity;
              const total = tution + computer + library + annual + activity;
              totalFeeToBePaid += total;

              return (
                <Box textAlign={"left"} m={2} key={index}>
                  <Typography variant="h6">
                    <strong>
                      {student.studentObj.personalDetails.studentfullname.toUpperCase()}
                    </strong>
                  </Typography>
                  <Typography variant="body2">{`${
                    months[moment().month()]
                  } - ${moment().year()}`}</Typography>
                  <Divider style={{ color: "#000", border: "0.5px solid" }} />
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant="body2"
                      display={"inline"}
                      fontSize={20}
                    >
                      <strong>AMOUNT</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      display={"inline"}
                      fontSize={20}
                    >
                      <strong>{total} INR</strong>
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            <Typography variant="caption" display={"inline"} color="#ef4b4b">
              <strong> Plateform Charge: + {platformCharge} INR</strong>
            </Typography>

            <Box textAlign={"center"} m={5}>
              <MyCustomButton
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<LockIcon />}
              >
                PAY {totalFeeToBePaid} INR
              </MyCustomButton>
            </Box>
          </>
        );
      } else {
        return [];
      }
    } else if (feeData && feeData.length > 0) {
      console.log("Fees data present");
      let feeCardArray: any[] = [];
      //For each student check fees paid upto which month
      for (const student of students!) {
        console.log("Loop started");
        const feeFiltered = feeData.filter(
          (row: any) => row.student_docId === student.documentId
        );

        const feeFiltered_sorted = feeFiltered.sort(
          //@ts-ignore
          (a: any, b: any) => monthOrder[a.month] - monthOrder[b.month]
        );

        console.log("Sorted Data");
        console.log(feeFiltered_sorted);

        const paidUntil_index =
          //@ts-ignore
          monthOrder[feeFiltered_sorted[feeFiltered_sorted.length - 1].month];

        console.log(
          `Fees paid upto month index of: ${paidUntil_index}. Current Month index is: ${moment().month()}`
        );
        const startMonth = paidUntil_index + 1;
        const endMonth = PaymentActive()
          ? moment().month() + 1
          : moment().month();
        let pendingMonth = months.slice(startMonth, endMonth);
        console.log("Pending Months are");
        console.log(pendingMonth);

        const feeCardArray_student = pendingMonth.map((month, index) => {
          const className = student.studentObj.academicsDetails.class;
          const tution = feeConfig[className].tution;
          const computer = feeConfig[className].computer;
          const library = feeConfig[className].library;
          const annual = feeConfig[className].annual;
          const activity = feeConfig[className].activity;
          const total = tution + computer + library + annual + activity;
          totalFeeToBePaid += total;

          return (
            <Box textAlign={"left"} m={2} key={index}>
              <Typography variant="h6">
                <strong>
                  {student.studentObj.personalDetails.studentfullname.toUpperCase()}
                </strong>
              </Typography>
              <Typography variant="body2">{`${month} - ${moment().year()}`}</Typography>
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
        feeCardArray.push(feeCardArray_student);
      }
      feeCardArray.push(
        <>
          <Typography variant="caption" display={"inline"} color="#ef4b4b">
            <strong> Plateform Charge: + {platformCharge} INR</strong>
          </Typography>

          <Box textAlign={"center"} m={5}>
            <MyCustomButton
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<LockIcon />}
            >
              PAY {totalFeeToBePaid} INR
            </MyCustomButton>
          </Box>
        </>
      );
      return feeCardArray;
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
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
                maxHeight: "65vh",
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
              {students &&
                students.length > 0 &&
                getFeeDetailsElement(students)}
            </Box>
          </Grid>

          <Grid item xs={4} sx={{ padding: "0px" }} textAlign={"center"}>
            <Typography variant="h6" fontSize={30}>
              <strong>
                <u>SUMMARY</u>
              </strong>
            </Typography>

            <Box
              sx={{
                width: "100%",
                maxHeight: "65vh",
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
              {students && students.length > 0 && getSummaryElement(students)}
            </Box>
          </Grid>

          {/* <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            // mb={3}
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
          </Box> */}
        </Grid>
        <Box position={"relative"} mt={-1}>
          <MyCustomButton
            variant="contained"
            color="primary"
            startIcon={<NavigateBeforeIcon />}
          >
            Go Back
          </MyCustomButton>
        </Box>
      </Container>
    </>
  );
};

export default FeesPaymentCart;
