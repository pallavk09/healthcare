import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CustomDatePickerType {
  name: string;
  label: string;
  format: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  rules?: Object;
  selectedDate?: string; // String date from props
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerType> = ({
  name,
  label,
  format,
  control,
  errors,
  rules = {},
  selectedDate,
  disabled,
}) => {
  const [savedDate, setSaveDate] = useState<Dayjs | null>(null);

  // Convert selectedDate string to Dayjs object when the component mounts or selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      console.log("Selected Date: ", selectedDate);
      const _savedDate = dayjs(selectedDate, format); // Parse with the provided format
      console.log("_savedDate: ", _savedDate);
      setSaveDate(_savedDate.isValid() ? _savedDate : null); // Ensure it's a valid date
    }
  }, [selectedDate, format]);

  return (
    <FormControl sx={{ width: "33%", mt: 2 }} error={Boolean(errors?.[name])}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={savedDate} // Set the default value
          rules={rules}
          render={({ field }) => (
            <DatePicker
              label={label}
              disabled={disabled}
              format={format}
              value={savedDate} // Pass the Dayjs object
              onChange={(newValue) => {
                setSaveDate(newValue); // Update local state
                field.onChange(newValue?.format(format) || ""); // Update react-hook-form
              }}
              slots={{
                textField: (textFieldProps) => (
                  <TextField
                    {...textFieldProps}
                    size="small"
                    variant="standard"
                    sx={{
                      mr: 3,
                    }}
                    error={Boolean(errors?.[name])}
                    helperText={errors?.[name]?.message || ""}
                  />
                ),
              }}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomDatePicker;

// import { useState, useEffect } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { Controller, Control, FieldErrors } from "react-hook-form";
// import { TextField, FormControl } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// interface CustomDatePickerType {
//   name: string;
//   label: string;
//   format: string;
//   control: Control<any>;
//   errors: FieldErrors<any>;
//   rules?: Object;
//   selectedDate?: string;
//   disabled?: boolean;
// }

// const CustomDatePicker: React.FC<CustomDatePickerType> = ({
//   name,
//   label,
//   format,
//   control,
//   errors,
//   rules = {},
//   selectedDate,
//   disabled,
// }) => {
//   const [savedDate, setSaveDate] = useState<Dayjs>();

//   useEffect(() => {
//     console.log("Inside useEffect of Custom Datepicker. Date: ", selectedDate);
//     console.log("Selected Date as: ", selectedDate);
//     const _savedDate: Dayjs = dayjs(selectedDate, "DD-MM-YYYY").startOf("day");
//     console.log(`Saved dates: ${_savedDate}`);
//     setSaveDate(_savedDate);
//   }, [selectedDate]);

//   return (
//     <FormControl sx={{ width: "33%", mt: 2 }} error={Boolean(errors?.[name])}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Controller
//           name={name}
//           control={control}
//           defaultValue={savedDate}
//           rules={rules}
//           render={({ field }) => (
//             <>
//               <DatePicker
//                 label={label}
//                 disabled={disabled}
//                 format="DD-MM-YYYY"
//                 value={savedDate}
//                 onChange={(newvalue) => field.onChange(newvalue)}
//                 slots={{
//                   textField: (textFieldProps) => (
//                     <TextField
//                       {...textFieldProps}
//                       size="small"
//                       variant="standard"
//                       sx={{
//                         mr: 3,
//                       }}
//                       error={Boolean(errors?.[name])}
//                       helperText={errors?.[name]?.message || ""}
//                     />
//                   ),
//                 }}
//               />
//             </>
//           )}
//         />
//       </LocalizationProvider>
//     </FormControl>
//   );
// };

// export default CustomDatePicker;
