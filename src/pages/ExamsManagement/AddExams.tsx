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
import { Button, Typography, Box, styled } from "@mui/material";
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
import { exam_records } from "../../Config/exams_records";

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

const CustomToolbar: React.FC = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
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
    setApplications(exam_records);
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
        exam_item.code === new_exam_item.code ||
        exam_item.name === new_exam_item.name
    );
  };

  const updateExam = (new_exam_item: any) => {
    setApplications((prevExamItem: any) =>
      prevExamItem.map((prevExamItem: any) =>
        prevExamItem.exam_id === new_exam_item.exam_id
          ? { ...prevExamItem, ...new_exam_item }
          : prevExamItem
      )
    );
  };

  const AddNewExamHandler = async (data: any) => {
    console.log("Add New Exams Submit");
    console.log(data);
    if (edit) {
      console.log("edit");
      updateExam(data);
      console.log("Updated ExamList");
      console.log(data);
      snackbarRef.current?.showSnackbar(
        `Exam updated successfully.`,
        "success"
      );
    } else {
      if (isDuplicate(data)) {
        snackbarRef.current?.showSnackbar(`Exam Already Present.`, "warning");
        return;
      }
      console.log("New");
      const _id = uuid().slice(0, 5);
      const new_exam = {
        ...data,
        exam_id: _id,
        id: _id,
        total_working_days: 0,
        created_on: moment().format("DD/MM/YYYY"),
      };

      const newExamList = [...applications, new_exam];
      console.log("newExamList");
      console.log(newExamList);
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
      snackbarRef.current?.showSnackbar(`Exam added successfully.`, "success");
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
    { field: "created_on", headerName: "Created On", flex: 1 },
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
              console.log(params);
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
            onClick={() => navigate("/schooladmin")}
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
            <strong>Create Exam</strong>
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
                label="Code"
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
                label="Name"
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
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
              >
                {!edit ? "Add" : "Save"}
              </MyCustomButton>
              <MyCustomButton
                variant="contained"
                type="reset"
                sx={{ width: "10%", height: "70%", alignSelf: "center" }}
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
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[50, 100, 150]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            sx={{
              width: "80vw",
              maxWidth: "90vw",
              height: "65vh",
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
