import React from "react";
import { Pagination as TablePagination } from "@mui/material";

const MyPagination = ({ current, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TablePagination
        size="small"
        component="div"
        shape="rounded"
        color="primary"
        count={current + 1}
        onChange={onChange}
      />
    </div>
  );
};

export default MyPagination;
