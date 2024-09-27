import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlProps,
  SelectProps,
} from "@mui/material";

// Define props for the ControlledSelect component
interface ControlledSelectProps extends FormControlProps {
  name: string; // Name of the field
  control: Control<any>; // Control from react-hook-form
  errors: FieldErrors; // Errors from react-hook-form
  label: string; // Label for the Select field
  required?: boolean; // Whether the field is required
  rules?: any; // Validation rules for the field
  options: Array<{ value: string | number; label: string }>; // Options for the select menu
  selectProps?: SelectProps; // Additional props for the Select component
  //   value?: string;
  disabled?: boolean;
}

const ControlledSelect: React.FC<ControlledSelectProps> = ({
  name,
  control,
  errors,
  label,
  required = false,
  rules,
  options,
  selectProps,
  //   value,
  disabled,
  ...formControlProps
}) => {
  //   const errorMessage = errors?.[name]?.message?.toString() || "";
  //   console.log(`errorMessage: ${errors}`);
  return (
    <FormControl
      variant="standard"
      size="small"
      error={Boolean(errors?.[name])}
      required={required}
      {...formControlProps}
    >
      <InputLabel id={`${name}-label`} error={Boolean(errors?.[name])}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            id={name}
            label={label}
            {...field}
            {...selectProps}
            // // value={value}
            disabled={disabled}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {/* Add FormHelperText to show error message */}
      {/* {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>} */}
    </FormControl>
  );
};

export default ControlledSelect;
