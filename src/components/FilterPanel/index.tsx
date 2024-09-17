import * as React from "react";
import {
  Box,
  Drawer,
  Typography,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button } from "../../common/Button";

// Sample data for filters
const academicYears = ["2023-2024", "2024-2025", "2025-2026"];
const classes = ["Class 1", "Class 2", "Class 3"];
const sections = ["Section A", "Section B", "Section C"];

const FilterPanel: React.FC<{
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}> = ({ open, onClose, onApply }) => {
  const [year, setYear] = React.useState("");
  const [classLevel, setClassLevel] = React.useState("");
  const [section, setSection] = React.useState("");
  const [dateRange, setDateRange] = React.useState<
    [string | null, string | null]
  >([null, null]);

  const handleApply = () => {
    onApply({ year, classLevel, section, dateRange });
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: "16px" }}>
        <Typography variant="h6">Filter Options</Typography>
        <TextField
          fullWidth
          label="Academic Year"
          select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ marginTop: "10px", marginBottom: "16px" }}
        >
          {academicYears.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Class"
          select
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
          sx={{ marginBottom: "16px" }}
        >
          {classes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Section"
          select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          sx={{ marginBottom: "16px" }}
        >
          {sections.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Start Date"
          placeholder="Start Date"
          type="date"
          onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
          sx={{ marginBottom: "16px" }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="End Date"
          placeholder="End Date"
          type="date"
          onChange={(e) => setDateRange([dateRange[0], e.target.value])}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: "16px" }}
        />
        <Box
          sx={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button max_width="100px" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterPanel;
