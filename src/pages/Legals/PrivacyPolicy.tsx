import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "../../components/Footer";
import PageFooterMobile from "../../components/Footer/footerMobile";

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Container
        //   maxWidth="md"
        style={{ padding: "2rem 1rem", textAlign: "left", width: "auto" }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          component="h1"
          gutterBottom
          align="center"
        >
          {isMobile ? <strong>Privacy Policies</strong> : "Privacy Policies"}
        </Typography>

        <Box mb={4}>
          <Typography variant="body1" paragraph>
            At Eduern, safeguarding your privacy and maintaining your trust are
            our top priorities. This Privacy Policy outlines our practices
            regarding the personal information we collect when you access or use
            our services, features, or content through our website, application,
            or any other Eduern platform ("Eduern Services"). This policy
            applies even if you do not have an Eduern account or access our
            website at https://www.eduern.com or our mobile application ("Eduern
            Platforms"). We may update this Privacy Policy periodically by
            publishing a revised version at
            https://www.eduern.com/privacy-policy.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Objective & Purpose of the Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            This Privacy Policy is published in compliance with:
          </Typography>
          <ul>
            <li>Section 43A of the Information Technology Act, 2000</li>
            <li>
              Regulation 4 of the Information Technology (Reasonable Security
              Practices and Sensitive Personal Information) Rules, 2011 (the
              "SPI Rules")
            </li>
            <li>
              Regulation 3(1) of the Information Technology (Intermediaries
              Guidelines) Rules, 2011
            </li>
          </ul>
          <Typography variant="body1" paragraph>
            This Privacy Policy states the following:
          </Typography>
          <ul>
            <li>
              The types of information we collect, including personal data
            </li>
            <li>
              How we collect, use, process, retain, and destroy this information
            </li>
            <li>How we share this information</li>
            <li>Your rights and choices concerning your data</li>
          </ul>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            What information does Eduern collect?
          </Typography>
          <Typography variant="body1" paragraph>
            When you use Eduern Services or create an Eduern account, we may
            collect the following personal information depending on the service
            or product you access:
          </Typography>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "1rem 0",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Information
                </th>
                <th style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Products/Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Contact information, such as your name, address, phone, email,
                  and other similar information.
                </td>
                <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  This basic information shall be required for Users across
                  Services/Products.
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Information that you provide to Eduern when interacting with
                  our customer support team...
                </td>
                <td style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
                  Required only when a User seeks support from the Company.
                </td>
              </tr>
              {/* Add similar rows for all other data points */}
            </tbody>
          </table>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            How does Eduern use the personal information that it collects?
          </Typography>
          <Typography variant="body1" paragraph>
            We use your personal information to:
          </Typography>
          <ul>
            <li>Provide the Eduern Services to you</li>
            <li>Notify you about your account activity</li>
            <li>Process transactions and collect fees</li>
            <li>Provide customer support and resolve disputes</li>
            <li>Verify your identity and account information</li>
            <li>
              Identify, prevent, and report potentially prohibited, fraudulent,
              or illegal activities
            </li>
          </ul>
        </Box>

        {/* Additional sections can follow the same pattern */}

        <Box mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Contacting Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions regarding the Eduern Privacy Policy,
            please contact us at{" "}
            <a href="mailto:support@Eduern.com">support@Eduern.com</a>.
          </Typography>
        </Box>
      </Container>
      {!isMobile ? <Footer /> : <PageFooterMobile />}
    </>
  );
};

export default PrivacyPolicy;
