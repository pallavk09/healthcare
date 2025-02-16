import { useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  MenuProps as MuiMenuProps,
  FormHelperText,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps: Partial<MuiMenuProps> = {
  PaperProps: {
    sx: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};

const options = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Multiselect = ({
  title,
  items,
  disabled,
  _selected,
  onChange,
  error, // NEW PROP for validation
}: {
  title: string;
  items: string[];
  disabled: boolean;
  _selected: string[];
  onChange: (event: string[]) => void; // UPDATED to return array of selected items
  error: boolean; // NEW PROP to indicate validation error
}) => {
  const [selected, setSelected] = useState<string[]>(_selected);
  const isAllSelected = items.length > 0 && selected.length === items.length;

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const value = event.target.value as string[];
    if (value.includes("all")) {
      setSelected(isAllSelected ? [] : items);
      onChange(isAllSelected ? [] : items); // Pass selected values to parent
      return;
    }
    setSelected(value);
    onChange(value); // Pass updated selection to parent
  };

  return (
    <FormControl
      sx={{ margin: 1, width: 350 }}
      disabled={disabled}
      error={selected.length === 0 ? true : false}
    >
      <InputLabel id="multiple-select-label">{title}</InputLabel>
      <Select
        labelId="multiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        variant="standard"
      >
        <MenuItem
          value="all"
          sx={{
            bgcolor: isAllSelected ? "rgba(0, 0, 0, 0.08)" : "inherit",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.08)",
            },
          }}
        >
          <ListItemIcon>
            <Checkbox
              sx={{
                color: "#2E186A",
                "&.Mui-checked": {
                  color: "#FF825B",
                },
              }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < items.length
              }
            />
          </ListItemIcon>
          <ListItemText primary="Select All" sx={{ fontWeight: 500 }} />
        </MenuItem>
        {items.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox
                checked={selected.includes(option)}
                sx={{
                  color: "#2E186A",
                  "&.Mui-checked": {
                    color: "#FF825B",
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
      {/* Validation Message */}
      {error && <FormHelperText>Required</FormHelperText>}
    </FormControl>
  );
};

export default Multiselect;
