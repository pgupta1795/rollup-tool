import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CustomPaper from "../Card/customPaper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../Styles/StyledAccordion";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
// import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Details = ({ data }) => {
  const [expand, setExpand] = React.useState(false);
  const toggle = () => {
    setExpand((prev) => !prev);
  };

  const form = (
    <>
      <Box sx={{ mb: 1, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
              {data.name || ""}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              {data.revision || ""}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {data.type || ""}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ mt: 1, mx: 2 }}>
        <Typography gutterBottom variant="subtitle1">
          {data.title || ""}
        </Typography>
        <Stack direction="row" spacing={1}>
          <div>
            <Chip label="Description" color="primary" />
            <Typography component="span" color="text.secondary">
              {data.description || ""}
            </Typography>
          </div>
          <div>
            <Chip label="Owner" color="primary" />
            <Typography component="span" color="text.secondary">
              {data.owner || ""}
            </Typography>
          </div>
          <div>
            <Chip label="Created" color="primary" />
            <Typography component="span" color="text.secondary">
              {data.created || ""}
            </Typography>
          </div>
          <div>
            <Chip label="Modified" color="primary" />
            <Typography component="span" color="text.secondary">
              {data.modified || ""}
            </Typography>
          </div>
        </Stack>
      </Box>
      {/* <BOX SX={{ MT: 3, ML: 1, MB: 1 }}>
        <BUTTON>ADD TO CART</BUTTON>
      </BOX> */}
    </>
  );

  return (
    <CustomPaper>
      <Accordion expanded={expand} sx={{ minHeight: 10 }}>
        <AccordionSummary toggle={toggle}>
          <Typography color="primary">Details</Typography>
        </AccordionSummary>
        <AccordionDetails>{form}</AccordionDetails>
      </Accordion>
    </CustomPaper>
  );
};

export default Details;
