import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";

const CustomList = ({ text, icon }) => {
  return (
    <ListItem key={text} divider={true}>
      <ListItemButton
        alignItems="center"
        sx={{
          py: 2,
          color: "rgba(255,255,255,1)",
          px: 1,
          pt: 3,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default CustomList;
