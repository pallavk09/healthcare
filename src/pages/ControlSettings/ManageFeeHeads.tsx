import React, { Suspense, useCallback, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";

import { tableCellClasses } from "@mui/material/TableCell";

import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { classes_records } from "../../Config/classes_records";
// import { classes } from "../../Config/classes";

// import moment from "moment";
import { useForm } from "react-hook-form";
// import { fee_heads_records } from "../../Config/fee_heads_record";
// import { fees_structure_records } from "../../Config/fees_structure_records";
import { v4 as uuid } from "uuid";
// import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import {
  AddClassFeeStructure,
  GetClassFeeStructure,
  AddFeeHeads,
  GetFeeHeads,
  UpdateFeeHeads,
  UpdateClassFeeStructure,
} from "../../api/Control-Settings/manage-fee-heads";
import { Get as GetClass } from "../../api/Control-Settings/manage-class";
import { FixedSizeList } from "react-window";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";
import {
  GetSubjectsToClass,
  UpdateSubjectsToClass,
} from "../../api/Control-Settings/manage-subjects";
// import FeeMultiSelect from "./FeeMultiSelect/FeeMultiSelect";
const ControlledTextField = React.lazy(
  () => import("../../common/ControlledComponents/ControlledTextField")
);

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
  // const [feeHeadsList, setFeeHeadsList] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [classList, setClassList] = useState<{}[]>([]);
  // const [classFeesDefault, setClassFeesDefault] = useState<any>();
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });

  const [feesStructureRecords, setFeesStructureRecords] = useState<any>();

  const [loading, setLoading] = useState(true);
  const [loadingCost, setLoadingCost] = useState(false);
  const [adding, setAdding] = useState(false);
  const [school_fee_structure, setSchool_fee_structure] = useState<any>([]);
  const [school_fee_structureDB, setSchool_fee_structureDB] = useState<any>([]);
  const [addingCost, setAddingCost] = useState(false);
  const [editCost, setEditCost] = useState<boolean>(false);
  const [classId, setClassId] = useState<any>(undefined);
  const [classes, setClasses] = useState<any>([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      feehead_id: "",
      title: "",
      // amount: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit: handleSubmitForm2,
    control: controlForm2,
    formState: { errors: errorsForm2 },
    reset: resetSchoolFeeCost,
  } = useForm({
    defaultValues: {
      fees: {},
    },
    mode: "onTouched",
  });

  const {
    handleSubmit: handleSubmitShowFee,
    control: controlShowFee,
    formState: { errors: errorsShowFee },
    reset: resetShowFee,
  } = useForm({
    defaultValues: {
      class_id: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fee_heads_records, classes_records, classes] = await Promise.all(
          [GetFeeHeads(), GetClass(), GetSubjectsToClass()]
        );

        if (
          fee_heads_records &&
          fee_heads_records.result.documents?.length > 0
        ) {
          setApplications(fee_heads_records.result.documents);
        }
        if (classes_records && classes_records.result.documents?.length > 0) {
          setClassList(classes_records.result.documents);
        }
        if (classes && classes.result.documents?.length > 0) {
          setClasses(classes.result.documents);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //This is for editing fee heads
    if (selectedRow) {
      reset(selectedRow);
    }
  }, [selectedRow, reset]);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Fee Head ", flex: 1 },
    { field: "updated_on", headerName: "Updated On", flex: 1 },
    { field: "updated_by", headerName: "Updated By", flex: 1 },
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
                feehead_id: params.row.feehead_id,
                title: params.row.title,
              });
              setEdit(true);
            }}
            disabled={false}
          />
        </>
      ),
    },
  ];

  const isDuplicate = (title: string) => {
    return applications.some((fee: any) => fee.title === title);
  };

  const updateItem = async (updatedfee: any) => {
    try {
      console.log(updatedfee);
      console.log(applications);

      const item = applications.find(
        (feehead: any) => feehead.feehead_id === updatedfee.feehead_id
      );
      if (!item) return;

      const updatedFeehead_item = {
        ...updatedfee,
        id: item.feehead_id,
        user: "pallav",
      };

      console.log(updatedFeehead_item);
      const updateItem = await UpdateFeeHeads(updatedFeehead_item);

      if (updateItem && updateItem.result) {
        setApplications((prevFeeHead: any) =>
          prevFeeHead.map((feehead: any) =>
            feehead.feehead_id === updateItem.result.feehead_id
              ? { ...feehead, ...updateItem.result }
              : feehead
          )
        );
        snackbarRef.current?.showSnackbar(`Item Updated`, "success");
      } else {
        snackbarRef.current?.showSnackbar(`Item not updated`, "error");
      }

      // setApplications((prevfee: any) =>
      //   prevfee.map((fee: any) =>
      //     fee.id === updatedfee.id ? { ...fee, ...updatedfee } : fee
      //   )
      // );
      return;
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setAdding(true);
      if (edit) {
        console.log("Entry To be updated");
        updateItem(data);
        setEdit(false);
        reset({
          feehead_id: "",
          title: "",
        });
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
          feehead_id: _id,
          id: _id,
          user: "pallav",
        };

        const addNewItem = await AddFeeHeads(newFeeHead);
        if (addNewItem && addNewItem.result) {
          const newApplicationList = [...applications, addNewItem.result];

          setApplications(newApplicationList);
          setEdit(false);
          reset({
            feehead_id: "",
            title: "",
          });
          snackbarRef.current?.showSnackbar(
            `Subject added successfully.`,
            "success"
          );
        }
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const onResetHandler = () => {
    reset({
      feehead_id: "",
      title: "",
    });
    setEdit(false);
  };

  const onResetHandlerShowFee = () => {
    resetShowFee({
      class_id: "",
    });
    setClassId(undefined);
  };

  //THIS FUNCTION IS TO GENERATE DATA TO BE STORED INTO DB fee_structure_records
  function generateFeesStructure(classes: any, feesData: any) {
    return classes.map((cls: any) => {
      const _id = uuid().slice(0, 5);
      const monthly_fees = Object.keys(feesData[cls.class_id] || {}).map(
        (month) => {
          const fees_particulars = Object.entries(
            feesData[cls.class_id][month] || {}
          ).reduce((acc, [key, value]) => {
            //@ts-ignore
            acc[key] = value ? parseInt(value, 10) : 0;
            return acc;
          }, {});
          return {
            month,
            fees_particulars,

            total_fees: Object.values(fees_particulars).reduce(
              //@ts-ignore
              (sum, fee) => sum + fee,
              0
            ),
          };
        }
      );
      return {
        id: _id, // Placeholder
        fees_structure_id: _id, // Placeholder
        academic_year: "", // Placeholder
        class: cls.name,
        fee_collection_cycle: 10,
        monthly_fees: JSON.stringify(monthly_fees),
      };
    });
  }

  function updateFeesStructure(classes: any, feesData: any) {
    return classes.map((cls: any) => {
      const _id = uuid().slice(0, 5);
      const monthly_fees = Object.keys(feesData[cls.class_id] || {}).map(
        (month) => {
          const fees_particulars = Object.entries(
            feesData[cls.class_id][month] || {}
          ).reduce((acc, [key, value]) => {
            //@ts-ignore
            acc[key] = value ? parseInt(value, 10) : 0;
            return acc;
          }, {});
          return {
            month,
            fees_particulars,

            total_fees: Object.values(fees_particulars).reduce(
              //@ts-ignore
              (sum, fee) => sum + fee,
              0
            ),
          };
        }
      );
      return {
        monthly_fees: JSON.stringify(monthly_fees),
      };
    });
  }

  const HandleFeeStructureCreation = async (data: any) => {
    try {
      setAddingCost(true);
      const _classList = classList.filter(
        (item: any) => item.class_id === classId
      );
      console.log(data);
      if (editCost) {
        const updated_monthly_fee = updateFeesStructure(_classList, data?.fees);

        const updated_monthly_fee_class = {
          id: school_fee_structureDB.fees_structure_id,
          fees_structure_id: school_fee_structureDB.fees_structure_id,
          academic_year: school_fee_structureDB.academic_year,
          class: school_fee_structureDB.class,
          fee_collection_cycle: school_fee_structureDB.fee_collection_cycle,
          monthly_fees: updated_monthly_fee[0].monthly_fees,
        };

        console.log(updated_monthly_fee_class);

        const payload = {
          user: "pallav",
          arrayOfItems: [updated_monthly_fee_class],
        };
        const response = await UpdateClassFeeStructure(payload);
        if (response.status === "SUCCESS") {
          resetSchoolFeeCost({
            fees: data?.fees,
          });
          setSchool_fee_structure(data?.fees);
          setSchool_fee_structureDB(updated_monthly_fee_class);
          setEditCost(false);

          snackbarRef.current?.showSnackbar(`School Fees Updated.`, "success");
        } else {
          snackbarRef.current?.showSnackbar(
            `Unable To Update School Fee`,
            "error"
          );
        }
        return;
      }

      const class_fee_Structure = generateFeesStructure(_classList, data?.fees);

      const payload = {
        user: "pallav",
        arrayOfItems: class_fee_Structure,
      };
      const response = await AddClassFeeStructure(payload);
      if (response.status === "SUCCESS") {
        resetSchoolFeeCost({
          fees: data?.fees,
        });
        setSchool_fee_structure(data?.fees);
        setSchool_fee_structureDB(class_fee_Structure);
        console.log("School Fee Saved. Assign it to Class: ", classId);
        try {
          // under classes, for any given class and all sections fees_structure_id should be added
          const classes_filtered_records = classes.filter(
            (classObj: any) => classObj.class_id === classId
          );
          if (classes_filtered_records && classes_filtered_records.length > 0) {
            const classes_filtered_records_withFeeId =
              classes_filtered_records.map((record: any) => ({
                id: record.class_section_id,
                class_id: record.class_id,
                class_section_id: record.class_section_id,
                class_teacher_id: record.class_teacher_id,
                fees_structure_id:
                  class_fee_Structure[0].fees_structure_id || "",
                section: record.section,
                section_id: record.section_id,
                subjects: record.subjects,
                title: record.title,
              }));

            const payload = {
              user: "pallav",
              arrayOfItems: classes_filtered_records_withFeeId,
            };

            const response = await UpdateSubjectsToClass(payload);
            if (response.status === "SUCCESS") {
              snackbarRef.current?.showSnackbar(
                `School Fees Saved. Assgined To Class`,
                "success"
              );
            } else {
              snackbarRef.current?.showSnackbar(
                `School Fee Saved. Not Assigned To Class`,
                "warning"
              );
            }
          }
        } catch (error) {
          console.log("Exception Occured. Fee Assignment to Class");
          console.log(error);
          snackbarRef.current?.showSnackbar(
            `Some Error Occured. Fees Not Assigned To Class`,
            "error"
          );
        } finally {
          setAddingCost(false);
        }
      } else {
        snackbarRef.current?.showSnackbar(`Unable To Save School Fee`, "error");
        setAddingCost(false);
      }
    } catch (error) {
      console.log("Exception Occured");
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error Occured`, "error");
      setAddingCost(false);
    } finally {
    }
  };

  const SubmitShowFee = async (data: any) => {
    try {
      setLoadingCost(true);
      console.log("SubmitShowFee", data);
      let transformedData = {};
      const _class = classList.find(
        (cls: any) => cls.class_id === data.class_id
      );
      //@ts-ignore
      const CLASSNAME = _class.name;

      //@ts-ignore
      transformedData[data.class_id] = {};

      const fee_structure = await GetClassFeeStructure();
      const fee_structure_class = fee_structure.result.documents.find(
        (structure: any) => structure.class === CLASSNAME
      );
      console.log(fee_structure_class);

      if (
        fee_structure_class &&
        Object.entries(fee_structure_class).length > 0
      ) {
        const parsedFees = JSON.parse(fee_structure_class.monthly_fees);
        //@ts-ignore
        parsedFees.forEach(({ month, fees_particulars }) => {
          //@ts-ignore
          transformedData[data.class_id][month] = Object.fromEntries(
            Object.entries(fees_particulars).map(([key, value]) => [
              key,
              String(value),
            ])
          );
        });

        console.log(transformedData);

        resetSchoolFeeCost({
          fees: transformedData,
        });
        setSchool_fee_structure(transformedData);
        setSchool_fee_structureDB(fee_structure_class);
      } else {
        resetSchoolFeeCost({
          fees: {},
        });
        setSchool_fee_structure([]);
        setSchool_fee_structureDB([]);
      }

      setClassId(data.class_id);
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error Occured`, "error");
    } finally {
      setLoadingCost(false);
    }
  };

  const HandleSelectClassChange = (event: any) => {
    setClassId(undefined);
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
          onClick={() => navigate("/home")}
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

              <MyCustomButton
                variant="contained"
                type="submit"
                startIcon={adding ? <CircularProgress size={20} /> : null}
                disabled={adding}
                sx={{
                  alignSelf: "center",
                  height: "70%",
                  width: "30%",
                }}
              >
                {!edit ? (adding ? "" : "Add") : adding ? "" : "Save"}
              </MyCustomButton>
              <MyCustomButton
                variant="contained"
                type="reset"
                sx={{
                  alignSelf: "center",
                  height: "70%",
                  width: "30%",
                }}
              >
                Clear
              </MyCustomButton>
            </Box>
          </form>

          <DataGrid
            rows={applications}
            columns={columns}
            rowHeight={40}
            getRowId={(row) => row.feehead_id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[50, 100, 150]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: () => <CustomNoRowsOverlay loading={loading} />,
            }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            sx={{
              width: "60vw",
              maxWidth: "70vw",
              height: "65vh", // Ensures sufficient height
              minHeight: "300px", // Ensures the No Data message is always visible properly
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
          width={"90vw"}
        >
          <Typography variant="h5" alignSelf={"center"} mt={2}>
            <strong>Create Fees Structure</strong>
          </Typography>
          {applications?.length > 0 ? (
            <>
              <form
                onSubmit={handleSubmitShowFee(SubmitShowFee)}
                onReset={onResetHandlerShowFee}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                  gap={3}
                  width={"30vw"}
                >
                  <ControlledSelect
                    name="class_id"
                    control={controlShowFee}
                    errors={errorsShowFee}
                    label="Select Class"
                    rules={{ required: "Required" }}
                    options={classList.map((classItem: any) => ({
                      value: classItem.class_id,
                      label: classItem.name,
                    }))}
                    sx={{ width: "100%" }}
                    selectProps={{ onChange: HandleSelectClassChange }}
                  />

                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    startIcon={
                      loadingCost ? <CircularProgress size={20} /> : null
                    }
                    disabled={loadingCost}
                    sx={{
                      alignSelf: "center",
                      height: "70%",
                      width: "30%",
                    }}
                  >
                    {loadingCost ? "" : "Show"}
                  </MyCustomButton>
                  <MyCustomButton
                    variant="contained"
                    type="reset"
                    sx={{
                      alignSelf: "center",
                      height: "70%",
                      width: "30%",
                    }}
                  >
                    Clear
                  </MyCustomButton>
                </Box>
              </form>

              {classId && (
                <>
                  <form
                    onSubmit={handleSubmitForm2(HandleFeeStructureCreation)}
                  >
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
                            {/* <Typography variant="h6">
                              <strong>{`Class: ${classId}`}</strong>
                            </Typography> */}
                            {school_fee_structure &&
                            Object.entries(school_fee_structure).length > 0 ? (
                              !editCost ? (
                                <MyCustomButton
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault(); // Ensure it doesn't submit the form
                                    setEditCost(true);
                                  }}
                                  sx={{
                                    width: "auto",
                                    height: "100%",
                                    alignSelf: "center",
                                  }}
                                >
                                  Edit
                                </MyCustomButton>
                              ) : (
                                <MyCustomButton
                                  variant="contained"
                                  type="submit"
                                  sx={{
                                    width: "auto",
                                    height: "100%",
                                    alignSelf: "center",
                                  }}
                                  startIcon={
                                    addingCost ? (
                                      <CircularProgress size={20} />
                                    ) : null
                                  }
                                  disabled={addingCost}
                                >
                                  {addingCost ? "" : "Save Changes"}
                                </MyCustomButton>
                              )
                            ) : (
                              <MyCustomButton
                                variant="contained"
                                type="submit"
                                sx={{
                                  width: "10%",
                                  height: "100%",
                                  alignSelf: "center",
                                }}
                                startIcon={
                                  addingCost ? (
                                    <CircularProgress size={20} />
                                  ) : null
                                }
                                disabled={addingCost}
                              >
                                {addingCost ? "" : "Save"}
                              </MyCustomButton>
                            )}
                          </Box>

                          <TableContainer component={Paper}>
                            <Table size="medium" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Heads</StyledTableCell>
                                  {MONTHS.map((month: string) => (
                                    <StyledTableCell align="center" key={month}>
                                      {month.slice(0, 3)}
                                    </StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {applications.map(
                                  (feeObj: any, feeIndex: number) => (
                                    <StyledTableRow key={`${feeObj.title}`}>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {feeObj.title}
                                      </StyledTableCell>

                                      {MONTHS.map((key) => (
                                        <StyledTableCell
                                          align="right"
                                          key={key}
                                        >
                                          <ControlledTextField
                                            variant="standard"
                                            name={`fees.${classId}.${key}.${feeObj.title}`}
                                            control={controlForm2}
                                            errors={errorsForm2}
                                            label="₹0"
                                            type="number"
                                            disabled={
                                              Object.entries(
                                                school_fee_structure
                                              ).length > 0
                                                ? !editCost
                                                : false
                                            }
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
                  </form>
                </>
              )}
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              No Feeheads Added Yet.
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ManageFeeHeads;
