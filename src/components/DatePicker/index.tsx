// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const DatePicker = ({ format }: any) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  return (
    <Controller
      name="studentdob"
      control={control}
      rules={{ required: "required" }}
      render={({ field, fieldState }) => (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="DOB"
              //   defaultValue={dayjs("2022-04-17")}
              format={format}
              aria-placeholder="DD-MM-YYYY"
              size="small"
              itemType="standard"
              sx={{ mt: 0 }}
              variant="standard"
              required
              {...field}
              // error={Boolean(errors?.studentdob)}
              onBlur={() => trigger("studentdob")}
              onError={() => trigger("studentdob")}
            />
            {/* {errors?.studentdob?.message && (
              <FormHelperText error={Boolean(errors?.studentdob)}>
                Required
              </FormHelperText>
            )} */}
          </LocalizationProvider>
          {errors?.studentdob?.message && (
            <FormHelperText
              error={Boolean(errors?.studentdob)}
            ></FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default DatePicker;
