import { Row } from "antd";
import styled from "styled-components";

export const ContentSection = styled("section")`
  position: relative;
  padding: 0rem 0 6rem;
  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
  }
`;

interface StyledRowProps {
  direction: "left" | "right"; // Restricting to specific string values
}

export const StyledRow = styled(Row)<StyledRowProps>`
  flex-direction: ${({ direction }: { direction: string }) =>
    direction === "left" ? "row" : "row-reverse"};
`;

export const Para = styled("div")`
  color: #18216d;
  font-size: 14px;
  width: 70%;
`;

export const Empty = styled("div")`
  position: relative;
  height: 53px;
`;

export const Language = styled("h4")`
  font-size: 22px;
  text-transform: capitalize;
  color: #18216d;
  margin-bottom: 5px;
  @media screen and (max-width: 414px) {
    padding: 1.5rem 0;
  }
`;
