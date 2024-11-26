import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent={"space-evenly"}
      ml={1}
      mr={1}
      mb={1}
      mt={0.5}
      sx={{
        backgroundColor: "#f5f5f5",
        // borderRadius: '10px',
        boxShadow: 2,
        border: "none",
      }}
    >
      <Box display="flex" flexDirection="column">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,

            color: "#FFC000",
            opacity: 1,
            // marginLeft: 7,
            // marginTop: 5,
            // gridColumn: 'span 4',
          }}
        >
          <p>Reach Us</p>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            // opacity: '1',
            // color: "whitesmoke",
            opacity: 1,
            // marginLeft: 7,
            marginTop: -4,
            // gridColumn: 'span 4',
          }}
        >
          <p>
            EDUERN, 603, Brij Residency phase 2 <br />
            Shiv Vatika, Lasudia Mori <br />
            Indore, Madhya Pradesh 453771 <br /> India
          </p>
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={1}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            // opacity: '1',
            color: "#FFC000",
            opacity: 1,
            // marginLeft: 7,
            // marginTop: 5,
            // gridColumn: 'span 4',
          }}
        >
          <p>Help & Support</p>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            // opacity: '1',
            // color: "whitesmoke",
            opacity: 1,
            // marginLeft: 7,
            marginTop: -4,
            // gridColumn: 'span 4',
          }}
        >
          <p>whatsup@eduern.com or +91-9989847374</p>
        </Typography>
        {/* <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            // opacity: '1',
            color: "whitesmoke",
            opacity: 1,
            // marginLeft: 7,
            marginTop: -4,
            // gridColumn: 'span 4',
          }}
        ></Typography> */}
        <Box display="flex" flexDirection="row">
          <FacebookIcon sx={{ marginRight: "20px" }} />
          <LinkedInIcon sx={{ marginRight: "20px" }} />

          <XIcon sx={{ marginRight: "20px" }} />
          <YouTubeIcon sx={{ marginRight: "20px" }} />
          <InstagramIcon />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 300,
            // opacity: '1',
            // color: "whitesmoke",
            opacity: 1,
          }}
        >
          © 2024 SYYNER Technology
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column">
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            // opacity: '1',
            // color: "whitesmoke",
            opacity: 1,
            // marginLeft: 7,
            marginTop: 10,
            // gridColumn: 'span 4',
          }}
        >
          Privacy Policy | Terms & Conditions
        </Typography>
      </Box>

      {/* <Box display={'Grid'} gridTemplateColumns='repeat(4, minmax(0, 1fr))' gap='20px'></Box> */}
    </Box>
  );
};

// import { Row, Col } from "antd";
// import { SvgIcon } from "../../common/SvgIcon";
// import Container from "../../common/Container";

// import {
//   FooterSection,
//   Title,
//   NavLink,
//   Extra,
//   LogoContainer,
//   Para,
//   Large,
//   Chat,
//   Empty,
//   FooterContainer,
//   Language,
//   Label,
//   LanguageSwitch,
//   LanguageSwitchContainer,
// } from "./styles";

// interface SocialLinkProps {
//   href: string;
//   src: string;
// }

// const Footer = () => {
//   // const handleChange = (language: string) => {
//   //   i18n.changeLanguage(language);
//   // };

//   const SocialLink = ({ href, src }: SocialLinkProps) => {
//     return (
//       <a
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         key={src}
//         aria-label={src}
//       >
//         <SvgIcon src={src} width="25px" height="25px" />
//       </a>
//     );
//   };

//   return (
//     <>
//       <FooterSection>
//         <Container>
//           {/* <Row justify="space-between">
//             <Col lg={10} md={10} sm={12} xs={12}>
//               <Language>{t("Contact")}</Language>
//               <Large to="/">{t("Tell us everything")}</Large>
//               <Para>
//                 {t(`Do you have any question? Feel free to reach out.`)}
//               </Para>
//               <a href="mailto:l.qqbadze@gmail.com">
//                 <Chat>{t(`Let's Chat`)}</Chat>
//               </a>
//             </Col>
//             <Col lg={8} md={8} sm={12} xs={12}>
//               <Title>{t("Policy")}</Title>
//               <Large to="/">{t("Application Security")}</Large>
//               <Large to="/">{t("Software Principles")}</Large>
//             </Col>
//             <Col lg={6} md={6} sm={12} xs={12}>
//               <Empty />
//               <Large to="/">{t("Support Center")}</Large>
//               <Large to="/">{t("Customer Support")}</Large>
//             </Col>
//           </Row> */}
//           <Row justify="space-between">
//             {/* <Col lg={10} md={10} sm={12} xs={12}>
//               <Empty />
//               <Language>{t("Address")}</Language>
//               <Para>Rancho Santa Margarita</Para>
//               <Para>2131 Elk Street</Para>
//               <Para>California</Para>
//             </Col>
//             <Col lg={8} md={8} sm={12} xs={12}>
//               <Title>{t("Company")}</Title>
//               <Large to="/">{t("About")}</Large>
//               <Large to="/">{t("Blog")}</Large>
//               <Large to="/">{t("Press")}</Large>
//               <Large to="/">{t("Careers & Culture")}</Large>
//             </Col> */}
//             <Col lg={6} md={6} sm={12} xs={12}>
//               {/* <Label htmlFor="select-lang">{t("Language")}</Label> */}
//               {/* <LanguageSwitchContainer>
//                 <LanguageSwitch onClick={() => handleChange("en")}>
//                   <SvgIcon
//                     src="united-states.svg"
//                     aria-label="homepage"
//                     width="30px"
//                     height="30px"
//                   />
//                 </LanguageSwitch>
//                 <LanguageSwitch onClick={() => handleChange("es")}>
//                   <SvgIcon
//                     src="spain.svg"
//                     aria-label="homepage"
//                     width="30px"
//                     height="30px"
//                   />
//                 </LanguageSwitch>
//               </LanguageSwitchContainer> */}
//             </Col>
//           </Row>
//         </Container>
//       </FooterSection>
//       <Extra>
//         <Container border={true}>
//           <Row
//             justify="space-evenly"
//             align="middle"
//             style={{ paddingTop: "3rem" }}
//           >
//             <NavLink to="/">
//               <LogoContainer>
//                 <SvgIcon
//                   src="logo.svg"
//                   aria-label="homepage"
//                   width="101px"
//                   height="64px"
//                 />
//               </LogoContainer>
//             </NavLink>
//             <FooterContainer>
//               <SocialLink
//                 href="https://github.com/Adrinlol/create-react-app-adrinlol"
//                 src="github.svg"
//               />
//               <SocialLink
//                 href="https://twitter.com/Adrinlolx"
//                 src="twitter.svg"
//               />
//               <SocialLink
//                 href="https://www.linkedin.com/in/lasha-kakabadze/"
//                 src="linkedin.svg"
//               />
//               <SocialLink
//                 href="https://medium.com/@lashakakabadze/"
//                 src="medium.svg"
//               />
//               {/* <a
//                 href="https://ko-fi.com/Y8Y7H8BNJ"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   height="36"
//                   style={{ border: 0, height: 36 }}
//                   src="https://storage.ko-fi.com/cdn/kofi3.png?v=3"
//                   alt="Buy Me a Coffee at ko-fi.com"
//                 />
//               </a> */}
//             </FooterContainer>
//           </Row>
//         </Container>
//       </Extra>
//     </>
//   );
// };

export default Footer;
