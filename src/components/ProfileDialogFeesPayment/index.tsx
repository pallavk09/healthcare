import React, { FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Box,
  Divider,
  Paper,
  Checkbox,
  TextField,
  TextareaAutosize,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { studentData } from "../../common/types";
import { useForm, Controller } from "react-hook-form";
import { MyCustomButton } from "../../common/MyCustomControls";
import LockIcon from "@mui/icons-material/Lock";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: studentData) => void;
  profileData: any;
  resetFormRef?: React.MutableRefObject<() => void>;
  isEditing: boolean;
  onEdit?: () => void;
  addSibling?: boolean;
}

type FilterType = {
  both: boolean;
  fee: boolean;
  transport: boolean;
};

const ProfileDialogFeesPayment: React.FC<ProfileDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  profileData,
  resetFormRef,
  isEditing,
  onEdit,
  addSibling,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: profileData,
    mode: "onTouched",
  });
  const [_profileData, _SetProfileData] = useState<any[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<any>([]);
  const [selectedMonthsTransport, setSelectedMonthsTransport] = useState<any>(
    []
  );
  const [selectedFeeObj, setSelectedFeeObj] = useState<any>();
  const [rebateType, setRebateType] = React.useState<"%age" | "Amount" | "">(
    "Amount"
  );

  const [rebateFigure, setRebateFigure] = useState<string>();
  const [rebateValue, setRebateValue] = useState<number>(0);
  const [totalDue, setTotalDue] = useState<number>(0);
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
  const [checked, setChecked] = useState({
    both: true,
    fee: true,
    transport: true,
  });
  const [selectedFees, setSelectedFees] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  // useEffect(() => {
  //   console.log("Fee Selection changed: ", checked);
  //   // const filteredData = filterFees(profileData, checked); // Change "fee" to "transport" or "both" as needed
  //   // console.log(filteredData);

  //   _SetProfileData(filteredData);
  // }, [checked]);

  useEffect(() => {
    if (profileData && profileData.length > 0) {
      console.log("Pop up opened");
      console.log(profileData);
      _SetProfileData(profileData);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData) {
      reset(profileData); // Reset form with new profileData
    }
  }, [reset]);

  useEffect(() => {
    if (resetFormRef) {
      resetFormRef.current = () => reset(profileData);
    }
  }, [resetFormRef, reset, profileData]);

  useEffect(() => {
    console.log("useEffect: Month, Rebate or Switch Change");
    console.log("selectedFees");
    console.log(selectedFees);
    let totalAmount = 0;
    // selectedMonths.map((month: string) => {
    //   const feeObj = _profileData.find((m: any) => m.month === month);
    //   if (feeObj) {
    //     totalAmount += feeObj.school_fee?.total_fees;
    //   }
    // });

    Object.entries(selectedFees).forEach(([monthYear, feeHeads]) => {
      const [month, year] = monthYear.split("-"); // Extract month and year
      const feeObj = _profileData.find(
        (m) => m.month === month && m.year === year
      );

      if (feeObj) {
        // Sum selected school fee heads
        if (feeObj.school_fee) {
          Object.keys(feeHeads).forEach((head) => {
            if (feeHeads[head] && feeObj.school_fee.fees_particulars[head]) {
              totalAmount += feeObj.school_fee.fees_particulars[head];
            }
          });
        }

        // Sum selected transport fee heads (if applicable)
        if (feeObj.transport_fee) {
          Object.keys(feeHeads).forEach((head) => {
            if (feeHeads[head] && feeObj.transport_fee.fees_particulars[head]) {
              totalAmount += feeObj.transport_fee.fees_particulars[head];
            }
          });
        }
      }
    });

    let totalAmount_transport = 0;
    selectedMonthsTransport.map((month: string) => {
      const feeObj = _profileData.find((m: any) => m.month === month);
      if (feeObj) {
        totalAmount_transport += feeObj.transport_fee?.total_fees;
      }
    });

    totalAmount += totalAmount_transport;

    //This SwitchChecked logic will put rebate to zero once switch is toggelled
    setTotalDue(totalAmount - (switchChecked ? rebateValue : 0));
  }, [selectedFees, selectedMonthsTransport, rebateValue, switchChecked]);

  const filterFees = (data: any[], filterType: FilterType) => {
    return data
      .map(({ school_fee, transport_fee, ...rest }) => {
        if (filterType.both) {
          return { ...rest, school_fee, transport_fee };
        }
        if (filterType.fee && !filterType.transport) {
          return { ...rest, school_fee };
        }
        if (filterType.transport && !filterType.fee) {
          return transport_fee ? { ...rest, transport_fee } : null;
        }
        return null; // If none are selected, return null
      })
      .filter(Boolean); // Remove null values
  };

  const resetRebateControl = () => {
    setRebateType("Amount");
    setRebateFigure("");
    setRebateValue(0);
  };

  // const filterFees = (data: any[], filterType: {}) => {
  //   return data
  //     .map(({ school_fee, transport_fee, ...rest }) => {
  //       if (filterType === "fee") {
  //         return { ...rest, school_fee };
  //       } else if (filterType === "transport") {
  //         return transport_fee ? { ...rest, transport_fee } : null;
  //       } else {
  //         return { ...rest, school_fee, transport_fee };
  //       }
  //     })
  //     .filter(Boolean);
  // };

  // const HandleFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = event.target;
  //   console.log(name, checked);
  //   if (name === "both") {
  //     setChecked({
  //       both: checked,
  //       fee: checked,
  //       transport: checked,
  //     });
  //   } else {
  //     setChecked((prev) => {
  //       const newState = { ...prev, [name]: checked };
  //       newState.both = newState.fee && newState.transport;
  //       return newState;
  //     });
  //   }
  // };

  // const handleSelect = (school_fee_obj: any) => {
  //   console.log(school_fee_obj);
  //   setSelectedMonths((prev: any) =>
  //     prev.includes(school_fee_obj.month)
  //       ? prev.filter((m: any) => m !== school_fee_obj.month)
  //       : [...prev, school_fee_obj.month]
  //   );
  // };

  // const handleSelect = (month: string, feeHead: string) => {
  //   setSelectedFees((prev) => ({
  //     ...prev,
  //     [month]: {
  //       ...prev[month],
  //       [feeHead]: !prev[month]?.[feeHead] || false,
  //     },
  //   }));
  // };

  const handleSelect = (month: string, year: string, feeHead: string) => {
    const key = `${month}-${year}`; // Unique key with month and year
    setSelectedFees((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [feeHead]: !prev[key]?.[feeHead] || false,
      },
    }));
  };

  // const handleSelectTransport = (date: any) => {
  //   console.log(date);
  //   setSelectedMonthsTransport((prev: any) =>
  //     prev.includes(date.month)
  //       ? prev.filter((m: any) => m !== date.month)
  //       : [...prev, date.month]
  //   );
  // };

  const handleChange = (event: any) => {
    console.log(event.target.value);
    setRebateType(event.target.value);
    setRebateFigure("");
    setRebateValue(0);
  };

  const handleSwitchChange = () => {
    setSwitchChecked((prev: Boolean) => !prev);
    resetRebateControl();

    console.log("switchChecked: ", switchChecked);
  };

  const handlePayment = async () => {
    console.log("Payment Amount to be submitted: ", GetPaymentAmount());
    const paymentId = uuidv4(); // Generate a single payment_id for this transaction
    const records: any[] = [];

    Object.entries(selectedFees).forEach(([monthYear, feeHeads]) => {
      const [month, year] = monthYear.split("-");
      const feeObj = _profileData.find(
        (m) => m.month === month && m.year === year
      );

      if (feeObj) {
        let amountDue = 0;
        let amountPaid = 0;
        let rebateAmount = 0; // Assuming rebate handling separately
        let paymentStatus = "Paid"; // Default is Paid

        // Get all fee heads from both school_fee and transport_fee
        const allFeeHeads = {
          ...feeObj.school_fee.fees_particulars,
          ...feeObj.transport_fee.fees_particulars,
        };

        // Selected and Not selected fee heads
        const selectedFeeHeads: any = {};
        const notSelectedFeeHeads: any = {};

        Object.keys(allFeeHeads).forEach((head) => {
          amountDue += allFeeHeads[head];

          if (feeHeads[head]) {
            selectedFeeHeads[head] = allFeeHeads[head];
            amountPaid += allFeeHeads[head];
          } else {
            notSelectedFeeHeads[head] = allFeeHeads[head];
          }
        });

        // If some fee heads were NOT selected, mark status as "Fee Head Pending"
        if (Object.keys(notSelectedFeeHeads).length > 0) {
          paymentStatus = "Fee Head Pending";
        }

        // Create a record for this month-year
        records.push({
          id: uuidv4(), // Unique ID for each record
          payment_id: paymentId, // Same payment_id for all records
          month,
          year,
          transaction_id: uuidv4(), // Unique transaction ID
          payment_date: new Date().toISOString().split("T")[0], // Current date
          amount_due: amountDue,
          amount_paid: totalDue, //amountPaid,
          rebate_amount: rebateValue,
          payment_status: paymentStatus,
          selected_fees: selectedFeeHeads, // Show selected fee heads
          pending_fees: notSelectedFeeHeads, // Show pending fee heads
          remark:
            paymentStatus === "Fee Head Pending"
              ? "Some fee heads are pending"
              : "Paid in full",
        });
      }
    });

    console.log("Payment Records:", records);
  };

  const GetRebateAndDueAmount = (RebateValue: string) => {
    setRebateFigure(RebateValue);
    let value = Number(RebateValue);
    let rebateAmount = 0;

    console.log("value: ", value);

    let totalAmount = totalDue;
    if (rebateType === "%age") {
      rebateAmount = (value * totalAmount) / 100;
    } else {
      rebateAmount = value;
    }

    const totalAmountPayable = totalAmount - rebateAmount;

    // const maxValue = rebateType === "%age" ? 10 : 500; // Can configure these maximum allowable values
    // if (value > maxValue) value = maxValue; // Restrict to maxValue
    // setRebateValue(value);
    setRebateValue(Math.round(rebateAmount));
    setTotalDue(Math.round(totalAmountPayable));
    console.log("rebateAmount: ", Math.round(rebateAmount));
    console.log("totalAmountPayable: ", Math.round(totalAmountPayable));
  };

  // const GetYear = (month: string) => {
  //   const feeObj = _profileData.find((m: any) => m.month === month);
  //   return feeObj?.year;
  // };
  // const GetTotalFee = (month: string) => {
  //   const feeObj = _profileData.find((m: any) => m.month === month);
  //   return feeObj?.total_fees;
  // };
  const GetPaymentAmount = () => {
    let totalAmount = 0;
    selectedMonths.map((month: string) => {
      const feeObj = _profileData.find((m: any) => m.month === month);
      if (feeObj) {
        totalAmount += feeObj.total_fees;
      }
    });

    let totalAmount_transport = 0;
    selectedMonthsTransport.map((month: string) => {
      const feeObj = _profileData.find((m: any) => m.month === month);
      if (feeObj) {
        totalAmount_transport += feeObj.transport_fee?.total_fees;
      }
    });

    totalAmount += totalAmount_transport;

    return totalAmount;
  };

  // Create a custom onClose handler for the Dialog component.
  const handleDialogClose = (event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      // Prevent closing when clicking outside or pressing escape.
      return;
    }
    // Otherwise, call the parent's onClose function.
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>Fee Submission</strong>
        </Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* <FormGroup sx={{ alignSelf: "center" }}>
        <Box display={"flex"} flexDirection={"row"}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.both}
                onChange={HandleFeeChange}
                name="both"
                size="small"
              />
            }
            label={
              <Typography variant="body2" fontSize={15} color="#2E186A">
                <strong>Combined</strong>
              </Typography>
            }
            labelPlacement="end"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.fee}
                onChange={HandleFeeChange}
                name="fee"
                size="small"
              />
            }
            label={
              <Typography variant="body2" fontSize={15} color="#2E186A">
                <strong>Fee</strong>
              </Typography>
            }
            labelPlacement="end"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.transport}
                onChange={HandleFeeChange}
                name="transport"
                size="small"
              />
            }
            label={
              <Typography variant="body2" fontSize={15} color="#2E186A">
                <strong>Transport</strong>
              </Typography>
            }
            labelPlacement="end"
          />
        </Box>
      </FormGroup> */}

      {_profileData?.length > 0 ? (
        <DialogContent
          sx={{
            // overflowX: "auto",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px", // Width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Background of the scrollbar track
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888", // Color of the scroll thumb
              borderRadius: "10px", // Rounded corners
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555", // Darker color on hover for the thumb
            },
          }}
        >
          {/* <form> */}
          <Grid container spacing={2} sx={{ height: "auto", width: "auto" }}>
            <Grid item xs={7} sx={{ padding: "5px" }} textAlign={"center"}>
              <Box
                sx={{
                  width: "auto",
                  maxHeight: "45vh",
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
                {/* Fee Details will go here. */}
                {_profileData?.length > 0 &&
                  _profileData?.map((feePendingObj: any, index: number) => {
                    return (
                      <Box
                        sx={{
                          padding: (theme) => theme.spacing(1, 2),
                          width: "auto",
                          margin: (theme) => theme.spacing(0.5),
                          bgcolor: "transparent",
                        }}
                        key={index}
                      >
                        <Box display={"flex"} flexDirection="column" gap={2}>
                          <Paper
                            elevation={
                              selectedMonths.includes(feePendingObj.month) ||
                              selectedMonthsTransport.includes(
                                feePendingObj.month
                              )
                                ? 6
                                : 2
                            }
                            // onClick={() => handleSelect(feePendingObj)}
                            sx={{
                              border:
                                selectedMonths.includes(feePendingObj.month) ||
                                selectedMonthsTransport.includes(
                                  feePendingObj.month
                                )
                                  ? "2px solid #1976d2"
                                  : "1px solid #ccc",
                              borderRadius: 1,
                              padding: (theme) => theme.spacing(1, 2),
                              width: "auto",
                              height: "auto",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                          >
                            <Box
                              display={"flex"}
                              flexDirection="column"
                              gap={1}
                            >
                              <Box
                                display={"flex"}
                                flexDirection={"row"}
                                justifyContent={"space-between"}
                                alignSelf={"center"}
                                width={"100%"}
                              >
                                <Box
                                  display={"flex"}
                                  flexDirection={"row"}
                                  alignSelf={"center"}
                                >
                                  {/* <Checkbox
                                    checked={selectedMonths.includes(
                                      feePendingObj.month
                                    )}
                                    onChange={() => handleSelect(feePendingObj)}
                                  /> */}
                                  <Box
                                    display={"flex"}
                                    flexDirection="row"
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                  >
                                    <Typography
                                      variant="body2"
                                      fontSize={18}
                                      color="#FF825B"
                                    >
                                      <strong>
                                        {`${feePendingObj.month} - ${feePendingObj.year}`}
                                      </strong>
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box
                                  display={"flex"}
                                  flexDirection="row"
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                >
                                  <Typography
                                    variant="body2"
                                    fontSize={18}
                                    color="#FF825B"
                                  >
                                    <strong>{`Total: ₹ ${
                                      (feePendingObj?.school_fee?.total_fees ??
                                        0) +
                                      (feePendingObj?.transport_fee
                                        ?.total_fees ?? 0)
                                    }`}</strong>
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Pallav: Test Code: School Fees selection*/}
                              {/* {feePendingObj?.school_fee?.fees_particulars &&
                                Object.keys(
                                  feePendingObj?.school_fee?.fees_particulars
                                ).length > 0 && (
                                  <Box
                                    display={"flex"}
                                    flexDirection={"row"}
                                    alignSelf={"normal"}
                                  >
                                    <Checkbox
                                      checked={selectedMonths.includes(
                                        feePendingObj.month
                                      )}
                                      onChange={() =>
                                        handleSelect(feePendingObj?.school_fee)
                                      }
                                    />
                                    <Box
                                      display={"flex"}
                                      flexDirection="row"
                                      justifyContent={"center"}
                                      alignItems={"center"}
                                    >
                                      <Typography
                                        variant="body2"
                                        fontSize={18}
                                        color="#FF825B"
                                      >
                                        <strong>School Fee</strong>
                                      </Typography>
                                    </Box>
                                  </Box>
                                )} */}
                              {/* Pallav: Test Code:School Fees selection. END */}
                              {feePendingObj?.school_fee &&
                                Object.entries(
                                  feePendingObj?.school_fee?.fees_particulars
                                ).map(([Key, value]) => {
                                  return (
                                    <Box
                                      display={"flex"}
                                      flexDirection="column"
                                    >
                                      <Box
                                        display={"flex"}
                                        flexDirection="row"
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                      >
                                        <Box
                                          display={"flex"}
                                          flexDirection="row"
                                          justifyContent={"flex-start"}
                                          alignItems={"center"}
                                        >
                                          <Checkbox
                                            checked={
                                              selectedFees[
                                                `${feePendingObj.month}-${feePendingObj.year}`
                                              ]?.[Key] || false
                                            }
                                            onChange={() =>
                                              handleSelect(
                                                feePendingObj.month,
                                                feePendingObj.year,
                                                Key
                                              )
                                            }
                                            // checked={selectedMonths.includes(
                                            //   feePendingObj.month
                                            // )}
                                            // onChange={() =>
                                            //   handleSelect(
                                            //     feePendingObj?.school_fee
                                            //   )
                                            // }
                                          />
                                          <Typography variant="body2">
                                            <strong>{Key.toUpperCase()}</strong>
                                          </Typography>
                                        </Box>
                                        <Typography variant="body2">
                                          <strong>₹{value as string}</strong>
                                        </Typography>
                                      </Box>
                                      <Divider />
                                    </Box>
                                  );
                                })}

                              {/* Pallav: Test Code. Transport Fees selection */}
                              {/* {feePendingObj?.transport_fee && (
                                <Box
                                  display={"flex"}
                                  flexDirection={"row"}
                                  alignSelf={"normal"}
                                >
                                  <Checkbox
                                    checked={selectedMonthsTransport.includes(
                                      feePendingObj.month
                                    )}
                                    onChange={() =>
                                      handleSelectTransport(feePendingObj)
                                    }
                                  />
                                  <Box
                                    display={"flex"}
                                    flexDirection="row"
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                  >
                                    <Typography
                                      variant="body2"
                                      fontSize={18}
                                      color="#9d3124"
                                    >
                                      <strong>Transport Fee</strong>
                                    </Typography>
                                  </Box>
                                </Box>
                              )} */}
                              {/* Pallav: Test Code: Transport Fees selection. END */}
                              {feePendingObj?.transport_fee &&
                                Object.entries(
                                  feePendingObj?.transport_fee?.fees_particulars
                                ).map(([Key, value]) => {
                                  return (
                                    <Box
                                      display={"flex"}
                                      flexDirection="column"
                                      gap={0}
                                    >
                                      <Box
                                        display={"flex"}
                                        flexDirection="row"
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                      >
                                        <Box
                                          display={"flex"}
                                          flexDirection="row"
                                          justifyContent={"flex-start"}
                                          alignItems={"center"}
                                        >
                                          <Checkbox
                                            checked={
                                              selectedFees[
                                                `${feePendingObj.month}-${feePendingObj.year}`
                                              ]?.[Key] || false
                                            }
                                            onChange={() =>
                                              handleSelect(
                                                feePendingObj.month,
                                                feePendingObj.year,
                                                Key
                                              )
                                            }
                                            // checked={selectedMonthsTransport.includes(
                                            //   feePendingObj.month
                                            // )}
                                            // onChange={() =>
                                            //   handleSelectTransport(
                                            //     feePendingObj
                                            //   )
                                            // }
                                          />
                                          <Typography variant="body2">
                                            <strong>{Key.toUpperCase()}</strong>
                                          </Typography>
                                        </Box>
                                        <Typography variant="body2">
                                          <strong>₹{value as string}</strong>
                                        </Typography>
                                      </Box>
                                      <Divider />
                                    </Box>
                                  );
                                })}
                            </Box>
                          </Paper>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Grid>

            {/* Fee Summary will go here. */}
            <Grid item xs={4} sx={{ padding: "0px" }} textAlign={"center"}>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "45vh",
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
                <>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={0.5}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"97%"}
                  >
                    {/* Rebate switch container */}
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                      width={"100%"}
                      gap={1}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          opacity: switchChecked ? "1" : "0.5",
                        }}
                        alignSelf={"center"}
                      >
                        <strong>Give Rebate</strong>
                      </Typography>
                      <Switch
                        size="small"
                        checked={switchChecked}
                        onChange={handleSwitchChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>

                    {/* Rebate Value and Amount container */}
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <FormControl
                        sx={{ m: 1, minWidth: 130, ml: 0 }}
                        size="small"
                        disabled={!switchChecked}
                      >
                        <InputLabel id="select-rebate-label">Rebate</InputLabel>
                        <Select
                          labelId="select-rebate-label"
                          id="select-rebate"
                          value={rebateType}
                          label="Rebate"
                          onChange={handleChange}
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          <MenuItem value={"%age"}>%age</MenuItem>
                          <MenuItem value={"Amount"}>Amount</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        id="rebate-amount"
                        label={rebateType === "%age" ? "Percent" : "Amount"}
                        variant="outlined"
                        size="small"
                        type="number"
                        value={rebateFigure}
                        onChange={(e) => {
                          GetRebateAndDueAmount(e.target.value);
                        }}
                        disabled={!switchChecked}
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                      gap={1}
                    >
                      <TextField
                        id="rebate-amount"
                        label="₹ Less"
                        variant="outlined"
                        size="small"
                        value={rebateValue}
                        sx={{
                          width: "30%",
                        }}
                        disabled
                      />
                      <TextField
                        id="total-amount"
                        label="₹ Due"
                        variant="outlined"
                        size="small"
                        // value={GetPaymentAmount()}
                        value={totalDue}
                        sx={{
                          width: "70%",
                        }}
                        disabled
                      />
                    </Box>

                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <TextField
                        id="remarks"
                        label="Remarks"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        sx={{
                          mt: 1,
                          mb: 1,
                        }}
                      />
                    </Box>
                    <MyCustomButton
                      variant="contained"
                      color="primary"
                      startIcon={<LockIcon />}
                      onClick={handlePayment}
                      sx={{
                        fontSize: "1rem",
                      }}
                      fullWidth
                    >
                      {/* PAY ₹ {GetPaymentAmount()} */}
                      PAY ₹ {totalDue}
                    </MyCustomButton>
                  </Box>
                  {/* {selectedMonths.length > 0 ? (
                    selectedMonths.map((_month: string) => {
                      return (
                        <Box textAlign={"left"} m={2}>
                          <Typography variant="h6">
                            <strong>{_month}</strong>
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#FF825B",
                            }}
                          >
                            <strong> {GetYear(_month)}</strong>
                          </Typography>
                          <Divider
                            style={{
                              color: "#FF825B",
                              border: "0.5px solid",
                            }}
                          />
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
                              <strong>₹ {GetTotalFee(_month)}</strong>
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        opacity: "0.5",
                      }}
                    >
                      <strong>SELECT MONTH</strong>
                    </Typography>
                  )} */}
                </>
              </Box>
            </Grid>
          </Grid>

          <DialogActions>
            {/* <MyCustomButton
              variant="contained"
              color="primary"
              startIcon={<LockIcon />}
              onClick={handleFormSubmit}
              sx={{
                fontSize: "1rem",
              }}
            >
              PAY ₹ {GetPaymentAmount()}
            </MyCustomButton> */}

            {/* <MyCustomButton
              variant="contained"
              type="button"
              customcolor="#00c9a6"
              onClick={handleFormSubmit}
            >
              Submit
            </MyCustomButton> */}
          </DialogActions>
          {/* </form> */}
        </DialogContent>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          p={2}
        >
          <Typography
            variant="h6"
            sx={{
              opacity: "0.5",
            }}
          >
            <strong>No outstanding dues. Your payments are up to date!</strong>
          </Typography>
        </Box>
      )}
    </Dialog>
  );
};

export default ProfileDialogFeesPayment;
