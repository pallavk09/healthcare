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

const EffortLessFeesPayment = ({
  icon,

  section,
  button,
  id,
  direction,
}: ContentBlockProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const scrollTo = (id: string) => {
  //   const element = document.getElementById(id) as HTMLDivElement;
  //   element.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };
  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce={false}>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          {!isMobile ? (
            <Col lg={11} md={11} sm={12} xs={24}>
              <SvgIcon src={icon} width="100%" height="100%" />
            </Col>
          ) : (
            ""
          )}

          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              {/* <h6 style={{ marginBottom: "auto" }}>Effortless Fee Payments</h6> */}
              {!isMobile ? (
                <h6
                  style={{
                    marginBottom: "auto",
                  }}
                >
                  {"Effortless Fee Payments"}
                </h6>
              ) : (
                <h6
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "100%",
                    fontSize: "1.7rem",
                  }}
                >
                  {"Effortless Fee Payments"}
                </h6>
              )}

              <Content
                style={
                  isMobile
                    ? {
                        marginBottom: "auto",
                        marginTop: "auto",
                        fontSize: "1.1rem",
                        width: "100%",
                        // textAlign: "center",
                      }
                    : {}
                }
              >
                Managing school fees has never been easier with Eduern’s secure
                and user-friendly payment system. We simplify fee collection and
                tracking for both parents and school administrators, ensuring a
                smooth and efficient process <b> Automated Payment Reminders</b>
                , <b> Transparent Fee Breakdown</b> and{" "}
                <b>Real-Time Status Updates</b>. <br /> Eduern’s effortless fee
                payment system saves time, reduces stress, and enhances
                financial transparency, making school fee management a breeze
                for everyone involved
              </Content>
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default EffortLessFeesPayment;
