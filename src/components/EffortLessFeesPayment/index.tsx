import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentSection, Content, ContentWrapper, StyledRow } from "./styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const EffortLessFeesPayment = ({ icon, id, direction }: ContentBlockProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce={false}>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
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
                  {"Effortless Fee Payments"}
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
                  {"Effortless Fee Payments"}
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
