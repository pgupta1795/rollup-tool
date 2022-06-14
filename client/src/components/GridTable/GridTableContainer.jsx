import { Box, Skeleton, TableContainer } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../Styles/StyledAccordion";
import React from "react";
import GridTable from "./GridTable";
import CustomPaper from "../Card/customPaper";

const MyContainer = ({
  headers,
  headerKeys,
  customHeaderKeys,
  type,
  id,
  setData,
}) => {
  const [toolbar, setToolbar] = React.useState(
    <Box
      sx={{
        display: "flex",
        columnGap: "10px",
      }}
    >
      <Skeleton variant="circular" width={30} height={30} />
      <Skeleton variant="circular" width={30} height={30} />
      <Skeleton variant="circular" width={30} height={30} />
    </Box>
  );
  const [expand, setExpand] = React.useState(true);
  const toggle = () => {
    setExpand((prev) => !prev);
  };
  return (
    <CustomPaper>
      <Accordion expanded={expand} sx={{ minHeight: 10 }}>
        <AccordionSummary toggle={toggle}>{toolbar}</AccordionSummary>
        <AccordionDetails>
          <TableContainer component="div">
            <GridTable
              headers={headers}
              headerKeys={headerKeys}
              customHeaderKeys={customHeaderKeys}
              type={type}
              id={id}
              setToolbar={setToolbar}
              setData={setData}
            />
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </CustomPaper>
  );
};

export default MyContainer;
