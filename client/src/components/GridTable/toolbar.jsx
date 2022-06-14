import { Box, Fab } from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import AddIcon from "@mui/icons-material/Add";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { TreeList } from "@progress/kendo-react-treelist";
import * as TableUtils from "./tableUtils";

const Toolbar = ({
  setRerender,
  setLoading,
  loading,
  columns,
  rows,
  pagination,
}) => {
  const createObject = (e) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
  };

  const refresh = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRerender(true);
      setLoading(false);
    }, 1000);
  };

  const exportTable = (e) => {
    e.preventDefault();
    setLoading(true);
    exportToExcel();
    setLoading(false);
  };

  let _export;
  const exportToExcel = () => {
    const data = [];
    rows.forEach((row) => {
      TableUtils.flatten(row, data);
    });
    const options = _export.workbookOptions(data, columns);
    let altIdx = 0;
    options.sheets[0].rows.forEach((row) => {
      if (row.type === "data") {
        if (altIdx % 2 !== 0)
          row.cells.forEach((cell) => (cell.background = "#aabbcc"));
        altIdx++;
      }
    });
    options.sheets[0].columns = options.sheets[0].columns.map(
      ({ width, autoWidth }) => {
        return { width: width + 40, autoWidth: true };
      }
    );
    _export.save(options);
  };

  const excelExport = (
    <ExcelExport ref={(exporter) => (_export = exporter)} hierarchy={true}>
      <TreeList data={rows} columns={columns} />
    </ExcelExport>
  );

  return (
    <div className="table-toolbar">
      <Box
        sx={{
          display: "flex",
          columnGap: "10px",
        }}
      >
        <Fab
          style={{
            maxHeight: "30px",
            minHeight: "30px",
            minWidth: "30px",
            maxWidth: "30px",
          }}
          aria-label="create object"
          onClick={createObject}
          size="small"
          color="primary"
          title="Create Object"
        >
          <AddIcon color="inherit" />
        </Fab>
        <Fab
          style={{
            maxHeight: "30px",
            minHeight: "30px",
            minWidth: "30px",
            maxWidth: "30px",
          }}
          aria-label="table refresh"
          onClick={refresh}
          size="small"
          color="primary"
          title="Refresh table"
        >
          <RefreshIcon color="inherit" />
        </Fab>
        <Fab
          style={{
            maxHeight: "30px",
            minHeight: "30px",
            minWidth: "30px",
            maxWidth: "30px",
          }}
          aria-label="table export-excel"
          onClick={exportTable}
          size="small"
          color="primary"
          title="Export to excel"
        >
          <Box display="none">{excelExport}</Box>
          <SimCardDownloadIcon color="inherit" />
        </Fab>
      </Box>
      <Box sx={{ flexGrow: 1 }} display={{ xs: "none", sm: "block" }}></Box>
      <Box sx={{ flexGrow: 1 }}>{pagination}</Box>
    </div>
  );
};

export default Toolbar;
