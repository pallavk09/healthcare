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
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { subjects } from "../../Config/subjects";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { classes } from "../../Config/classes";
import { classes_records } from "../../Config/classes_records";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import { v4 as uuid } from "uuid";
import ControlledMultiSelect from "../../common/ControlledComponents/ControlledMultiSelect";

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

const ManageSubjects = () => {
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [classList, setClassList] = useState<any>([]);
  const [subjectList, setSubjectList] = useState<any>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });
  const [selectedRow, setSelectedRow] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [classSubjectDefault, setClassSubjectDefault] = useState<any>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      code: "",
      title: "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit: handleSubmitForm2,
    control: controlForm2,
    formState: { errors: errorsForm2 },
    reset: resetForm2,
  } = useForm({
    defaultValues: {
      subjects: {},
    },
    mode: "onTouched",
  });

  // Update the form when classSubjectDefault is available
  useEffect(() => {
    if (classSubjectDefault && Object.keys(classSubjectDefault).length > 0) {
      resetForm2({
        subjects: classSubjectDefault,
      });
    }
  }, [classSubjectDefault, resetForm2]); // Depend on `classSubjectDefault`

  useEffect(() => {
    //@ts-ignore
    const _classSubjectDefault = classes.reduce(
      (acc, { class_id, subjects }) => {
        if (subjects.length > 0) {
          //@ts-ignore
          acc[class_id] = subjects.map(({ subject_id }) => subject_id);
        }
        return acc;
      },
      {}
    );

    setClassSubjectDefault(_classSubjectDefault);
    setClassList(classes_records);
    setApplications(subjects);
  }, []);

  useEffect(() => {
    if (selectedRow) {
      reset(selectedRow); // Reset form with selected row values
    }
  }, [selectedRow, reset]);

  useEffect(() => {
    if (applications && applications.length > 0) {
      const subjectListMultiSelect = applications.map((item: any) => ({
        id: item.subject_id,
        title: item.title,
      }));
      console.log("subjectListMultiSelect");
      console.log(subjectListMultiSelect);
      setSubjectList(subjectListMultiSelect);
    }
  }, [applications]);

  const onResetHandler = () => {
    reset({
      code: "",
      title: "",
    });
    setEdit(false);
  };

  const isDuplicate = (code: string, title: string) => {
    return applications.some(
      (subject: any) => subject.code === code || subject.title === title
    );
  };

  const updateItem = (updatedSubject: any) => {
    setApplications((prevSubjects: any) =>
      prevSubjects.map((subject: any) =>
        subject.code === updatedSubject.code
          ? { ...subject, ...updatedSubject }
          : subject
      )
    );
  };

  const handleFormSubmit = async (data: any) => {
    console.log("Handle submit for Subject");
    console.log(data);
    if (edit) {
      updateItem(data);
      setEdit(false);
      reset({
        code: "",
        title: "",
      });
      snackbarRef.current?.showSnackbar(
        `Entry updated successfully.`,
        "success"
      );
    } else {
      if (isDuplicate(data.code, data.title)) {
        console.log("Duplicate");
        snackbarRef.current?.showSnackbar(
          `Subject Already Present.`,
          "warning"
        );
        return;
      }
      const _id = uuid().slice(0, 5);
      const subject_item = { ...data, subject_id: _id, id: _id };

      const newApplicationList = [...applications, subject_item];
      console.log(newApplicationList);
      setApplications(newApplicationList);
      setEdit(false);
      reset({
        code: "",
        title: "",
      });
      snackbarRef.current?.showSnackbar(
        `Subject added successfully.`,
        "success"
      );
    }
  };

  const HandleSubjectClassAssignment = async (data: any) => {
    console.log("Handle subject class assignment");
    console.log(data);
    //@ts-ignore
    const subject_class = classList.map(({ id, class_id, name }) => ({
      id,
      class_id,
      title: name,
      class_teacher_id: "", // Placeholder
      students: [], // Placeholder
      subjects: (data.subjects[class_id] || []).map((subject_id: string) => ({
        subject_id,
        teacher_id: "",
      })),
      fee_structure: [], // Placeholder
    }));

    console.log("subject_teachers");
    console.log(subject_class);

    snackbarRef.current?.showSnackbar(`Subjects assigned.`, "success");
  };

  const columns: GridColDef[] = [
    { field: "code", headerName: "Subject Code", flex: 1 },
    { field: "title", headerName: "Subject Title", flex: 1 },
    // { field: "marking", headerName: "Marking", flex: 1 },
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
                code: params.row.code,
                title: params.row.title,
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
            <strong>Add New Subject</strong>
          </Typography>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            onReset={onResetHandler}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              gap={2}
              width="auto"
            >
              <ControlledTextField
                variant="standard"
                name="code"
                control={control}
                errors={errors}
                label="Subject Code"
                rules={{
                  required: "Required",
                }}
                required
                disabled={edit}
              />

              <ControlledTextField
                variant="standard"
                name="title"
                control={control}
                errors={errors}
                label="Subject Title"
                rules={{
                  required: "Required",
                }}
                required
              />

              <MyCustomButton variant="contained" type="submit">
                {!edit ? "Add" : "Save"}
              </MyCustomButton>
              <MyCustomButton variant="contained" type="reset">
                Clear
              </MyCustomButton>
            </Box>
          </form>

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
              width: "60vw",
              maxWidth: "70vw",
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

        <Box
          display={"flex"}
          flexDirection={"column"}
          p={2}
          pt={0}
          height="auto"
          justifyContent={"center"}
          alignItems={"center"}
          mt={1}
        >
          {/* <Typography variant="h6" alignSelf={"center"}>
            <strong>Subjects To Class Assignment</strong>
          </Typography> */}
          <form onSubmit={handleSubmitForm2(HandleSubjectClassAssignment)}>
            <Accordion
              sx={{
                mt: 2,
                width: "80vw",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  <strong>Subjects To Class Assignment</strong>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} display={"flex"} flexDirection={"column"}>
                    <>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                        mb={2}
                      >
                        <AnimatedButton
                          label="Save"
                          disabled={false}
                          type={"submit"}
                        />
                        {"|"}
                        <AnimatedButton
                          label="Edit"
                          onClick={() => console.log("Get TC Clicked")}
                          disabled={false}
                        />
                      </Box>
                      <TableContainer component={Paper}>
                        <Table size="medium" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>Class</StyledTableCell>
                              <StyledTableCell align="center">
                                Subjects
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {classList.length > 0 &&
                              classList.map((class_item: any) => (
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {`${class_item?.name}`}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    <ControlledMultiSelect
                                      name={`subjects.${class_item.id}`}
                                      control={controlForm2}
                                      errors={errorsForm2}
                                      label="Subjects"
                                      options={subjectList}
                                      // rules={{
                                      //   required:
                                      //     "At least one subject is required",
                                      // }}
                                      sx={{ width: 900 }}
                                    />
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ManageSubjects;
