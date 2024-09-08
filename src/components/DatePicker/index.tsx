// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

const DatePicker = ({ format }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        label="Date of birth"
        //   defaultValue={dayjs("2022-04-17")}
        format={format}
        aria-placeholder="DD-MM-YYYY"
        size="small"
        itemType="standard"
        sx={{ mt: 1 }}
        variant="standard"
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
