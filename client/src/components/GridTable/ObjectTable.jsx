import { Skeleton } from '@mui/material';
import { extendDataItem, TreeList } from '@progress/kendo-react-treelist';
import PropTypes from 'prop-types';
import * as React from 'react';
import toast from '../../helper/toast';
import { updateTypeObjectById } from '../../helper/TypeObjectApi';
import { ObjectContext } from '../../hooks/contexts';
import useKendoFunctions from '../../hooks/useKendoFunctions';
import { rowEditColor } from '../../Styles/tableStyle';
import ActionsCell from './Cell/ActionsCell';
import * as TableUtils from './tableUtils';

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

  const { onSelectionChange, onHeaderSelectionChange, processData } =
    useKendoFunctions(state);

  const enterEdit = (dataItem) => {
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

    await TableUtils.saveRelatedEndItem(newRows, dataItem.id, 'endItem');
    await updateTypeObjectById(dataItem.id, 'endItem', dataItem.endItem);

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
    let newRows = TableUtils.updateCellValue(
      state.data,
      dataItem.id,
      field,
      value
    );
    if (field === 'endItem') {
      newRows = TableUtils.updateRelatedEndItem(
        newRows,
        dataItem.id,
        field,
        value
      );
      toast.info(
        `All Children and parent (if) of ${dataItem.title} will be marked as End Item FALSE`
      );
    }

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

  const [allColumns, setAllColumns] = React.useState([]);

  React.useEffect(() => {
    const cols = rowActionsRequired
      ? [...columns.slice(0, 3), actionColumn, ...columns.slice(3)]
      : columns;
    const filterCols = TableUtils.filterHiddenColumns(cols);
    setAllColumns(filterCols);

    return () => {
      setAllColumns([]);
    };
  }, [columns]);

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
          reorderable
          onColumnReorder={(e) => {
            setAllColumns(e.columns);
          }}
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
