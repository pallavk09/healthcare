import * as React from "react";
import { Box, Fab } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterPanel from "../../components/FilterPanel";
import FeeDetails from "../FeeDetails";
import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import { GetAllFeeData } from "../../api/fees";
// import FeePaymentsDataGrid from "./FeePaymentsDataGrid"; // Your DataGrid component

const FeePaymentsScreen: React.FC = () => {
  const [filterPanelOpen, setFilterPanelOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<any>({}); // Adjust type as needed
  const [feesData, setFeesData] = React.useState<any>();

  const handleFilterApply = (newFilters: any) => {
    setFilters(newFilters);
    // Apply filters to your DataGrid or fetch data based on new filters
  };

  const snackbarRef = React.useRef<SnackbarHandle>(null);

  React.useEffect(() => {
    const LoadAllApplications = async () => {
      try {
        console.log(`Calling ListAllFees data`);
        const applicationList = await GetAllFeeData();
        if (applicationList?.result && applicationList?.result.length > 0) {
          console.log("All Fees data List");
          console.log(applicationList?.result);

          setFeesData(applicationList?.result);
        } else {
          setFeesData([]);
        }
      } catch (error: any) {
        snackbarRef.current?.showSnackbar(
          `Error while fetching data ${error.message}`,
          "error"
        );
      }
    };

    LoadAllApplications();
  }, []);

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Box>
        <FeeDetails filters={filters} feesdata={feesData} />{" "}
        {/* Pass filters to your DataGrid */}
        {/* <Fab
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
        /> */}
      </Box>
    </>
  );
};

export default FeePaymentsScreen;
