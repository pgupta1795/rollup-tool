import { Box, Fab } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { TreeList } from '@progress/kendo-react-treelist';
import * as TableUtils from '../tableUtils';

const Toolbar = ({
  setRerender,
  setLoading,
  columns,
  rows,
  pagination,
  otherMenuItems,
}) => {
  const refresh = (e) => {
    e.preventDefault();
    setLoading(true);
    setRerender(true);
    setLoading(false);
  };

  let exportResult;
  const exportToExcel = () => {
    const data = [];
    rows.forEach((row) => {
      TableUtils.flatten(row, data);
    });
    const options = exportResult.workbookOptions(data, columns);
    let altIdx = 0;
    options.sheets[0].rows.forEach((row) => {
      if (row.type === 'data') {
        if (altIdx % 2 !== 0)
          row.cells.forEach((cell) => {
            cell.background = '#aabbcc';
          });
        altIdx += 1;
      }
    });
    options.sheets[0].columns = options.sheets[0].columns.map(({ width }) => ({
      width: width + 40,
      autoWidth: true,
    }));
    exportResult.save(options);
  };

  const exportTable = (e) => {
    e.preventDefault();
    setLoading(true);
    exportToExcel();
    setLoading(false);
  };

  const excelExport = (
    <ExcelExport
      ref={(exporter) => {
        exportResult = exporter;
      }}
      hierarchy
    >
      <TreeList data={rows} columns={columns} />
    </ExcelExport>
  );

  return (
    <div className="table-toolbar">
      <Box
        sx={{
          display: 'flex',
          columnGap: '10px',
        }}
      >
        {otherMenuItems}
        <Fab
          style={{
            maxHeight: '30px',
            minHeight: '30px',
            minWidth: '30px',
            maxWidth: '30px',
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
            maxHeight: '30px',
            minHeight: '30px',
            minWidth: '30px',
            maxWidth: '30px',
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
      <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', sm: 'block' }} />
      <Box sx={{ flexGrow: 1 }}>{pagination}</Box>
    </div>
  );
};

Toolbar.defaultProps = {
  pagination: '',
  otherMenuItems: [],
};

Toolbar.propTypes = {
  setRerender: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  pagination: PropTypes.any,
  otherMenuItems: PropTypes.array,
};
export default Toolbar;
