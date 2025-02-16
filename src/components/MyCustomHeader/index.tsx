import { Row } from "antd";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";

import { HeaderSection, LogoContainer } from "./styles";
import { styled } from "@mui/system";

import { Box, Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  // border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  margin: "1rem",
  marginRight: "0rem",
  "&:hover": {
    color: "#fff",
    border: "0.2px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

const MyCustomHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderSection>
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            mt={{ xs: 2 }}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Box ml={1}>
                <SvgIcon
                  src="updated_productLogo1.svg"
                  width="300px"
                  height="50px"
                  marginLeft="-5rem"
                />
              </Box>
              <MyCustomButton
                variant="contained"
                startIcon={<ExitToAppIcon />}
                onClick={() => navigate("/login")}
              >
                Logout
              </MyCustomButton>
            </Box>

            <Box
              width={"100%"}
              height={"5px"}
              ml={-3}
              mt={1}
              sx={{
                background: "linear-gradient(to right, #ff825b, white)",
              }}
            />
          </Box>
        </Container>
      </HeaderSection>
    </>
  );
};

export default MyCustomHeader;
