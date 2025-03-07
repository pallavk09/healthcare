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
} from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Box,
  styled,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import moment from "moment";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
// import { exam_records } from "../../Config/exams_records";
import {
  AddExam,
  GetExams,
  UpdateExam,
} from "../../api/Exams-Management/new_exam";

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
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
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

const AddExams = () => {
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [total, setTotal] = useState({
    term1: 0,
    term2: 0,
  });
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      session: "",
      code: "",
      name: "",
      max_marks: "",
      pass_marks: "",
      total_working_days: "",
    },
    mode: "onTouched",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [exam_records] = await Promise.all([GetExams()]);

        if (exam_records && exam_records.result.documents?.length > 0) {
          setApplications(exam_records.result.documents);
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
    CalculateTotal(applications);
  }, [applications]);

  useEffect(() => {
    if (selectedRow) {
      reset(selectedRow);
    }
  }, [selectedRow, reset]);

  const CalculateTotal = (applicationsData: any) => {
    const _totalMarks = applicationsData.reduce(
      (totalMarks: any, record: any) => {
        const marks = Number(record.max_marks);
        // Initialize if the session doesn't exist in totals
        if (!totalMarks[record.session]) {
          totalMarks[record.session] = 0;
        }
        totalMarks[record.session] += marks;
        console.log("totalMarks");
        console.log(totalMarks);
        return totalMarks;
      },
      {
        term1: 0,
        term2: 0,
      }
    );

    setTotal(_totalMarks);
  };

  const isDuplicate = (new_exam_item: any) => {
    return applications.some(
      (exam_item: any) =>
        exam_item.session === new_exam_item.session &&
        (exam_item.code === new_exam_item.code ||
          exam_item.name === new_exam_item.name)
    );
  };

  const updateExam = async (updated_exam_item: any) => {
    try {
      const item = applications.find(
        (subject: any) => subject.exam_id === updated_exam_item.exam_id
      );
      if (!item) return;

      const updatedexam_item = {
        ...updated_exam_item,
        id: item.exam_id,
        user: "pallav",
      };

      const updateItem = await UpdateExam(updatedexam_item);

      if (updateItem && updateItem.result) {
        setApplications((prevExamItem: any) =>
          prevExamItem.map((exam: any) =>
            exam.exam_id === updateItem.result.exam_id
              ? { ...exam, ...updateItem.result }
              : exam
          )
        );
        snackbarRef.current?.showSnackbar(`Item Updated`, "success");
      } else {
        snackbarRef.current?.showSnackbar(`Item not updated`, "error");
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const AddNewExamHandler = async (data: any) => {
    try {
      if (edit) {
        setAdding(true);
        updateExam(data);
        setEdit(false);
        reset({
          session: "",
          code: "",
          name: "",
          max_marks: "",
          pass_marks: "",
          total_working_days: "",
        });
      } else {
        setAdding(true);
        if (isDuplicate(data)) {
          snackbarRef.current?.showSnackbar(`Exam Already Present.`, "warning");
          return;
        }
        const _id = uuid().slice(0, 5);
        //In JavaScript/TypeScript, using as number for type assertion (data.total_working_days as number)
        //only tells TypeScript that you expect total_working_days to be a number—it does not actually convert it to a number.
        //If data.total_working_days is a string, it will remain a string at runtime.
        const new_exam = {
          ...data,
          total_working_days: parseInt(data.total_working_days),
          exam_id: _id,
          id: _id,
          user: "Pallav",
        };

        const addNewItem = await AddExam(new_exam);
        if (addNewItem && addNewItem.result) {
          const newExamList = [...applications, addNewItem.result];

          setApplications(newExamList);
          setEdit(false);
          reset({
            session: "",
            code: "",
            name: "",
            max_marks: "",
            pass_marks: "",
            total_working_days: "",
          });
          snackbarRef.current?.showSnackbar(
            `Exam added successfully.`,
            "success"
          );
        } else {
          snackbarRef.current?.showSnackbar(`Item not added`, "error");
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
      session: "",
      code: "",
      name: "",
      max_marks: "",
      pass_marks: "",
      total_working_days: "",
    });
    setEdit(false);
  };

  const columns: GridColDef[] = [
    { field: "session", headerName: "Session", flex: 1 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "max_marks", headerName: "Max. Marks", flex: 1 },
    { field: "pass_marks", headerName: "Passing Marks", flex: 1 },
    { field: "total_working_days", headerName: "Working Days", flex: 1 },
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
                exam_id: params.row.exam_id,
                session: params.row.session,
                code: params.row.code,
                name: params.row.name,
                max_marks: params.row.max_marks,
                pass_marks: params.row.pass_marks,
                total_working_days: params.row.total_working_days,
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

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        p={2}
        pb={0}
        gap={1}
      >
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
          flexDirection={"row"}
          justifyContent={"flex-end"}
          p={2}
          pb={0}
          gap={1}
        >
          <MyCustomButton
            variant="contained"
            endIcon={<ArrowRightIcon />}
            onClick={() => navigate("../schedule-exam")}
          >
            Schedule Exam
          </MyCustomButton>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        p={2}
        pt={0}
        height="auto"
        width="auto"
      >
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
            <strong>Create An Exam</strong>
          </Typography>

          <form
            onSubmit={handleSubmit(AddNewExamHandler)}
            onReset={onResetHandler}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              gap={3}
              width="auto"
            >
              <ControlledSelect
                name="session"
                control={control}
                errors={errors}
                label="Session"
                rules={{ required: "Required" }}
                options={[
                  { value: "", label: "Select" },
                  { value: "term1", label: "Term 1" },
                  { value: "term2", label: "Term 2" },
                ]}
                sx={{ width: "40%" }}
              />

              <ControlledTextField
                variant="standard"
                name="code"
                control={control}
                errors={errors}
                label="Exam Code"
                rules={{
                  required: "Required",
                }}
                required
                sx={{ width: "30%" }}
              />

              <ControlledTextField
                variant="standard"
                name="name"
                control={control}
                errors={errors}
                label="Exam Name"
                rules={{
                  required: "Required",
                }}
                required
                sx={{ width: "50%" }}
              />

              <ControlledTextField
                variant="standard"
                name="max_marks"
                control={control}
                errors={errors}
                label="Max. Marks"
                type="number"
                rules={{
                  required: "Required",
                }}
                required
                sx={{ width: "30%" }}
              />
              <ControlledTextField
                variant="standard"
                name="pass_marks"
                control={control}
                errors={errors}
                label="Passing Marks"
                type="number"
                rules={{
                  required: "Required",
                }}
                required
                sx={{ width: "30%" }}
              />
              <ControlledTextField
                variant="standard"
                name="total_working_days"
                control={control}
                errors={errors}
                label="Working days"
                type="number"
                rules={{
                  required: "Required",
                }}
                required
                sx={{ width: "30%" }}
              />

              <MyCustomButton
                variant="contained"
                type="submit"
                startIcon={adding ? <CircularProgress size={20} /> : null}
                disabled={adding}
                sx={{
                  alignSelf: "center",
                  height: "70%",
                  width: "20%",
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
                  width: "20%",
                }}
              >
                Clear
              </MyCustomButton>
            </Box>
          </form>
          <Typography variant="body1" alignSelf={"center"} mt={2}>
            Term 1: <strong>{total.term1}</strong> of <strong>100</strong>
          </Typography>
          <Typography variant="body1" alignSelf={"center"} mt={0}>
            Term 2: <strong>{total.term2}</strong> of <strong>100</strong>
          </Typography>

          <DataGrid
            rows={applications}
            columns={columns}
            rowHeight={40}
            getRowId={(row) => row.exam_id}
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
              width: "80vw",
              maxWidth: "90vw",
              height: "70vh", // Ensures sufficient height
              minHeight: "350px", // Ensures the No Data message is always visible properly
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
      </Box>
    </>
  );
};

export default AddExams;
