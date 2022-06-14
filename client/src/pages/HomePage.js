import * as React from "react";
import * as ServiceUtils from "../utils/ServiceUtils";
import TypesCard from "../components/Card/typesCard";
import { Box } from "@mui/material";

const HomePage = () => {
  const allMenuItems = ServiceUtils.TYPES.map((type) => (
    <TypesCard type={type} key={type} />
  ));

  return <Box className="roll-up-home">{allMenuItems}</Box>;
};

export default HomePage;
