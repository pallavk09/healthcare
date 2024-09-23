import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarProps {
  children?: ReactNode;
}

export type SnackbarHandle = {
  showSnackbar: (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => void;
};

const ToastSnackbar = forwardRef<SnackbarHandle, SnackbarProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<
      "success" | "error" | "warning" | "info"
    >("info");

    useImperativeHandle(ref, () => ({
      showSnackbar(
        message: string,
        severity: "success" | "error" | "warning" | "info"
      ) {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
      },
    }));

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
);

export default ToastSnackbar;
