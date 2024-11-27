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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Introduction = ({
  icon,
  title,
  content,
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
    <ContentSection style={isMobile ? { padding: "8rem 0 4rem" } : {}}>
      <Fade direction={direction} triggerOnce={false}>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col
            lg={11}
            md={11}
            sm={11}
            xs={24}
            style={{ marginTop: isMobile ? "-80px" : "" }}
          >
            <ContentWrapper
              style={{
                maxWidth: isMobile ? "100vw" : "80vw",
              }}
            >
              {!isMobile ? (
                <h6 style={{ marginBottom: "auto" }}>{title}</h6>
              ) : (
                <h6
                  style={{
                    marginBottom: "auto",
                    fontSize: "20px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {title}
                </h6>
              )}
              <Content
                style={
                  isMobile
                    ? {
                        marginBottom: "auto",
                        marginTop: "auto",
                        fontSize: "15px",
                        width: "100%",
                        textAlign: "center",
                      }
                    : {}
                }
              >
                {content}
              </Content>
            </ContentWrapper>
            <ButtonWrapper style={isMobile ? { justifyContent: "center" } : {}}>
              <Button
                width={isMobile ? "78%" : "78%"}
                onClick={() => scrollTo("contact")}
              >
                {"Book a Demo"}
              </Button>
            </ButtonWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default Introduction;
