import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";

const TopStepper = ({
  steps,
  activeStep,
}: {
  steps: string[];
  activeStep: any;
}) => {
  // Detect if the screen size is "small" (mobile)
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#72d9bd",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#00c899",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#eaeaf0",
      borderTopWidth: 10,
      borderRadius: 1,
      //Custom field: height, borderLeftWidth
      height: "100%",
      borderLeftWidth: "3px",
      ...theme.applyStyles("dark", {
        borderColor: theme.palette.grey[800],
      }),
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme }) => ({
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
      "& .QontoStepIcon-completedIcon": {
        color: "#18216D",
        zIndex: 1,
        fontSize: 20,
      },
      "& .QontoStepIcon-circle": {
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#FF825C",
      },
      ...theme.applyStyles("dark", {
        // color: "#fff",
        // fontFamily: "Motiva Sans Bold",
        color: theme.palette.grey[300],
      }),
      variants: [
        {
          props: ({ ownerState }) => ownerState.active,
          style: {
            color: "#784af4",
          },
        },
      ],
    })
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  console.log("Active Step: ", activeStep);
  return (
    <Stepper
      // alternativeLabel
      orientation="vertical"
      activeStep={activeStep}
      connector={<QontoConnector />}
      style={{ height: "100%" }}
      sx={{ alignItems: "center", alignContent: "center" }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={QontoStepIcon}
            sx={{
              "& .MuiStepLabel-labelContainer .Mui-active": {
                fontSize: "1.2rem",
                color: "#18216d",
                fontWeight: "Bold",
                // color: "red",
              },
            }}
          >
            {label}
            {/* <Typography variant={isSmallScreen ? "body2" : "h6"}>
              {label}
            </Typography> */}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default TopStepper;
