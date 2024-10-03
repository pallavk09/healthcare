import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import TextField from "@mui/material/TextField";

// Define props for the ControlledTextField
interface ControlledTextFieldProps {
  name: string; // Name of the field
  control: Control<any>; // Control from react-hook-form
  errors: FieldErrors; // Errors from react-hook-form
  label: string; // Label for the TextField
  variant?: "filled" | "outlined" | "standard"; // Optional variant prop for TextField
  size?: "small" | "medium"; // Optional size prop for TextField
  required?: boolean; // Whether the field is required
  fullWidth?: boolean; // FullWidth prop for TextField
  rules?: any; // Validation rules for the field
  sx?: any;
  type?: "text" | "email" | "number" | "password" | "date";
  // value?: string;
  disabled?: boolean;
  slotProps?: any;
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  name,
  control,
  errors,
  label,
  variant = "standard",
  size = "small",
  required = false,
  fullWidth = true,
  rules,
  sx,
  type,
  slotProps,
  // value,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant={variant}
          size={size}
          error={Boolean(errors?.[name])}
          helperText={errors?.[name]?.message?.toString() || ""}
          fullWidth={fullWidth}
          required={required}
          sx={sx}
          type={type}
          // value={value}
          disabled={disabled}
          slotProps={slotProps}
        />
      )}
    />
  );
};

export default ControlledTextField;
