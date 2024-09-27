import { Button, ButtonProps, styled, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface MyCustomButtonProps extends ButtonProps {
  customcolor?: string;
  custombackground?: string;
}

const MyCustomButton = styled(Button)<MyCustomButtonProps>(
  ({ theme, customcolor, custombackground }) => ({
    fontFamily: "Motiva Sans Bold",
    fontSize: "0.80rem",
    fontWeight: "700",
    border: "1px solid #edf3f5",
    borderRadius: "4px",
    background: custombackground || "#2e186a",
    boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
    marginTop: "0rem",
    "&:hover": {
      color: "#fff",
      border: customcolor || "1px solid rgb(255, 130, 92)",
      backgroundColor: customcolor || "rgb(255, 130, 92)",
    },
  })
);

export { MyCustomButton };
