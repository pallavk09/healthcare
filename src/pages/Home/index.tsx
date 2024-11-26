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

// import MiddleBlock from "../../components/MiddleBlock";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
// const ContentFormBlock = lazy(
//   () => import("../../components/ContentFormBlock")
// );

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Container>
        <ScrollToTop />
        <ContentBlock
          direction="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          id="intro"
        />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          id="aboutus"
          // button={MiddleBlockContent.button}
        />
        <MiddleBlock
          title={"How We Help"}
          content={
            "At Eduern, we provide cutting-edge solutions designed to transform educational management. Our platform simplifies school operations and fosters seamless communication, ensuring an efficient, connected, and stress-free experience for administrators, educators, parents, and students alike."
          }
          id="ourservices"
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
      <Footer />
    </>
  );
};

export default Home;
