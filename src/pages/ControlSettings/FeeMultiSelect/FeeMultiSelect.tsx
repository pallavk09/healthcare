import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  FormControlProps,
  SelectProps,
} from "@mui/material";

interface MultiSelectProps extends FormControlProps {
  name: string; // Field name
  control: Control<any>; // Control from react-hook-form
  errors: FieldErrors; // Errors from react-hook-form
  label: string; // Label for the select field
  // options: Array<{ value: string | number; label: string }>; // Options for the select menu
  options: Array<{ id: string | number; title: string }>; // Options for the select menu
  required?: boolean; // Whether the field is required
  rules?: any; // Validation rules
  selectProps?: SelectProps; // Additional props for the Select component
  disabled?: boolean; // Disable the select
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FeeMultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  errors,
  label,
  options,
  required = false,
  rules,
  selectProps,
  disabled,
  ...formControlProps
}) => {
  return (
    <FormControl
      variant="standard"
      size="small"
      error={Boolean(errors?.[name])}
      required={required}
      disabled={disabled}
      {...formControlProps}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            id={name}
            multiple
            {...field}
            MenuProps={MenuProps}
            value={Array.isArray(field.value) ? field.value : []}
            renderValue={(selected) =>
              (selected as Array<string | number>)
                .map(
                  (value) =>
                    options.find((option) => option.id === value)?.title
                )
                .join(", ")
            }
            {...selectProps}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox checked={(field.value || []).includes(option.id)} />
                <ListItemText primary={option.title} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors?.[name] && (
        <FormHelperText>
          {errors[name]?.message?.toString() || ""}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FeeMultiSelect;
