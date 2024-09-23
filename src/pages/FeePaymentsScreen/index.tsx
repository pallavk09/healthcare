import * as React from "react";
import { Box, Fab } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterPanel from "../../components/FilterPanel";
import FeeDetails from "../FeeDetails";
import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";
// import FeePaymentsDataGrid from "./FeePaymentsDataGrid"; // Your DataGrid component

const FeePaymentsScreen: React.FC = () => {
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<any>({}); // Adjust type as needed

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
    // Apply filters to your DataGrid or fetch data based on new filters
  };

  return (
    <>
      <HeaderLogin />
      <Box sx={{ height: "100vh", width: "100%" }}>
        <FeeDetails filters={filters} /> {/* Pass filters to your DataGrid */}
        <Fab
          color="primary"
          aria-label="filter"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setFilterPanelOpen(true)}
        >
          <FilterListIcon />
        </Fab>
        <FilterPanel
          open={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onApply={handleFilterApply}
        />
      </Box>
      <FooterLogin />
    </>
  );
};

export default FeePaymentsScreen;
