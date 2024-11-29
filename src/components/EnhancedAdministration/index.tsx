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

const EnhancedAdministration = ({
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
          <Col xs={11}>
            <SvgIcon
              src={icon}
              width={isMobile ? "120%" : "100%"}
              height={isMobile ? "100%" : "100%"}
            />
          </Col>
          <Col xs={11}>
            <ContentWrapper>
              {/* <h6 style={{ marginBottom: "auto" }}>Enhanced Administration</h6> */}
              {!isMobile ? (
                <h6
                  style={{
                    marginBottom: "auto",
                  }}
                >
                  {"Enhanced Administration"}
                </h6>
              ) : (
                <h6
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "110%",
                    fontSize: "1rem",
                  }}
                >
                  {"Enhanced Administration"}
                </h6>
              )}

              <Content
                style={
                  isMobile
                    ? {
                        marginBottom: "auto",
                        marginTop: "auto",
                        fontSize: "0.41rem",
                        width: "100%",
                        // textAlign: "center",
                      }
                    : {}
                }
              >
                Eduern revolutionizes school administration by providing tools
                that keep everyone connected, informed, and organized. Our
                platform ensures that schools can manage their daily operations
                effortlessly while maintaining real-time communication with
                parents, teachers, and students{" "}
                <b> Event and Activity Tracking</b>, <b> Real-Time Updates</b>,{" "}
                <b>Improved Transparency</b>.
                <br />
                With Eduern’s enhanced administration features, schools can
                eliminate communication gaps, stay organized, and focus on what
                truly matters: providing quality education
              </Content>
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default EnhancedAdministration;
