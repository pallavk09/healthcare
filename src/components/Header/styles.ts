import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

export const HeaderSection = styled("header")`
  // padding: 1rem 0.5rem;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

interface BurgerProps {
  open: boolean;
}

// export const Burger = styled.div<{ open: boolean }>`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   width: 30px;
//   height: 30px;

//   div {
//     width: 100%;
//     height: 3px;
//     background-color: #2e186a;
//     border-radius: 2px;
//     transition: all 0.3s ease;
//     position: relative;

//     &:nth-child(1) {
//       transform: ${({ open }) =>
//         open ? "rotate(45deg) translateY(0)" : "rotate(0) translateY(-8px)"};
//     }

//     &:nth-child(2) {
//       opacity: ${({ open }) => (open ? "0" : "1")};
//     }

//     &:nth-child(3) {
//       transform: ${({ open }) =>
//         open ? "rotate(-45deg) translateY(0)" : "rotate(0) translateY(8px)"};
//     }
//   }
// `;

// export const Burger = styled.div<BurgerProps>`
//   @media only screen and (max-width: 890px) {
//     display: block;
//   }

//   display: none;
//   cursor: pointer;

//   svg {
//     fill: #2e186a;
//     font-size: 22px;
//     transition: transform 0.3s ease; /* Smooth rotation */
//     transform: ${({ open }) => (open ? "rotate(90deg)" : "rotate(0deg)")};
//   }
// `;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: #2e186a;
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.6rem;
  color: #18216d;
  transition: color 0.2s ease-in;
  margin: 0.2rem 1rem;

  @media only screen and (max-width: 768px) {
    font-size: 1.4rem;
    margin: 0.8rem 0rem;
    text-align: left;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #404041;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Outline = styled(MenuOutlined)`
  font-size: 22px;
  transition: transform 0.8s ease;
`;

export const CloseIcon = styled(CloseOutlined)`
  font-size: 22px;
  transition: transform 0.8s ease; /* Smooth transition */
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) underline;
    // text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;
