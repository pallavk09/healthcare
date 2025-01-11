import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StreamlinedAdmissionBlock from "../../components/StreamlinedAdmissionBlock";
import EffortLessFeesPayment from "../../components/EffortLessFeesPayment";
import EnhancedAdministration from "../../components/EnhancedAdministration";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Introduction from "../../components/Introduction";
import PageFooterMobile from "../../components/Footer/footerMobile";

// import MiddleBlock from "../../components/MiddleBlock";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock1 = lazy(() => import("../../components/MiddleBlock1"));
const MiddleBlock2 = lazy(() => import("../../components/MiddleBlock2"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
// const ContentFormBlock = lazy(
//   () => import("../../components/ContentFormBlock")
// );

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {/* <Header /> */}
      {/* <Container width={isMobile ? "80vw" : "96vw"}> */}
      <Container width="auto">
        <ScrollToTop />
        <Introduction
          direction="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          id="intro"
        />
        <MiddleBlock1
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          id="aboutus"
          direction="right"
          // button={MiddleBlockContent.button}
        />
        <MiddleBlock2
          title={"How We Help"}
          content={
            "At Eduern, we provide cutting-edge solutions designed to transform educational management. Our platform simplifies school operations and fosters seamless communication, ensuring an efficient, connected, and stress-free experience for administrators, educators, parents, and students alike."
          }
          id="ourservices"
          direction="left"
        />

        <StreamlinedAdmissionBlock
          direction="left"
          icon="admission.svg"
          id="newadmission"
        />

        <EffortLessFeesPayment
          direction="right"
          icon="feepayment.svg"
          id="newadmission"
        />
        <EnhancedAdministration
          direction="left"
          icon="adminDashboard.svg"
          id="product"
        />

        <ContentBlock
          direction="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="product-launch.svg"
          id="whyus"
        />
        <ContentBlock
          direction="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="waving.svg"
          id="ourvision"
        />

        {/* <MiddleBlock
          title={"What We Offer"}
          content={
            "At Eduern, we believe in making school operations effortless and efficient. Our comprehensive platform is designed to address the unique needs of educational institutions, ensuring smoother workflows, better communication, and an enhanced experience for everyone involved. Here's how we can help you"
          }
          // button={MiddleBlockContent.button}
        /> */}
        {/* <ContentBlock
          direction="left"
          title={AboutContent.title}
          content={AboutContent.text}
          section={AboutContent.section}
          icon="graphs.svg"
          id="about"
        /> */}

        {/* <ContentBlock
          direction="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="waving.svg"
          id="product"
        />
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        /> */}
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        />
      </Container>
      {!isMobile ? <Footer /> : <PageFooterMobile />}
    </>
  );
};

export default Home;
