import {
  Divider,
  Grid,
  Hidden,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function Card(props) {
  const percen = Math.round((props.percentage + Number.EPSILON) * 100) / 100;
  //   const pers = percen <= 100 ? percen : 100;
  const title = props.title;
  const IconPerformance = props.iconPerformance;

  const onMyPatymentsClick = () => {
    props.onClick();
  };

  return (
    <Paper
      sx={{
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        position: "relative",
        borderRadius: 2,
        padding: (theme) => theme.spacing(1, 2),
        width: "100%",
        margin: (theme) => theme.spacing(2),
      }}
    >
      <Grid container>
        <Hidden only="sm">
          <Grid
            sx={{
              height: "70px",
              width: "70px",
              display: "flex",
              position: "absolute",
              zIndex: 1,
              top: -25,
              left: 12,
              color: "#ff0000",
              borderRadius: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ background: props.color }}
          >
            <IconPerformance
              sx={{
                minWidth: 60,
                minHeight: 60,
                color: "#ffffff",
              }}
            />
          </Grid>
        </Hidden>

        <Grid
          container
          sx={{
            padding: (theme) => theme.spacing(1),
            margin: (theme) => theme.spacing(1),
          }}
          justifyContent="flex-end"
        >
          <Typography variant="h5">
            <strong>{title}</strong>
          </Typography>
          <Typography variant="caption" align="left" color="text.secondary">
            {props.caption}
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            padding: (theme) => theme.spacing(1),
            margin: (theme) => theme.spacing(1, 0, 1, 0),
          }}
        >
          <Typography variant="h6" align="left">
            {props.subTitle != null ? props.subTitle : "..."}
          </Typography>
        </Grid>
      </Grid> */}

      <Divider style={{ color: "#000" }} />

      <Grid
        container
        xs
        justify="flex-start"
        sx={{
          padding: (theme) => theme.spacing(1),
          //   margin: (theme) => theme.spacing(1, 0),
        }}
      >
        <Button
          type="button"
          variant="text"
          size="medium"
          endIcon={<ArrowCircleRightIcon />}
          onClick={onMyPatymentsClick}
        >
          <strong>{props.buttonName}</strong>
        </Button>
        {/* <Typography>
          <strong>{props.primary}</strong>
        </Typography> */}
      </Grid>
    </Paper>
  );
}
