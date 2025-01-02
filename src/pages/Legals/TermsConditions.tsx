import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Footer from "../../components/Footer";
import PageFooterMobile from "../../components/Footer/footerMobile";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const TermsConditions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Container
        style={{ padding: "2rem 1rem", textAlign: "left", width: "auto" }}
      >
        <Typography
          variant={isMobile ? "h5" : "h2"}
          component="h1"
          gutterBottom
          align="center"
        >
          {isMobile ? (
            <strong>Terms and Conditions</strong>
          ) : (
            "Terms and Conditions"
          )}
        </Typography>
        <Typography paragraph>
          Welcome to Eduern. By accessing or using our website, mobile
          application, and services ("Eduern Services"), you agree to be bound
          by these Terms and Conditions. Please read them carefully. If you do
          not agree to these terms, you may not use the Eduern Services.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Use of the Eduern Services
        </Typography>
        <Typography paragraph>
          You agree to use the Eduern Services only for lawful purposes and in
          accordance with these Terms. You may not use the Eduern Services:
        </Typography>
        <Typography component="ul">
          <li>
            In any way that violates applicable local, national, or
            international law or regulation.
          </li>
          <li>
            To exploit, harm, or attempt to exploit or harm minors in any way.
          </li>
          <li>
            To send, knowingly receive, upload, download, use, or re-use any
            material that does not comply with our content standards.
          </li>
          <li>
            To transmit, or procure the sending of, any unsolicited or
            unauthorized advertising or promotional material (e.g., spam).
          </li>
          <li>
            To impersonate or attempt to impersonate Eduern, an Eduern employee,
            another user, or any other person or entity.
          </li>
          <li>
            To engage in any other conduct that restricts or inhibits anyone's
            use or enjoyment of the Eduern Services, or which may harm Eduern or
            users of the Eduern Services.
          </li>
        </Typography>

        <Typography variant="h5" mt={2} gutterBottom>
          Intellectual Property Rights
        </Typography>
        <Typography paragraph>
          All content on the Eduern Services, including but not limited to text,
          graphics, logos, images, and software, is the property of Eduern or
          its licensors and is protected by copyright, trademark, and other
          laws. You may not use, reproduce, or distribute any content without
          prior written permission from Eduern.
        </Typography>

        <Typography variant="h5" gutterBottom>
          User Accounts
        </Typography>
        <Typography paragraph>
          To access certain features of the Eduern Services, you may need to
          create an account. You agree to provide accurate and complete
          information during registration and to update your information to keep
          it accurate and complete. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography paragraph>
          Eduern is not liable for any direct, indirect, incidental,
          consequential, or punitive damages arising out of your use or
          inability to use the Eduern Services. This includes but is not limited
          to damages for errors, omissions, interruptions, defects, or delays in
          operation.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Changes to the Terms and Conditions
        </Typography>
        <Typography paragraph>
          Eduern reserves the right to revise these Terms and Conditions at any
          time by updating this page. Your continued use of the Eduern Services
          after changes are posted constitutes your acceptance of the revised
          terms.
        </Typography>

        <Typography paragraph>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at support@Eduern.com.
        </Typography>

        {/* Additional sections of the terms and conditions can be added here */}
      </Container>
      {!isMobile ? <Footer /> : <PageFooterMobile />}
    </>
  );
};

export default TermsConditions;
