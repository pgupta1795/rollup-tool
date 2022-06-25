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

const idGetter = getter(TableUtils.DATA_ITEM_KEY);

const ObjectTable = ({ type, state, setState, columns, oldRows, loading }) => {
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
    if (TableUtils.isNotEditable(dataItem)) {
      console.warn('Can only edit leaf level elements');
      return;
    }
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
      state.data
    );
    const { inEdit, ...itemToSave } = dataItem;
    setState({
      ...state,
      data: newRows || oldRows,
      inEdit: state.inEdit.filter((i) => i.id !== itemToSave.id),
    });
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
    const newRows = TableUtils.getUpdatedRows(event, state);
    setState({
      ...state,
      data: newRows,
    });
  };

  const cellRender = (td) => {
    const extraProps = { className: `${td.props.className} table-column` };
    return React.cloneElement(
      td,
      { ...td.props, ...extraProps },
      td.props.children
    );
  };

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
          columns={[
            ...columns,
            {
              title: 'Object Actions',
              width: '20%',
              cell: CommandCell,
            },
          ]}
        />
      )}
    </div>
  );
};

ObjectTable.propTypes = {
  type: PropTypes.string.isRequired,
  state: PropTypes.any.isRequired,
  setState: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  oldRows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default ObjectTable;
