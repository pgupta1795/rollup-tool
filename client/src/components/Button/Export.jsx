import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Divider, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import toast from '../../helper/toast';
import StyledMenu from '../../Styles/StyledMenu';
import { createCSV, createExcel, createXML } from '../../utils/ExportUtils';
import { getColumnsAndRows } from '../../utils/TableUtils';
import TableButton from './TableButton';

const Export = ({ table }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const csvExport = () => {
    try {
      const { columns, rows } = getColumnsAndRows(table);
      createCSV(columns, rows);
    } catch (error) {
      console.error(error);
      toast.error(error.message || error);
    }
  };

  const excelExport = () => {
    try {
      const { columns, rows } = getColumnsAndRows(table);
      createExcel(columns, rows);
    } catch (error) {
      console.error(error);
      toast.error(error.message || error);
    }
  };

  const xmlExport = () => {
    try {
      const { rows } = getColumnsAndRows(table);
      createXML(rows);
    } catch (error) {
      console.error(error);
      toast.error(error.message || error);
    }
  };

  return (
    <>
      <TableButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Export
      </TableButton>
      <StyledMenu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={excelExport} disableRipple>
          <SimCardDownloadIcon />
          Export Excel
        </MenuItem>
        <Divider />
        <MenuItem onClick={csvExport} disableRipple>
          <SnippetFolderIcon />
          Export CSV
        </MenuItem>
        <Divider />
        <MenuItem onClick={xmlExport} disableRipple>
          <TextSnippetIcon />
          Export XML
        </MenuItem>
      </StyledMenu>
    </>
  );
};

Export.propTypes = {
  table: PropTypes.any.isRequired,
};
export default Export;
