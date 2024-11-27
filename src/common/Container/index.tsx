import { StyledContainer } from "./styles";
import { ContainerProps } from "../types";

const Container = ({ border, width, children }: ContainerProps) => (
  <StyledContainer border={border} width={width}>
    {children}
  </StyledContainer>
);

export default Container;
