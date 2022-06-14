import { Box, Paper } from "@mui/material";
import React from "react";

const CustomPaper = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        flexGrow: 1,
        width: "100%",
        padding: "10px",
        marginRight: "15px",
      }}
    >
      <Paper
        component="div"
        sx={{
          width: "100%",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default CustomPaper;
