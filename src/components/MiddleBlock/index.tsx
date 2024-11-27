import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface MiddleBlockProps {
  title: string;
  content: string;
  id: string;
  // button: string;
}

const MiddleBlock = ({ title, content, id }: MiddleBlockProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const scrollTo = (id: string) => {
  //   const element = document.getElementById(id) as HTMLDivElement;
  //   element.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };
  return (
    <MiddleBlockSection>
      <Slide direction="up" triggerOnce={false}>
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
                    width: "100%",
                    fontSize: "2rem",
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
                        fontSize: "1.2rem",
                        width: "100%",
                        textAlign: "center",
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

export default MiddleBlock;
