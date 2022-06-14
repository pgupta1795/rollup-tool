import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  formContainer: {
    width: "100%",
    padding: "5px",
    marginTop: theme.spacing(10),
  },
  resize: {
    [theme.breakpoints.down("600")]: {
      width: "50vw",
    },
    [theme.breakpoints.up("600")]: {
      width: "35vw",
    },
    [theme.breakpoints.up("800")]: {
      width: "25vw",
    },
    lineHeight: "1.5em",
    margin: "5px",
    paddingBottom: "5px",
    paddingTop: "5px",
    textAlign: "justify",
  },
  formFontSize: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.25em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.5em",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5em",
    },
  },

  button: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.25em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.5em",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "16vw",
      maxHeight: "16vh",
      minWidth: "8vw",
      minHeight: "6vh",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.75em",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1em",
    },
    marginTop: "30px",
    padding: "1em",
  },

  displayNone: {
    [theme.breakpoints.down("500")]: {
      display: "none",
    },
  },
}));
