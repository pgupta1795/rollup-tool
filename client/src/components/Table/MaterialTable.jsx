import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { filterFunctions } from '../../utils/TableUtils';

const MaterialTable = memo((tableProps) => {
  const theme = useTheme();
  const {
    loading,
    isSaving,
    tableData,
    columns,
    toolbar,
    save,
    cancel,
    onColumnsChange,
    initialState,
    ...rest
  } = tableProps;

  return (
    <MaterialReactTable
      state={{ isLoading: loading, showProgressBars: isSaving }}
      columns={columns}
      data={tableData}
      memoMode="cells"
      muiTableContainerProps={{ sx: { minHeight: 250 } }}
      muiTablePaperProps={{
        elevation: 0,
      }}
      muiTableHeadCellProps={() => ({
        sx: {
          fontWeight: 'bold',
          background: `${theme.palette.divider}`,
        },
      })}
      filterFns={{
        ...filterFunctions,
      }}
      globalFilterFn="customGlobalSearch" // custom function to enable searching from search function
      enableColumnFilterModes
      enableColumnOrdering
      enableColumnResizing
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection // Sub Rows are selected in Tree With Selection of Parent
      maxLeafRowFilterDepth={0}
      enableStickyHeader
      initialState={{
        ...initialState,
      }}
      enableExpanding
      enableBottomToolbar
      renderTopToolbarCustomActions={toolbar}
      enableEditing
      muiTableBodyCellEditTextFieldProps={(props) => ({
        onChange: (event) => {
          onColumnsChange(props, event.target.value);
        },
      })}
      editingMode="row"
      onEditingRowSave={save}
      onEditingRowCancel={cancel}
      displayColumnDefOptions={{
        'mrt-row-actions': {
          muiTableHeadCellProps: {
            align: 'center',
          },
          size: 100,
          header: <SettingsIcon />,
        },
      }}
      enableRowVirtualization
      {...rest}
    />
  );
});

MaterialTable.defaultProps = {
  loading: false,
  isSaving: false,
  toolbar: () => {},
  save: () => {
    console.log('SAVING ROW DATA');
  },
  cancel: () => {
    console.log('CANCEL ROW EDIT');
  },
  onColumnsChange: (props, newValue) => {
    const columnInEdit = props.column;
    const rowInEdit = props.row.original;
    console.log(
      `Column ${columnInEdit?.columnDef?.header} is in edit mode for row ${rowInEdit?.title} to newValue ${newValue} `
    );
  },
  initialState: {
    showColumnFilters: false,
    density: 'compact',
    showGlobalFilter: false,
    expanded: true,
  },
};

MaterialTable.propTypes = {
  loading: PropTypes.bool,
  isSaving: PropTypes.bool,
  tableData: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  toolbar: PropTypes.any,
  save: PropTypes.func,
  cancel: PropTypes.func,
  onColumnsChange: PropTypes.func,
  initialState: PropTypes.object,
};

export default MaterialTable;
