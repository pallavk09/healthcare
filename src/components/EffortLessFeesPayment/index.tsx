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

const EffortLessFeesPayment = ({
  icon,

  section,
  button,
  id,
  direction,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              {/* <h6>{t(title)}</h6>
              <Content>{t(content)}</Content> */}
              <h6 style={{ marginBottom: "auto" }}>Effortless Fee Payments</h6>
              <Typography variant="h6" mt={3}>
                Managing school fees has never been easier with Eduern’s secure
                and user-friendly payment system. We simplify fee collection and
                tracking for both parents and school administrators, ensuring a
                smooth and efficient process{" "}
                <strong> Automated Payment Reminders</strong>,{" "}
                <strong> Transparent Fee Breakdown</strong> and{" "}
                <strong>Real-Time Status Updates</strong>. <br /> Eduern’s
                effortless fee payment system saves time, reduces stress, and
                enhances financial transparency, making school fee management a
                breeze for everyone involved
              </Typography>
              {/* <Content>{content}</Content> */}
              {/* <h2 style={{ marginBottom: "auto" }}>{title}</h2> */}
              {/* <Content>{content}</Content> */}
              {direction === "right" ? (
                <ButtonWrapper>
                  {typeof button === "object" &&
                    button.map(
                      (
                        item: {
                          color?: string;
                          title: string;
                        },
                        id: number
                      ) => {
                        return (
                          <Button
                            key={id}
                            color={item.color}
                            onClick={() => scrollTo("contact")}
                          >
                            {/* {t(item.title)} */}
                            {item.title}
                          </Button>
                        );
                      }
                    )}
                </ButtonWrapper>
              ) : (
                <ServiceWrapper>
                  <Row justify="space-between">
                    {typeof section === "object" &&
                      section.map(
                        (
                          item: {
                            title: string;
                            content: string;
                            icon: string;
                          },
                          id: number
                        ) => {
                          return (
                            <Col key={id} span={11}>
                              <SvgIcon
                                src={item.icon}
                                width="90px"
                                height="90px"
                              />
                              {/* <MinTitle>{t(item.title)}</MinTitle>
                              <MinPara>{t(item.content)}</MinPara> */}
                              <MinTitle>{item.title}</MinTitle>
                              <Typography variant="body2">
                                Eduern simplifies the admission process, making
                                it effortless for both schools and families.
                                From the moment a prospective student applies,
                                our platform ensures a smooth, user-friendly
                                experience through{" "}
                                <strong> Simplified Application Process</strong>
                                , Real Time Application Tracking and Seamless
                                Communication
                              </Typography>
                            </Col>
                          );
                        }
                      )}
                  </Row>
                </ServiceWrapper>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default EffortLessFeesPayment;
