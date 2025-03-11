import React, { FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  Grid,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { studentData } from "../../common/types";
import { useForm, Controller } from "react-hook-form";
import { MyCustomButton } from "../../common/MyCustomControls";
import CustomDatePicker from "../DatePicker";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";
import PersonIcon from "@mui/icons-material/Person";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { GeneratePrevieUrl } from "../../common/utils/generatePreviewUrl";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { sections } from "../../Config/sections_records";
// import { classes_records } from "../../Config/classes_records";
import { vehicles_records } from "../../Config/vehicles_records";
import { stops_records } from "../../Config/stops_records";
import { AddBoxSharp } from "@mui/icons-material";
import { GetAcademicsRecord } from "../../api/Students-Management/add-view-students";
import { GetSections } from "../../api/Students-Management/manage-section";
import { Get as GetClass } from "../../api/Control-Settings/manage-class";
import {
  GetStops,
  GetVehicles,
} from "../../api/Control-Settings/manage-transport";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: studentData) => void;
  profileData: any;
  resetFormRef?: React.MutableRefObject<() => void>;
  isEditing: boolean;
  onEdit: () => void;
  addSibling?: boolean;
  isLoading?: boolean;
}

const SESSIONS = ["term1", "term2"];
const ALLOWED_EXTENTIONS = ["jpg", "jpeg", "png"];
const ALLOWED_FILE_SIZE = 2;

const ProfileDialogStudentDetailsAdmin: React.FC<ProfileDialogProps> = ({
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
    shouldUnregister: false, // Prevents unnecessary re-renders
  });
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photofile, setPhotoFile] = useState<File>();
  const [_profileData, _SetProfileData] = useState(profileData);
  const [isFormReady, setIsFormReady] = useState(false);

  const [classList, setClassList] = useState<any>([]);
  const [sectionsList, setSectionsList] = useState<any>([]);
  const [vehicle_Stops, setVehicle_stops] = useState<any>([]);
  const [stopNames, setStopNames] = useState<any>([]);
  const [vehicles, setVehicles] = useState<any>([]);
  const [transportMode, setTransportMode] = useState("");
  // const [academiceRecordList, setAcademiceRecordList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [vehicleNo, setVehicleNo] = useState("");
  const [errorMsgPhoto, setErrorMsgPhoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          classes_records,
          section_records,
          stops_records,
          vehicles_records,
        ] = await Promise.all([
          // GetAcademicsRecord(),
          GetClass(),
          GetSections(),
          GetStops(),
          GetVehicles(),
        ]);

        // if (academic_records && academic_records.result.documents?.length > 0) {
        //   setAcademiceRecordList(academic_records.result.documents);
        //   // console.log("academiceRecordList");
        //   // console.log(academic_records.result.documents);
        // }
        if (classes_records && classes_records.result.documents?.length > 0) {
          setClassList(classes_records.result.documents);
        }
        if (section_records && section_records.result.documents?.length > 0) {
          setSectionsList(section_records.result.documents);
        }
        if (stops_records && stops_records.result.documents?.length > 0) {
          setStopNames(stops_records.result.documents);
        }
        if (vehicles_records && vehicles_records.result.documents?.length > 0) {
          setVehicles(vehicles_records.result.documents);
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
    if (
      profileData &&
      vehicles_records &&
      stops_records &&
      Object.keys(profileData).length > 0 &&
      Object.keys(vehicles_records).length > 0 &&
      Object.keys(stops_records).length > 0
    ) {
      const _vehicle_stops = vehicles_records.map((vehicle) => ({
        vehicle_no: vehicle.vehicle_no,
        vehicle_id: vehicle.vehicle_id,
        name: stops_records
          .filter((stop) => stop.vehicle_id === vehicle.vehicle_id)
          .map((stop) => stop.name),
      }));

      const stopList = _vehicle_stops.filter(
        (stop: any) =>
          stop.vehicle_id === profileData.transport_details.vehicle_id
      );

      stopList[0]?.name && setStopNames(stopList[0]?.name || []);

      setVehicle_stops(_vehicle_stops);
      setTransportMode(profileData.transport_details.mode);

      console.log("Setting Profile data state");
      console.log(profileData);
      setVehicleNo(profileData.transport_details.vehicle_no);
      _SetProfileData(profileData); // Update state correctly
    }
  }, [profileData, vehicles_records, stops_records]); // Re-run when `profileData` updates

  useEffect(() => {
    if (isOpen && profileData && Object.keys(profileData).length > 0) {
      setIsFormReady(false);
      setTimeout(() => {
        setIsFormReady(true);
      }, 200); // Reduce delay to avoid lag
    }
  }, [isOpen, profileData]); // Remove `_profileData`, rely on `profileData`

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      console.log("Under useEffect of View Student Data");
      console.log(profileData);
      reset(profileData); // Reset form with new profileData
      setVehicleNo("");

      const getPhotoUrl = profileData.photoUrl
        ? GeneratePrevieUrl(profileData.photoUrl)
        : "";

      if (profileData.photoUrl) {
        setPhotoFile(undefined);
      }

      setPhoto(getPhotoUrl);
    }
  }, [profileData, reset]); // Ensure it runs only when `profileData` is valid

  useEffect(() => {
    if (resetFormRef) {
      const getPhotoUrl = profileData.photoUrl
        ? GeneratePrevieUrl(profileData.photoUrl)
        : "";
      profileData.photoUrl && setPhotoFile(undefined);
      setPhoto(getPhotoUrl);
      resetFormRef.current = () => reset(profileData);
      setVehicleNo("");
    }
  }, [resetFormRef, reset, profileData]);

  // Create a custom onClose handler for the Dialog component.
  const handleDialogClose = (event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      // Prevent closing when clicking outside or pressing escape.
      return;
    }
    // Otherwise, call the parent's onClose function.
    onClose();
  };

  const handleFormSubmit = async (data: any) => {
    try {
      console.log("handleFormSubmit");
      const _class = classList.find(
        (item: any) => item.class_id === data.academic_records[0].class_id
      );
      const _section = sectionsList.find(
        (item: any) => item.section_id === data.academic_records[0].section_id
      );
      const _id = uuid().slice(0, 6);

      let updatedData = addSibling
        ? {
            ...data,
            id: _id,
            student_id: _id,
            photofile,
            class_id: data.academic_records[0].class_id,
            class_name: _class?.name,
            section_id: data.academic_records[0].section_id,
            section_name: _section?.name,
            roll_number: data.academic_records[0].roll_number,
            academic_records: {
              ...data.academic_records,
              academic_year: GetCurrentAcademciSession(),
            },
            transport_details: {
              ...data.transport_details,
              vehicle_no: vehicleNo,
            },
          }
        : {
            ...data,
            photofile,
            class_id: data.academic_records.class_id,
            class_name: _class?.name,
            section_id: data.academic_records.section_id,
            section_name: _section?.name,
            roll_number: data.academic_records.roll_number,
            transport_details: {
              ...data.transport_details,
              vehicle_no: vehicleNo,
            },
          };
      console.log(updatedData);
      const isValid = await trigger();
      if (isValid) {
        onSubmit(updatedData);
        onClose();
      } else {
        console.log("Data submission. Validation failed");
      }
    } catch (error) {
      console.log("Error While Adding/Updating student: ");
      console.log(error);
    } finally {
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (event: any) => {
    setErrorMsgPhoto("");
    const file = event.target.files[0];
    if (!file) return;

    const maxFileSize = ALLOWED_FILE_SIZE * 1024 * 1024; // 2MB

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileSize = file.size;
    console.log("fileExtension", fileExtension);
    console.log("fileSize", fileSize);

    // Validate file extension
    if (!fileExtension || !ALLOWED_EXTENTIONS.includes(fileExtension)) {
      setErrorMsgPhoto("Invalid file type.");
      return;
    }

    // Validate file size
    if (fileSize > maxFileSize) {
      setErrorMsgPhoto("File size exceeds 2MB");
      return;
    }

    console.log("Photo Upload");
    console.log(event);
    setPhotoFile(file);
    // formData.append("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const HandleStopNameChange = (event: any) => {
    console.log("HandleStopNameChange");
    console.log(event.target.value);
    const stopDetail = stopNames.find(
      (stop: any) => stop.name === event.target.value
    );
    console.log(stopDetail);
    const vehicle_id = stopDetail.vehicle_id;
    console.log(vehicle_id);

    const vehicleDetail = vehicles.find(
      (vehicle: any) => vehicle.vehicle_id === vehicle_id
    );
    console.log(vehicleDetail);
    setVehicleNo(vehicleDetail.vehicle_no || "Not Found");
  };

  const HandleTransportModeChange = (event: any) => {
    setTransportMode(event.target.value);
  };

  const GetCurrentAcademciSession = () => {
    const academic_session = `${moment().year()}-${moment().year() + 1}`;
    return academic_session;
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>
            {addSibling
              ? "New Registration"
              : `${_profileData?.personal_details?.name}`}
          </strong>
        </Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

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
        {!isFormReady || !profileData || loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Admission Details */}
              <Accordion sx={{ mt: 2, borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Admission Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4} sx={{ mt: -3 }}>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Typography variant="body2" pt={0}>
                          <strong>Admission Date: </strong>
                        </Typography>
                        <ControlledTextField
                          name="admission_date"
                          control={control}
                          errors={errors}
                          // label="Admission Date"
                          fullWidth
                          type="date"
                          disabled={!addSibling}
                          sx={{ width: "15%", mt: 0, ml: 0 }}
                        />
                      </Box>
                      <ControlledTextField
                        name="admission_id"
                        control={control}
                        errors={errors}
                        label="Admission Id"
                        fullWidth
                        disabled={!addSibling}
                      />

                      {/* </Grid> */}
                      <ControlledTextField
                        name="apaar"
                        control={control}
                        errors={errors}
                        label="Apaar Id"
                        fullWidth
                        disabled={!isEditing}
                        sx={{ mt: 1 }}
                      />

                      <ControlledTextField
                        name="pen"
                        control={control}
                        errors={errors}
                        label="Pen Id"
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />

                      <ControlledTextField
                        name="adhaar"
                        control={control}
                        errors={errors}
                        label="Adhaar No"
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                    >
                      {/* <CustomDatePicker
                        format="YYYY-MM-DD"
                        name="admission_date"
                        label="Admission Date"
                        control={control}
                        errors={errors}
                        selectedDate={_profileData?.admission_date}
                        disabled={!isEditing}
                      /> */}

                      <ControlledSelect
                        name="admission_catagory"
                        control={control}
                        errors={errors}
                        label="Admission Catagory"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "general", label: "General" },
                          { value: "staff_ward", label: "Staff Ward" },
                          { value: "bpl", label: "BPL" },
                        ]}
                        sx={{ width: "31%", mt: 0, ml: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="admission_scheme"
                        control={control}
                        errors={errors}
                        label="Scheme"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "rte", label: "RTE" },
                          { value: "non-rte", label: "Non RTE" },
                        ]}
                        sx={{ width: "31%", mt: 0, ml: 3 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                    >
                      <ControlledSelect
                        name="cast"
                        control={control}
                        errors={errors}
                        label="Cast"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "gen", label: "GEN" },
                          { value: "obc1", label: "OBC1" },
                          { value: "obc2", label: "OBC2" },
                          { value: "st", label: "ST" },
                          { value: "sc", label: "SC" },
                        ]}
                        sx={{ width: "31%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      {/* Is Active */}
                      <ControlledSelect
                        name="is_active"
                        control={control}
                        errors={errors}
                        label="Is Active"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "active", label: "active" },
                          { value: "inactive", label: "inactive" },
                        ]}
                        sx={{ width: "31%", mt: 0, ml: 3 }}
                        disabled={addSibling ? false : !isEditing}
                      />
                    </Grid>
                    <Typography variant="body2" pl={2} pt={2} ml={2}>
                      <strong>Previous School Details</strong>
                    </Typography>
                    {/* Previous School Details */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="previous_school.name"
                        control={control}
                        errors={errors}
                        label="School Name"
                        fullWidth
                        disabled={!isEditing}
                      />
                      {/* English Hindi Maths */}
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <ControlledTextField
                          name={`previous_school.marks.english`}
                          control={control}
                          errors={errors}
                          label="Marks English"
                          type="number"
                          // rules={{
                          //   required: "Required",
                          // }}
                          sx={{ width: "30%", mt: 0 }}
                          // required
                          disabled={addSibling ? false : !isEditing}
                        />

                        <ControlledTextField
                          name={`previous_school.marks.maths`}
                          control={control}
                          errors={errors}
                          label="Marks Maths"
                          type="number"
                          // rules={{
                          //   required: "Required",
                          // }}
                          sx={{ width: "30%", mt: 0 }}
                          // required
                          disabled={addSibling ? false : !isEditing}
                        />

                        <ControlledTextField
                          name={`previous_school.marks.hindi`}
                          control={control}
                          errors={errors}
                          label="Marks Hindi"
                          type="number"
                          // rules={{
                          //   required: "Required",
                          // }}
                          sx={{ width: "30%", mt: 0 }}
                          // required
                          disabled={addSibling ? false : !isEditing}
                        />
                      </Grid>

                      {/* English Hindi Maths */}
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        gap={5}
                      >
                        <ControlledTextField
                          name={`previous_school.marks.science`}
                          control={control}
                          errors={errors}
                          label="Marks Science"
                          type="number"
                          // rules={{
                          //   required: "Required",
                          // }}
                          sx={{ width: "30%", mt: 0 }}
                          // required
                          disabled={addSibling ? false : !isEditing}
                        />

                        <ControlledTextField
                          name={`previous_school.marks.computer`}
                          control={control}
                          errors={errors}
                          label="Marks Computer"
                          type="number"
                          // rules={{
                          //   required: "Required",
                          // }}
                          sx={{ width: "30%", mt: 0 }}
                          // required
                          disabled={addSibling ? false : !isEditing}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Personal Details */}
              <Accordion sx={{ mt: 1, borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Personal Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4} sx={{ mt: -3 }}>
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      gap={3}
                    >
                      <Grid
                        item
                        width={"15%"}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <Box
                          sx={{
                            mt: { xs: 2, md: 0 },
                            width: 132,
                            height: 170,
                            border: "2px solid #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f5f5f5",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            {photo ? (
                              <>
                                <Avatar
                                  src={photo as string}
                                  alt="Student Photo"
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  variant="square"
                                />
                                {/* Hover effect for Camera Icon */}
                                {(addSibling || isEditing) && (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      bottom: 0,
                                      left: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      bgcolor: "rgba(0, 0, 0, 0.4)", // Dark overlay on hover
                                      opacity: 0,
                                      transition: "opacity 0.3s ease",
                                      cursor: "pointer",
                                      "&:hover": {
                                        opacity: 1, // Show icon on hover
                                      },
                                    }}
                                    onClick={() =>
                                      document
                                        .getElementById("photo-upload")
                                        ?.click()
                                    } // Trigger file input on click
                                  >
                                    <Box
                                      display={"flex"}
                                      flexDirection="column"
                                      justifyContent={"center"}
                                      alignItems={"center"}
                                    >
                                      <PhotoCameraIcon
                                        sx={{ color: "white", fontSize: 40 }}
                                      />
                                      <Typography
                                        variant="caption"
                                        alignSelf={"center"}
                                        color="#fff"
                                        sx={{ fontSize: "0.65rem" }}
                                      >
                                        <strong>jpg, jpeg, png</strong> max{" "}
                                        <strong>2MB</strong>
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}
                                <input
                                  id="photo-upload"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={handlePhotoUpload}
                                />
                              </>
                            ) : (
                              <>
                                <Avatar
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    bgcolor: "#f0f0f0", // Background color for the empty avatar
                                  }}
                                  variant="square"
                                >
                                  <PersonIcon
                                    sx={{ fontSize: 120, color: "#bdbdbd" }}
                                  />
                                </Avatar>
                                {/* Hover effect for Camera Icon when no photo */}
                                {(addSibling || isEditing) && (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      bottom: 0,
                                      left: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      bgcolor: "rgba(0, 0, 0, 0.4)", // Dark overlay on hover
                                      opacity: 0,
                                      transition: "opacity 0.3s ease",
                                      cursor: "pointer",
                                      "&:hover": {
                                        opacity: 1, // Show icon on hover
                                      },
                                    }}
                                    onClick={() =>
                                      document
                                        .getElementById("photo-upload")
                                        ?.click()
                                    } // Trigger file input on click
                                  >
                                    <Box
                                      display={"flex"}
                                      flexDirection="column"
                                      justifyContent={"center"}
                                      alignItems={"center"}
                                    >
                                      <PhotoCameraIcon
                                        sx={{ color: "white", fontSize: 40 }}
                                      />
                                      <Typography
                                        variant="caption"
                                        alignSelf={"center"}
                                        color="#fff"
                                        sx={{ fontSize: "0.65rem" }}
                                      >
                                        <strong>jpg, jpeg, png</strong> max{" "}
                                        <strong>2MB</strong>
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}

                                <input
                                  id="photo-upload"
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={handlePhotoUpload}
                                />
                              </>
                            )}
                          </Box>
                        </Box>
                        {errorMsgPhoto && (
                          <Typography
                            variant="caption"
                            alignSelf={"center"}
                            color="red"
                            sx={{ fontSize: "0.65rem" }}
                          >
                            {errorMsgPhoto}
                          </Typography>
                        )}
                      </Grid>

                      <Grid
                        container
                        width={"80%"}
                        display="flex"
                        flexDirection={"column"}
                        justifyContent={"flex-start"}
                      >
                        {/* Full Name */}
                        <Grid item width={"100%"} mt={0}>
                          <ControlledTextField
                            name="personal_details.name"
                            control={control}
                            errors={errors}
                            label="Full Name"
                            rules={{
                              required: "Required",
                            }}
                            // sx={{ width: "100%" }}
                            fullWidth
                            required
                            disabled={addSibling ? false : !isEditing}
                          />
                        </Grid>

                        {/* DOB */}
                        <Grid
                          item
                          width={"100%"}
                          display={"flex"}
                          flexDirection={"row"}
                          // justifyContent={"normal"}
                          justifyContent={"space-between"}
                          mt={2}
                          // sx={{ mt: -1 }}
                        >
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            gap={1}
                            mt={1}
                          >
                            <Typography variant="body2" pt={0}>
                              <strong>Date of Birth: </strong>
                            </Typography>
                            <ControlledTextField
                              name="personal_details.dob"
                              control={control}
                              errors={errors}
                              // label="Admission Date"
                              // fullWidth
                              type="date"
                              disabled={addSibling ? false : !isEditing}
                              sx={{ width: "50%" }}
                            />
                          </Box>
                          {/* <CustomDatePicker
                        format="YYYY-MM-DD"
                        name="personal_details.dob"
                        label="Date of Birth"
                        control={control}
                        errors={errors}
                        rules={{ required: "required" }}
                        selectedDate={_profileData?.personal_details?.dob}
                        disabled={addSibling ? false : !isEditing}
                      /> */}

                          {/* Gender */}
                        </Grid>

                        {/* Gender Height and Blood Group */}
                        <Grid
                          item
                          width={"100%"}
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          mt={3}
                          gap={1}
                          // sx={{ mt: -1 }}
                        >
                          <ControlledSelect
                            name="personal_details.gender"
                            control={control}
                            errors={errors}
                            label="Gender"
                            rules={{ required: "Required" }}
                            options={[
                              { value: "", label: "Select" },
                              { value: "male", label: "male" },
                              { value: "female", label: "female" },
                              { value: "other", label: "other" },
                            ]}
                            sx={{ width: "31%", mt: 0, pb: 1 }}
                            disabled={addSibling ? false : !isEditing}
                          />

                          <ControlledTextField
                            name="personal_details.height"
                            control={control}
                            errors={errors}
                            label="Height (CM)"
                            type="number"
                            sx={{ width: "31%" }}
                            disabled={addSibling ? false : !isEditing}
                          />

                          <ControlledSelect
                            name="personal_details.blood_group"
                            control={control}
                            errors={errors}
                            label="Blood Group"
                            // rules={{ required: "Required" }}
                            options={[
                              { value: "", label: "Select" },
                              { value: "A+", label: "A+" },
                              { value: "A-", label: "A-" },
                              { value: "B+", label: "B+" },
                              { value: "B-", label: "B-" },
                              { value: "O+", label: "O+" },
                              { value: "O-", label: "O-" },
                              { value: "Ab+", label: "Ab+" },
                              { value: "Ab-", label: "Ab-" },
                            ]}
                            sx={{ width: "31%" }}
                            disabled={addSibling ? false : !isEditing}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Typography variant="body2" pl={2} pt={2} ml={2}>
                      <strong>Correspondence Address</strong>
                    </Typography>

                    {/*Correspondence Address */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="personal_details.correspondence_address.addressline1"
                        control={control}
                        errors={errors}
                        label="Address Line1"
                        // value={formData?.studentObj.personalDetails.addressline1}
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />

                      <ControlledTextField
                        name="personal_details.correspondence_address.addressline2"
                        control={control}
                        errors={errors}
                        label="Address Line2"
                        // value={formData?.studentObj.personalDetails.addressline2}
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />

                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{ mt: 1 }}
                      >
                        <ControlledTextField
                          name="personal_details.correspondence_address.city"
                          control={control}
                          errors={errors}
                          label="City"
                          // value={formData?.studentObj.personalDetails.addresscity}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.correspondence_address.state"
                          control={control}
                          errors={errors}
                          label="State"
                          // value={formData?.studentObj.personalDetails.addressstate}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2, mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.correspondence_address.pincode"
                          control={control}
                          errors={errors}
                          label="Pincode"
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2 }}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="body2" pl={2} pt={2} ml={2}>
                      <strong>Permanent Address</strong>
                    </Typography>

                    {/*Permanent Address */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="personal_details.permanent_address.addressline1"
                        control={control}
                        errors={errors}
                        label="Address Line1"
                        // value={formData?.studentObj.personalDetails.addressline1}
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />

                      <ControlledTextField
                        name="personal_details.permanent_address.addressline2"
                        control={control}
                        errors={errors}
                        label="Address Line2"
                        // value={formData?.studentObj.personalDetails.addressline2}
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />

                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{ mt: 1 }}
                      >
                        <ControlledTextField
                          name="personal_details.permanent_address.city"
                          control={control}
                          errors={errors}
                          label="City"
                          // value={formData?.studentObj.personalDetails.addresscity}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.permanent_address.state"
                          control={control}
                          errors={errors}
                          label="State"
                          // value={formData?.studentObj.personalDetails.addressstate}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2, mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.permanent_address.pincode"
                          control={control}
                          errors={errors}
                          label="Pincode"
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2 }}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Academics Details */}
              <Accordion sx={{ mt: 1, borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Academics</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {_profileData.academic_records &&
                  _profileData.academic_records.length > 0 ? (
                    _profileData.academic_records.map(
                      (record: any, index: number) => {
                        return (
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography variant="h6">
                                <strong>{record.academic_year}</strong>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2} sx={{ mt: 0 }}>
                                {/**Class, Section and Roll Number*/}
                                <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"normal"}
                                  gap={2}
                                >
                                  <ControlledSelect
                                    name={`academic_records[${index}].class_id`}
                                    control={control}
                                    errors={errors}
                                    label="Class"
                                    rules={{ required: "Required" }}
                                    options={classList.map((item: any) => ({
                                      value: item.class_id,
                                      label: item.name,
                                    }))}
                                    sx={{ width: "30%", mt: 0 }}
                                    disabled={!addSibling}
                                    required
                                  />

                                  <ControlledSelect
                                    name={`academic_records[${index}].section_id`}
                                    control={control}
                                    errors={errors}
                                    label="Section"
                                    rules={{ required: "Required" }}
                                    options={sectionsList.map((item: any) => ({
                                      value: item.section_id,
                                      label: item.name,
                                    }))}
                                    sx={{ width: "30%", mt: 0 }}
                                    disabled={!addSibling}
                                    required
                                  />

                                  <ControlledTextField
                                    name={`academic_records[${index}].roll_number`}
                                    control={control}
                                    errors={errors}
                                    label="Roll Number"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={!addSibling}
                                  />
                                </Grid>

                                <Box
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"space-evenly"}
                                >
                                  {SESSIONS.map((session: string) => {
                                    const sessionData =
                                      record?.performance?.[session];
                                    return (
                                      <Box
                                        key={session}
                                        display={"flex"}
                                        flexDirection={"column"}
                                      >
                                        <Typography
                                          variant="h6"
                                          ml={2}
                                          mt={2}
                                          sx={{ color: "#FF825B" }}
                                        >
                                          <strong>
                                            {session.toUpperCase()}
                                          </strong>
                                        </Typography>

                                        {sessionData &&
                                        Object.keys(sessionData.exams).length >
                                          0 ? (
                                          Object.entries(sessionData.exams).map(
                                            ([examId, exam]: [string, any]) => (
                                              <Box
                                                key={examId}
                                                display={"flex"}
                                                flexDirection={"column"}
                                              >
                                                <Typography
                                                  variant="subtitle1"
                                                  ml={2}
                                                  mt={1}
                                                >
                                                  <strong>
                                                    Exam: {exam.exam_name}
                                                  </strong>
                                                </Typography>
                                                <Typography
                                                  variant="body2"
                                                  ml={2}
                                                >
                                                  Total Marks:{" "}
                                                  <strong>
                                                    {exam.max_marks}{" "}
                                                  </strong>
                                                  {/* Pass Marks: {exam.pass_marks}, */}
                                                  Obtained:{" "}
                                                  <strong>
                                                    {exam.total_marks_obtained}{" "}
                                                  </strong>
                                                </Typography>
                                                <Typography
                                                  variant="body2"
                                                  ml={2}
                                                >
                                                  Report (%):{" "}
                                                  <strong>
                                                    {exam.max_marks &&
                                                    exam.total_marks_obtained
                                                      ? (
                                                          (Number(
                                                            exam.total_marks_obtained
                                                          ) /
                                                            Number(
                                                              exam.max_marks
                                                            )) *
                                                          100
                                                        ).toFixed(2)
                                                      : "N/A"}
                                                  </strong>
                                                </Typography>

                                                {/* <Typography
                                                variant="body2"
                                                ml={6}
                                                mt={1}
                                              >
                                                Subjects:
                                              </Typography> */}
                                                <Box ml={-3}>
                                                  <ul>
                                                    {exam.marks_details.map(
                                                      (subject: any) => (
                                                        <li
                                                          key={
                                                            subject.subject_name
                                                          }
                                                          style={{
                                                            marginLeft: "20px",
                                                          }}
                                                        >
                                                          {subject.subject_name}
                                                          :{" "}
                                                          {
                                                            subject.marks_obtained
                                                          }{" "}
                                                          /
                                                          {
                                                            subject.subject_max_marks
                                                          }{" "}
                                                          (Pass:
                                                          {
                                                            subject.subject_pass_marks
                                                          }
                                                          )
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </Box>
                                              </Box>
                                            )
                                          )
                                        ) : (
                                          <Typography
                                            variant="body2"
                                            ml={2}
                                            mt={1}
                                            sx={{ color: "gray" }}
                                          >
                                            No exams available.
                                          </Typography>
                                        )}
                                      </Box>
                                    );
                                  })}
                                </Box>

                                {/* <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"normal"}
                                  gap={2}
                                >
                                  <ControlledTextField
                                    name={`academic_records[${index}].marks.English`}
                                    control={control}
                                    errors={errors}
                                    label="Marks English"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />

                                  <ControlledTextField
                                    name={`academic_records[${index}].marks.Math`}
                                    control={control}
                                    errors={errors}
                                    label="Marks Maths"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />

                                  <ControlledTextField
                                    name={`academic_records[${index}].marks.Science`}
                                    control={control}
                                    errors={errors}
                                    label="Marks Science"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"normal"}
                                  gap={2}
                                >
                                  <ControlledTextField
                                    name={`academic_records[${index}].attendance.total`}
                                    control={control}
                                    errors={errors}
                                    label="Total Working Days"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                  <ControlledTextField
                                    name={`academic_records[${index}].attendance.present`}
                                    control={control}
                                    errors={errors}
                                    label="Days Present"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                </Grid> */}
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        );
                      }
                    )
                  ) : (
                    //THIS ESLE SCENARIO IS WHEN ADDING NEW STUDENT. NO RECORD IS PRESENT
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          <strong>{GetCurrentAcademciSession()}</strong>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                          {/**Class, Section and Roll Number*/}
                          <Grid
                            item
                            xs={12}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <ControlledSelect
                              name={`academic_records[${0}].class_id`}
                              control={control}
                              errors={errors}
                              label="Class"
                              rules={{ required: "Required" }}
                              options={classList.map((item: any) => ({
                                value: item.class_id,
                                label: item.name,
                              }))}
                              sx={{ width: "30%", mt: 0 }}
                              disabled={addSibling ? false : !isEditing}
                            />

                            <ControlledSelect
                              name={`academic_records[${0}].section_id`}
                              control={control}
                              errors={errors}
                              label="Section"
                              rules={{ required: "Required" }}
                              options={sectionsList.map((item: any) => ({
                                value: item.section_id,
                                label: item.name,
                              }))}
                              sx={{ width: "30%", mt: 0 }}
                              disabled={addSibling ? false : !isEditing}
                            />

                            <ControlledTextField
                              name={`academic_records[${0}].roll_number`}
                              control={control}
                              errors={errors}
                              label="Roll Number"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </AccordionDetails>
              </Accordion>

              {/* Transport Details */}
              <Accordion sx={{ mt: 1, borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Transport Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4} sx={{ mt: -3 }}>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                      gap={2}
                    >
                      <ControlledSelect
                        name="transport_details.mode"
                        control={control}
                        errors={errors}
                        label="Mode"
                        options={[
                          {
                            value: "School-Transport",
                            label: "School Transport",
                          },
                          {
                            value: "Personal-vehicle",
                            label: "Personal Vehicle",
                          },
                          { value: "On-Foot", label: "On Foot" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                        selectProps={{ onChange: HandleTransportModeChange }}
                      />

                      {transportMode === "School-Transport" && (
                        <ControlledSelect
                          name="transport_details.stop_name"
                          control={control}
                          errors={errors}
                          label="Stop"
                          options={stopNames.map((stop: any) => ({
                            value: stop.name,
                            label: stop.name,
                          }))}
                          sx={{ width: "20%", mt: 0 }}
                          selectProps={{ onChange: HandleStopNameChange }}
                          disabled={!isEditing}
                        />
                      )}
                      {transportMode === "School-Transport" && (
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"flex-start"}
                          alignItems={"center"}
                          gap={1}
                          mt={1}
                        >
                          <Typography variant="h6" pt={0}>
                            <strong>
                              {`Vehicle No: ${
                                vehicleNo ||
                                _profileData.transport_details.vehicle_no ||
                                ""
                              }`}{" "}
                            </strong>
                          </Typography>
                        </Box>
                        // <ControlledTextField
                        //   name={`transport_details.vehicle_id`}
                        //   control={control}
                        //   errors={errors}
                        //   label="Vehicle No"
                        //   // rules={{
                        //   //   required: "Required",
                        //   // }}
                        //   sx={{ width: "40%", mt: 0 }}
                        //   // required
                        //   disabled={true}
                        // />
                        // <ControlledSelect
                        //   name="transport_details.vehicle_id"
                        //   control={control}
                        //   errors={errors}
                        //   label="Vehicle No"
                        //   options={vehicle_Stops.map((data: any) => ({
                        //     value: data.vehicle_id,
                        //     label: data.vehicle_no,
                        //   }))}
                        //   sx={{ width: "40%", mt: 0 }}
                        //   disabled={!isEditing}
                        //   selectProps={{ onChange: HandleVehicleNoChange }}
                        // />
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Parents Details */}
              <Accordion sx={{ mt: 1, borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Parents Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" pt={2}>
                    <strong>Father's Details</strong>
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="father_details.name"
                        control={control}
                        errors={errors}
                        label="Name"
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        sx={{ width: "65%" }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <ControlledSelect
                        name="father_details.education"
                        control={control}
                        errors={errors}
                        label="Education"
                        rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Graduate", label: "Graduate" },
                          { value: "PG", label: "PG" },
                          { value: "Masters", label: "Masters" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="father_details.occupation"
                        control={control}
                        errors={errors}
                        label="Occupation"
                        rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Business", label: "Business" },
                          { value: "Service", label: "Service" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Phone Number */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="father_details.contact"
                        control={control}
                        errors={errors}
                        label="Phone"
                        rules={{
                          required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid Number",
                          },
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Email ID */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="father_details.email"
                        control={control}
                        errors={errors}
                        label="Email"
                        type="email"
                        rules={{
                          required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="body2" pt={2}>
                    <strong>Mother's Details</strong>
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="mother_details.name"
                        control={control}
                        errors={errors}
                        label="Name"
                        // rules={{
                        //   required: "Required",
                        // }}
                        fullWidth
                        // required
                        sx={{ width: "65%" }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <ControlledSelect
                        name="mother_details.education"
                        control={control}
                        errors={errors}
                        label="Education"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Graduate", label: "Graduate" },
                          { value: "PG", label: "PG" },
                          { value: "Masters", label: "Masters" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="mother_details.occupation"
                        control={control}
                        errors={errors}
                        label="Occupation"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Business", label: "Business" },
                          { value: "Service", label: "Service" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Phone Number */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="mother_details.contact"
                        control={control}
                        errors={errors}
                        label="Phone"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid Number",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Email ID */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="mother_details.email"
                        control={control}
                        errors={errors}
                        label="Email"
                        type="email"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Guardian Details */}
              <Accordion sx={{ mt: 1, borderRadius: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Guardian Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    {/* Father's Name */}
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="guardian_details.name"
                        control={control}
                        errors={errors}
                        label="Name"
                        fullWidth
                        sx={{ width: "65%" }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <ControlledSelect
                        name="guardian_details.education"
                        control={control}
                        errors={errors}
                        label="Education"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Graduate", label: "Graduate" },
                          { value: "PG", label: "PG" },
                          { value: "Masters", label: "Masters" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      {/* Relation with Student */}

                      <ControlledSelect
                        name="guardian_details.relation"
                        control={control}
                        errors={errors}
                        label="Blood Relation"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Father", label: "Father" },
                          { value: "Mother", label: "Mother" },
                          { value: "Grand-Children", label: "Grand-Children" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="guardian_details.occupation"
                        control={control}
                        errors={errors}
                        label="Occupation"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Business", label: "Business" },
                          { value: "Service", label: "Service" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Phone Number */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="guardian_details.contact"
                        control={control}
                        errors={errors}
                        label="Phone"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid Number",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Email ID */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="guardian_details.email"
                        control={control}
                        errors={errors}
                        label="Email"
                        type="email"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <DialogActions>
                <MyCustomButton
                  variant="contained"
                  onClick={onClose}
                  customcolor="#cb3d64"
                >
                  Close
                </MyCustomButton>
                {addSibling
                  ? ""
                  : !isEditing && (
                      <MyCustomButton
                        variant="contained"
                        customcolor="#00c9a6"
                        onClick={onEdit}
                      >
                        Edit
                      </MyCustomButton>
                    )}
                {(isEditing || addSibling) && (
                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    customcolor="#00c9a6"
                  >
                    {addSibling ? "Submit" : "Save Changes"}
                  </MyCustomButton>
                )}
              </DialogActions>
            </form>
          </>
        )}

        {/* {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
         
        )} */}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialogStudentDetailsAdmin;
