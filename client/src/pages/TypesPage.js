import * as React from "react";
import MyContainer from "../components/GridTable/GridTableContainer";
import * as Props from "../components/GridTable/props";
import { useParams } from "react-router-dom";
import * as ServiceUtils from "../utils/ServiceUtils";
import { Navigate } from "react-router-dom";
import Paths from "../utils/Paths";

const TypesPage = () => {
  const { type } = useParams();
  const headers = Props.DEFAULT_COLUMNS;
  const headerKeys = Props.DEFAULT_COLUMN_KEYS;

  return ServiceUtils.TYPES.includes(type) ? (
    <MyContainer
      headers={headers}
      headerKeys={headerKeys}
      customHeaderKeys={[]}
      type={type}
    />
  ) : (
    <>
      {alert(type + " is not configured or valid enovia type")}
      <Navigate to={Paths.HOME}></Navigate>
    </>
  );
};

export default TypesPage;
