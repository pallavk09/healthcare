// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DateField } from "@mui/x-date-pickers/DateField";
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
  defaultValue?: Date | null;
}

const CustomDatePicker: React.FC<CustomDatePickerType> = ({
  name,
  label,
  format,
  control,
  errors,
  rules = {},
  defaultValue = null,
}) => {
  // const {
  //   control,
  //   formState: { errors },
  //   trigger,
  // } = useFormContext();
  return (
    <FormControl sx={{ width: "33%", mt: 2 }} error={Boolean(errors?.[name])}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <>
              <DatePicker
                label={label}
                value={field.value}
                onChange={(newvalue) => field.onChange(newvalue)}
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
                      // helperText={errors?.[name]?.message || ""}
                    />
                  ),
                }}
              />
            </>
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomDatePicker;
