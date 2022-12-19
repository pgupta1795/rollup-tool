import RefreshIcon from '@mui/icons-material/Refresh';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { Box, Fab, useTheme } from '@mui/material';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { TreeList } from '@progress/kendo-react-treelist';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import toast from '../../../helper/toast';
import { ObjectContext } from '../../../hooks/contexts';
import useKendoFunctions from '../../../hooks/useKendoFunctions';
import * as TableUtils from '../tableUtils';

const Toolbar = ({
  setRerender,
  setLoading,
  columns,
  rows,
  pagination,
  otherMenuItems,
}) => {
  const theme = useTheme();
  const object = useContext(ObjectContext);
  const { processData } = useKendoFunctions(object?.state);

  const refresh = (e) => {
    e.preventDefault();
    setLoading(true);
    setRerender(true);
    setLoading(false);
  };

  let exportResult;

  const exportToExcel = () => {
    const data = [];
    const sortedRows = processData();
    if (!sortedRows) {
      toast.warning('Table cannot be Exported');
      return;
    }
    console.log('SORTED ROWS');
    sortedRows.forEach((row) => {
      TableUtils.flattenWithLevel(row, data, 0);
    });
    const excelColumns = TableUtils.getExcelColumns(
      columns,
      theme.palette.primary.main
    );
    const options = exportResult.workbookOptions(data, excelColumns);
    options.sheets[0].columns = options.sheets[0].columns.map(
      ({ ...rest }, index) => ({
        ...rest,
        autoWidth: !(index === 0 || index === 1),
      })
    );
    exportResult.save(options);
    console.log('Excel Exported');
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
      <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', sm: 'flex' }} />
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
  otherMenuItems: PropTypes.any,
};
export default Toolbar;
