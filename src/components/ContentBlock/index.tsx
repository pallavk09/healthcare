import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentSection, Content, ContentWrapper, StyledRow } from "./styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ContentBlock = ({
  icon,
  title,
  content,
  id,
  direction,
}: ContentBlockProps) => {
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
              {/* <h6 style={{ marginBottom: "auto" }}>{title}</h6> */}
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
                    fontSize: "1rem",
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
                        fontSize: "0.5rem",
                        width: "100%",
                        // textAlign: "center",
                      }
                    : {}
                }
              >
                {content}
              </Content>
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default ContentBlock;
