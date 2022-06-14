import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { useAuth } from "../../authentication/auth";
import { ReactComponent as TT } from "../../custom/TT.svg";
import Paths from "../../utils/Paths";
import Profile from "../Profile/profile";
import TechniaSearch from "../Search/search";
import StyledSwitch from "../../Styles/StyledSwitch";
import * as TableStyle from "../../Styles/tableStyle";

export default function Header({ checked, setChecked }) {
  const auth = useAuth();
  const hasCookies = auth.cookies?.Cookies;

  const myLogo = (
    <IconButton
      size="small"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 2 }}
    >
      <a href={Paths.LOGIN}>
        <TT />
      </a>
    </IconButton>
  );
  const myTool = (
    <Typography
      variant="h5"
      color="white"
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      {document.title}
    </Typography>
  );
  const mySearch = <TechniaSearch />;

  const themeChange = () => {
    setChecked((previous) => {
      TableStyle.setRowStyle(previous);
      return !previous;
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {myLogo}
          <Box sx={{ flexGrow: 1 }} />
          {hasCookies ? mySearch : ""}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "flex", md: "flex" } }}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            {!hasCookies ? myTool : <Profile />}
            <StyledSwitch
              checked={checked}
              onChange={themeChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
