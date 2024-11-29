import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface MiddleBlockProps {
  title: string;
  content: string;
  id: string;
  direction: "down" | "left" | "right" | "up";
}

const MiddleBlock1 = ({ title, content, id, direction }: MiddleBlockProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MiddleBlockSection>
      <Slide direction={direction} triggerOnce={false}>
        <Row justify="center" align="middle" id={id}>
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              {!isMobile ? (
                <h6
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#cb3d64",
                  }}
                >
                  {title}
                </h6>
              ) : (
                <h6
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    color: "#cb3d64",
                    width: "95%",
                    fontSize: "1.5rem",
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
                        fontSize: "0.9rem",
                        width: "100%",
                        textAlign: "left",
                      }
                    : {}
                }
              >
                {content}
              </Content>
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default MiddleBlock1;
