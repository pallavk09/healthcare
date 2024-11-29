import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper,
} from "./styles";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const StreamlinedAdmissionBlock = ({
  icon,

  section,
  button,
  id,
  direction,
}: ContentBlockProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce={false}>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          {/* <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col> */}
          <Col xs={11}>
            <SvgIcon
              src={icon}
              width={isMobile ? "120%" : "100%"}
              height={isMobile ? "100%" : "100%"}
            />
          </Col>
          <Col xs={11}>
            <ContentWrapper>
              {!isMobile ? (
                <h6
                  style={{
                    marginBottom: "auto",
                  }}
                >
                  {"Streamlined Admissions"}
                </h6>
              ) : (
                <h6
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "100%",
                    fontSize: "1rem",
                  }}
                >
                  {"Streamlined Admissions"}
                </h6>
              )}
              <Content
                style={
                  isMobile
                    ? {
                        marginBottom: "auto",
                        marginTop: "auto",
                        fontSize: "0.4rem",
                        width: "100%",
                      }
                    : {}
                }
              >
                Eduern simplifies the admission process, making it effortless
                for both schools and families. From the moment a prospective
                student applies, our platform ensures a smooth, user-friendly
                experience through <b> Simplified Application Process</b>,{" "}
                <b> Real Time Application Tracking</b> and{" "}
                <b>Seamless Communication</b>
                <br />
                With Eduern, admissions become a streamlined, efficient, and
                stress-free experience for parents.
              </Content>
              {/* <Typography
                variant="h6"
                mt={3}
                sx={
                  isMobile
                    ? {
                        marginBottom: "auto",
                        marginTop: "auto",
                        fontSize: "1.2rem",
                        width: "100%",
                        textAlign: "center",
                        opacity: 0.85,
                      }
                    : {}
                }
              >
                Eduern simplifies the admission process, making it effortless
                for both schools and families. From the moment a prospective
                student applies, our platform ensures a smooth, user-friendly
                experience through{" "}
                <strong> Simplified Application Process</strong>,{" "}
                <strong> Real Time Application Tracking</strong> and{" "}
                <strong>Seamless Communication</strong>
                <br />
                With Eduern, admissions become a streamlined, efficient, and
                stress-free experience for parents.
              </Typography> */}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default StreamlinedAdmissionBlock;
