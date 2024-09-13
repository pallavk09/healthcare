import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({
  color,
  children,
  onClick,
  max_width,
  type,
}: ButtonProps) => (
  <StyledButton
    color={color}
    onClick={onClick}
    max_width={max_width}
    type={type}
  >
    {children}
  </StyledButton>
);
