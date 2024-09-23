import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  styled,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./SuccessPopup.css"; // Importing custom CSS for the tick animation

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
  message: string;
  buttonText: string;
  title: string;
}

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "0rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  open,
  onClose,
  message,
  buttonText,
  title,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent className="dialog-content">
        {/* Animated tick mark */}
        <div className="tick-container">
          <CheckCircleOutlineIcon className="tick-mark" />
        </div>

        {/* Success message */}
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" align="center" color="textSecondary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <MyCustomButton onClick={onClose} variant="contained">
          {buttonText}
        </MyCustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
