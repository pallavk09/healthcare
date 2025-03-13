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
  CircularProgress,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";

import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import HomeIcon from "@mui/icons-material/Home";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
// import { subjects } from "../../Config/subjects";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { classes } from "../../Config/classes";
// import { classes_records } from "../../Config/classes_records";
import { sections } from "../../Config/sections_records";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import { v4 as uuid } from "uuid";
import ControlledMultiSelect from "../../common/ControlledComponents/ControlledMultiSelect";
import {
  Get,
  Add,
  Update,
  GetSubjectsToClass,
  AddSubjectsToClass,
  UpdateSubjectsToClass,
} from "../../api/Control-Settings/manage-subjects";
import { Get as GetClass } from "../../api/Control-Settings/manage-class";
import { useUser } from "../../store/UserLoginContext";

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
  const { user } = useUser();
  const snackbarRef = React.useRef<SnackbarHandle>(null);
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any>([]);
  const [classList, setClassList] = useState<any>([]);
  const [subjectList, setSubjectList] = useState<any>([]);
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({ page: 0, pageSize: 50 });
  const [selectedRow, setSelectedRow] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);
  const [editAssignment, setEditAssignment] = useState<boolean>(false);
  const [classSubjectDefault, setClassSubjectDefault] = useState<any>([]);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [addingAssignment, setAddingAssignment] = useState(false);
  const [assignmentMappedData, setAssignmentFlatMapped] = useState<any>([]);
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

  // Update the class to subject assignment when classSubjectDefault is available
  useEffect(() => {
    if (classSubjectDefault && Object.keys(classSubjectDefault).length > 0) {
      resetForm2({
        subjects: classSubjectDefault,
      });
    }
  }, [classSubjectDefault, resetForm2]); // Depend on `classSubjectDefault`

  useEffect(() => {
    console.log("User fetched from context as :", user);
    const fetchData = async () => {
      try {
        setLoading(true);
        const [data, classes_records, classes] = await Promise.all([
          Get(),
          GetClass(),
          GetSubjectsToClass(),
        ]);

        if (data && data.result.documents?.length > 0) {
          setApplications(data.result.documents);
        }
        if (classes_records && classes_records.result.documents?.length > 0) {
          setClassList(classes_records.result.documents);
        }
        if (classes && classes.result.documents?.length > 0) {
          console.log("classes");
          console.log(classes);
          const _classSubjectDefault = classes.result.documents.reduce(
            //@ts-ignore
            (acc, { class_id, subjects }) => {
              const subjects_json = JSON.parse(subjects);
              if (subjects_json && subjects_json?.length > 0) {
                acc[class_id] = subjects_json.map(
                  //@ts-ignore
                  ({ subject_id }) => subject_id
                );
              }
              return acc;
            },
            {}
          );
          console.log("_classSubjectDefault");
          console.log(_classSubjectDefault);
          setAssignmentFlatMapped(classes.result.documents);
          setClassSubjectDefault(_classSubjectDefault);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        snackbarRef.current?.showSnackbar(`Error fetching data`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRow) {
      reset(selectedRow);
    }
  }, [selectedRow, reset]);

  //THIS WILL UPDATE SUBJECT ITEM UNDER ACCORDIAN IF NEW SUBJECT ADDED
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

  const updateItem = async (updatedSubject: any) => {
    try {
      setAdding(true);
      // console.log("updatedSubject");
      // console.log(updatedSubject);
      const item = applications.find(
        (subject: any) => subject.code === updatedSubject.code
      );
      if (!item) return;

      console.log(item);
      const updatedsubject_item = {
        ...updatedSubject,
        subject_id: item.subject_id,
        id: item.subject_id,
        user: "pallav",
      };

      const updateItem = await Update(updatedsubject_item);

      if (updateItem && updateItem.result) {
        setApplications((prevSubjects: any) =>
          prevSubjects.map((subject: any) =>
            subject.code === updateItem.result.code
              ? { ...subject, ...updateItem.result }
              : subject
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

  const handleFormSubmit = async (data: any) => {
    try {
      console.log("Handle submit for Subject");
      console.log(data);
      setAdding(true);
      if (edit) {
        updateItem(data);
        setEdit(false);
        reset({
          code: "",
          title: "",
        });
        snackbarRef.current?.showSnackbar(`Entry updated.`, "success");
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
        const subject_item = {
          ...data,
          subject_id: _id,
          id: _id,
          user: "pallav",
        };

        const addNewItem = await Add(subject_item);
        // console.log("addNewItem");
        // console.log(addNewItem);
        if (addNewItem && addNewItem.result) {
          const newApplicationList = [...applications, addNewItem.result];
          // console.log(newApplicationList);
          setApplications(newApplicationList);
          setEdit(false);
          reset({
            code: "",
            title: "",
          });
          snackbarRef.current?.showSnackbar(`Subject Added.`, "success");
        } else {
          snackbarRef.current?.showSnackbar(`Item Not Added`, "error");
        }
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error Occured`, "error");
    } finally {
      setAdding(false);
    }
  };

  const HandleSubjectClassAssignment = async (data: any) => {
    try {
      // console.log("Handle subject class assignment");
      // console.log(data);
      setAddingAssignment(true);

      if (editAssignment) {
        console.log("assignmentMappedData");
        console.log(assignmentMappedData);

        const re_mapped = assignmentMappedData.map((item: any) => {
          let subjectsArray = JSON.parse(item.subjects);
          // console.log(subjectsArray);
          const allowedSubjects = data.subjects[item.class_id] || [];
          // console.log(allowedSubjects);

          const itemsetMap = new Map(
            subjectsArray.map((item: any) => [item.id, item])
          );

          const updatedItemset1 = allowedSubjects.map(
            (id: any) =>
              itemsetMap.get(id) || {
                id,
                subject_id: id,
                teacher_id: "",
                class_teacher: "No",
              }
          );

          return {
            class_id: item.class_id,
            id: item.class_section_id,
            title: item.title,
            class_teacher_id: item.class_teacher_id,
            fees_structure_id: item.fees_structure_id,
            class_section_id: item.class_section_id,
            section: item.section,
            section_id: item.section_id,
            subjects: JSON.stringify(updatedItemset1), // Convert back to string to match original format
          };
        });

        console.log("re_mapped");
        console.log(re_mapped);
        const payload = {
          user: "pallav",
          arrayOfItems: re_mapped,
        };
        const response = await UpdateSubjectsToClass(payload);

        const _classSubjectDefault = re_mapped.reduce(
          //@ts-ignore
          (acc, { class_id, subjects }) => {
            const subjects_json = JSON.parse(subjects);
            if (subjects_json && subjects_json?.length > 0) {
              acc[class_id] = subjects_json.map(
                //@ts-ignore
                ({ subject_id }) => subject_id
              );
            }
            return acc;
          },
          {}
        );

        setClassSubjectDefault(_classSubjectDefault);
        setEditAssignment(false);

        //TO BE ADDED INTO APPWRITE DATABASE
        ///api/v1/subject/add-subject-to-class

        snackbarRef.current?.showSnackbar(`Subjects assigned.`, "success");
      }

      //@ts-ignore
      const subject_class = classList.map(({ id, class_id, name }) => ({
        class_id,
        title: name,
        class_teacher_id: "", // Placeholder
        //students: [], // Placeholder
        subjects: JSON.stringify(
          (data.subjects[class_id] || []).map((subject_id: string) => ({
            id: subject_id,
            subject_id,
            teacher_id: "",
            class_teacher: "No", //Yes or No
          }))
        ),
        fees_structure_id: "", // Placeholder
      }));

      const subject_class_sections = subject_class.map(
        (subject_class_item: any) =>
          sections.map((sectionItem: any) => ({
            section: sectionItem.name,
            section_id: sectionItem.section_id,
            ...subject_class_item,
          }))
      );

      // console.log("subject_class_sections");
      // console.log(subject_class_sections);

      const mappedData = subject_class_sections.flat().map((item: any) => {
        const _id = uuid().slice(0, 5);
        return {
          ...item,
          id: _id,
          class_section_id: _id,
        };
      });
      const payload = {
        user: "pallav",
        arrayOfItems: mappedData,
      };
      const response = await AddSubjectsToClass(payload);

      const _classSubjectDefault = mappedData.reduce(
        //@ts-ignore
        (acc, { class_id, subjects }) => {
          const subjects_json = JSON.parse(subjects);
          if (subjects_json && subjects_json?.length > 0) {
            acc[class_id] = subjects_json.map(
              //@ts-ignore
              ({ subject_id }) => subject_id
            );
          }
          return acc;
        },
        {}
      );

      setClassSubjectDefault(_classSubjectDefault);

      //TO BE ADDED INTO APPWRITE DATABASE
      ///api/v1/subject/add-subject-to-class

      snackbarRef.current?.showSnackbar(`Subjects assigned.`, "success");
    } catch (error) {
      console.log("Exception Occured");
      console.log(error);
      snackbarRef.current?.showSnackbar(`Some Error Occured`, "error");
    } finally {
      setAddingAssignment(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "code", headerName: "Subject Code", flex: 1 },
    { field: "title", headerName: "Subject Title", flex: 1 },
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
            getRowId={(row) => row.subject_id}
            columns={columns}
            rowHeight={40}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[50, 100, 150]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            loading={loading}
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
              // width: "60vw",
              // maxWidth: "70vw",
              // height: "65vh",
              // marginTop: "15px",

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
          {loading ? (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="200px"
              >
                <CircularProgress />
              </Box>
            </>
          ) : (
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
                          {classSubjectDefault &&
                          Object.entries(classSubjectDefault).length > 0 ? (
                            !editAssignment ? (
                              <MyCustomButton
                                variant="contained"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault(); // Ensure it doesn't submit the form
                                  setEditAssignment(true);
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
                                  addingAssignment ? (
                                    <CircularProgress size={20} />
                                  ) : null
                                }
                                disabled={addingAssignment}
                              >
                                {addingAssignment ? "" : "Save Changes"}
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
                                addingAssignment ? (
                                  <CircularProgress size={20} />
                                ) : null
                              }
                              disabled={addingAssignment}
                            >
                              {addingAssignment ? "" : "Save"}
                              {/* {!editAssignment ? "Save" : "Update"} */}
                            </MyCustomButton>
                          )}
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
                                  <StyledTableRow
                                    key={`${class_item?.class_id}`}
                                  >
                                    <StyledTableCell component="th" scope="row">
                                      {`${class_item?.name}`}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      <ControlledMultiSelect
                                        name={`subjects.${class_item.class_id}`}
                                        control={controlForm2}
                                        errors={errorsForm2}
                                        label="Subjects"
                                        options={subjectList}
                                        sx={{ width: 900 }}
                                        disabled={
                                          Object.entries(classSubjectDefault)
                                            .length > 0
                                            ? !editAssignment
                                            : false
                                        }
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
          )}
        </Box>
      </Box>
    </>
  );
};

export default ManageSubjects;
