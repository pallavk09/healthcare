import { Typography } from "@mui/material";
import { Container, TextWrapper, Content } from "./styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  title: string;
  content: string;
}

const Block = ({ title, content }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container>
      {!isMobile ? (
        <h6
          style={{
            marginBottom: "auto",
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
            width: "100%",
            fontSize: "2rem",
            color: "#cb3d64",
          }}
        >
          {title}
        </h6>
      )}
      {/* <h6>{title}</h6> */}
      <TextWrapper>
        <Content
          style={
            isMobile
              ? {
                  marginBottom: "auto",
                  marginTop: "auto",
                  fontSize: "1.2rem",
                  width: "100%",
                  // textAlign: "center",
                }
              : {}
          }
        >
          {content}
        </Content>
      </TextWrapper>
    </Container>
  );
};

// export default Block;
export default Block;
