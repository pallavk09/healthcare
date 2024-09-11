import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({
  color,
  children,
  onClick,
  max_width,
}: ButtonProps) => (
  <StyledButton color={color} onClick={onClick} max_width={max_width}>
    {children}
  </StyledButton>
);
