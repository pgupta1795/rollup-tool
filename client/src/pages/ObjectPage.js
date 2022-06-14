import React from "react";
import { useParams } from "react-router-dom";
import MyContainer from "../components/GridTable/GridTableContainer";
import * as Props from "../components/GridTable/props";
import Details from "../components/Form/Details";
import * as ServiceUtils from "../utils/ServiceUtils";

const ObjectPage = () => {
  const { id, type } = useParams();
  const headers = Props.OBJECT_COLUMNS(type);
  const headerKeys = Props.DEFAULT_COLUMN_KEYS.slice(0, -2);
  const customHeaderKeys = ServiceUtils.getCustomAttributeNames(type);
  const [data, setData] = React.useState({
    id: "",
    type: "",
    name: "",
    revision: "",
    title: "",
    current: "",
    description: "",
    owner: "",
  });

  return (
    <>
      <Details data={data} />
      <MyContainer
        headers={headers}
        headerKeys={headerKeys}
        customHeaderKeys={customHeaderKeys}
        type={type}
        id={id}
        key={id}
        setData={setData}
      />
    </>
  );
};

export default ObjectPage;
