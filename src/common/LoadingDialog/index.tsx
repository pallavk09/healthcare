// LoadingDialog.js
import React from "react";
import { Dialog, CircularProgress, DialogContent } from "@mui/material";

const LoadingDialog = ({ open }: { open: boolean }) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { backgroundColor: "transparent", boxShadow: "none" },
      }}
    >
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
