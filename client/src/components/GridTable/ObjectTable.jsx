import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { getter } from '@progress/kendo-react-common';
import {
  extendDataItem,
  filterBy,
  getSelectedState,
  mapTree,
  orderBy,
  TreeList,
} from '@progress/kendo-react-treelist';
import * as React from 'react';
import ActionsCell from './Cell/ActionsCell';
import * as TableUtils from './tableUtils';
import { rowEditColor } from '../../Styles/tableStyle';
import { ObjectContext } from '../../hooks/contexts';

const idGetter = getter(TableUtils.DATA_ITEM_KEY);

const ObjectTable = ({
  type,
  state,
  setState,
  columns,
  oldRows,
  loading,
  rowActionsRequired,
}) => {
  const object = React.useContext(ObjectContext);
  const [selectedState, setSelectedState] = React.useState({});

  const onSelectionChange = React.useCallback(
    (event) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState,
        dataItemKey: TableUtils.DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  const onHeaderSelectionChange = React.useCallback((event) => {
    const checkboxElement = event.syntheticEvent.target;
    const { checked } = checkboxElement;
    const newSelectedState = {};
    event.dataItems.forEach((item) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  const addExpandField = (dataTree) => {
    const { expanded } = state;
    return mapTree(dataTree, TableUtils.subItemsField, (item) =>
      extendDataItem(item, TableUtils.subItemsField, {
        expanded: expanded.includes(item.id),
        selected: selectedState[idGetter(item)],
        inEdit: Boolean(state.inEdit.find((i) => i.id === item.id)),
      })
    );
  };

  const processData = () => {
    const { data, dataState } = state;
    const filteredData = filterBy(
      data,
      dataState.filter,
      TableUtils.subItemsField
    );
    const sortedData = orderBy(
      filteredData,
      dataState.sort,
      TableUtils.subItemsField
    );
    return addExpandField(sortedData);
  };

  const enterEdit = (dataItem) => {
    // if (TableUtils.isNotEditable(dataItem)) {
    //   console.warn(Constants.PARENT_EDIT_WARNING);
    //   toast.warning(Constants.PARENT_EDIT_WARNING);
    //   return;
    // }
    setState({
      ...state,
      inEdit: [
        ...state.inEdit,
        extendDataItem(dataItem, TableUtils.subItemsField),
      ],
    });
  };

  const uploadSpecification = () => {};

  const save = async (dataItem) => {
    const newRows = await TableUtils.updateAttributes(
      type,
      dataItem,
      state.data,
      oldRows
    );
    const { inEdit, ...itemToSave } = dataItem;
    setState({
      ...state,
      data: newRows,
      inEdit: state.inEdit.filter((i) => i.id !== itemToSave.id),
    });
    object?.setOldRows(newRows);
  };

  const cancel = (editedItem) => {
    const { inEdit } = state;
    setState({
      ...state,
      data: oldRows,
      inEdit: inEdit.filter((i) => i.id !== editedItem.id),
    });
  };

  const CommandCell = ActionsCell(
    enterEdit,
    save,
    cancel,
    'inEdit',
    uploadSpecification
  );

  const onItemChange = (event) => {
    const { field, value, dataItem } = event;
    const newRows = TableUtils.updateCellValue(
      state.data,
      dataItem.id,
      field,
      value
    );
    setState({
      ...state,
      data: newRows,
    });
  };

  const cellRender = (td) => {
    const extraProps = {
      className: `${td.props.className} ${rowEditColor.DEFAULT}`,
    };
    return React.cloneElement(
      td,
      { ...td.props, ...extraProps },
      td.props.children
    );
  };

  const actionColumn = {
    title: 'Object Actions',
    width: '20%',
    cell: CommandCell,
  };

  const allColumns = rowActionsRequired
    ? [...columns.slice(0, 2), actionColumn, ...columns.slice(2)]
    : columns;

  return (
    <div>
      {loading ? (
        <Skeleton variant="rectangular" height="55vh" />
      ) : (
        <TreeList
          style={{ minHeight: '55vh' }}
          cellRender={cellRender}
          expandField="expanded"
          selectedField="selected"
          editField="inEdit"
          subItemsField={TableUtils.subItemsField}
          onExpandChange={(e) =>
            setState({
              ...state,
              expanded: e.value
                ? state.expanded.filter((id) => id !== e.dataItem.id)
                : [...state.expanded, e.dataItem.id],
            })
          }
          sortable={{
            mode: 'multiple',
          }}
          {...state.dataState}
          data={processData()}
          onSelectionChange={onSelectionChange}
          onHeaderSelectionChange={onHeaderSelectionChange}
          onDataStateChange={(event) => {
            setState({ ...state, dataState: event.dataState });
          }}
          onItemChange={onItemChange}
          columns={allColumns}
        />
      )}
    </div>
  );
};

ObjectTable.defaultProps = {
  type: null,
  rowActionsRequired: true,
};

ObjectTable.propTypes = {
  type: PropTypes.string,
  state: PropTypes.any.isRequired,
  setState: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  oldRows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  rowActionsRequired: PropTypes.bool,
};
export default ObjectTable;
