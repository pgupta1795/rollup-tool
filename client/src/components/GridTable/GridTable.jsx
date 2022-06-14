import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../authentication/auth";
import {
  TreeList,
  orderBy,
  filterBy,
  mapTree,
  extendDataItem,
  getSelectedState,
} from "@progress/kendo-react-treelist";
import StorageConstants from "../../utils/StorageConstants";
import * as TableUtils from "./tableUtils";
import * as Api from "../../utils/Api";
import { authenticateTableData } from "../Auth/RequireAuth";
import Paths from "../../utils/Paths";
import Toolbar from "./toolbar";
import { getter } from "@progress/kendo-react-common";
import { Skeleton } from "@mui/material";
import MyPagination from "./pagination";
import ActionsCell from "./Cell/ActionsCell";
import * as Props from "./props";

const subItemsField = TableUtils.subItemsField;
const idGetter = getter(TableUtils.DATA_ITEM_KEY);
const pageSize = 30;

const GridTable = ({
  headers,
  headerKeys,
  customHeaderKeys,
  type,
  id,
  setToolbar,
  setData,
}) => {
  const auth = useAuth();
  const [current, setCurrent] = React.useState(1);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [spaceUrl, setSpaceUrl] = React.useState(
    localStorage.getItem(StorageConstants.SPACE3d)
  );
  const [reRender, setRerender] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState({});
  const [state, setState] = React.useState({
    data: [],
    dataState: {
      sort: [
        {
          field: "name",
          dir: "asc",
        },
      ],
      filter: [],
    },
    expanded: [1, 2, 32],
    inEdit: [],
  });
  const [oldRows, setOldRows] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    try {
      let cRows;
      setLoading(true);
      if (id) {
        const response = await Api.getAllChildren(type, spaceUrl, id);
        if (authenticateTableData(response)) {
          const rows = TableUtils.getRows(
            response.data,
            headerKeys,
            customHeaderKeys
          );
          setData(
            TableUtils.getRows(
              response.data,
              Props.DEFAULT_COLUMN_KEYS,
              customHeaderKeys
            )[0]
          );
          const children = TableUtils.formatChildData(
            response.children,
            headerKeys,
            customHeaderKeys,
            id
          );
          rows[0].children = children;
          setCurrent(current);
          setState({
            ...state,
            data: rows,
          });
          cRows = rows;
        }
      } else {
        const response = await Api.searchObjects(
          type,
          spaceUrl,
          pageSize,
          (current - 1) * pageSize
        );

        if (authenticateTableData(response)) {
          const allRows = TableUtils.getRows(response, headerKeys);
          setCurrent(current);
          setState({
            ...state,
            data: allRows,
          });
          cRows = allRows;
        }
      }
      setOldRows(cRows);
      setColumns(headers);
      setRerender(false);
      setLoading(false);
      setToolbar(
        <Toolbar
          setRerender={setRerender}
          setLoading={setLoading}
          columns={[...headers]}
          rows={cRows}
          pagination={
            id ? null : (
              <MyPagination
                current={current}
                onChange={(e, page) => setCurrent(page)}
              />
            )
          }
        />
      );
    } catch (error) {
      auth.logout();
      return <Navigate to={Paths.LOGIN} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, current]);

  React.useEffect(() => {
    const url = localStorage.getItem(StorageConstants.SPACE3d);
    setSpaceUrl(url);
    const checkUserData = () => setSpaceUrl(url);
    window.addEventListener("storage", checkUserData);
    fetchData();
    return () => {
      window.removeEventListener("storage", checkUserData);
    };
  }, [reRender, fetchData]);

  const onSelectionChange = React.useCallback(
    (event) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: TableUtils.DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  const onHeaderSelectionChange = React.useCallback((event) => {
    const checkboxElement = event.syntheticEvent.target;
    const checked = checkboxElement.checked;
    const newSelectedState = {};
    event.dataItems.forEach((item) => {
      newSelectedState[idGetter(item)] = checked;
    });
    setSelectedState(newSelectedState);
  }, []);

  const addExpandField = (dataTree) => {
    const expanded = state.expanded;
    return mapTree(dataTree, subItemsField, (item) =>
      extendDataItem(item, subItemsField, {
        expanded: expanded.includes(item.id),
        selected: selectedState[idGetter(item)],
        inEdit: Boolean(state.inEdit.find((i) => i.id === item.id)),
      })
    );
  };

  const processData = () => {
    let { data, dataState } = state;
    let filteredData = filterBy(data, dataState.filter, subItemsField);
    let sortedData = orderBy(filteredData, dataState.sort, subItemsField);
    return addExpandField(sortedData);
  };

  const enterEdit = (dataItem) => {
    if (TableUtils.isNotEditable(dataItem)) {
      console.warn("Can only edit leaf level elements");
      return;
    }
    setState({
      ...state,
      inEdit: [...state.inEdit, extendDataItem(dataItem, subItemsField)],
    });
  };

  const uploadSpecification = (dataItem) => {};

  const save = async (dataItem) => {
    let newRows = await TableUtils.updateAttributes(type, dataItem, state.data);
    const { inEdit, ...itemToSave } = dataItem;
    setState({
      ...state,
      data: newRows ? newRows : oldRows,
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
    "inEdit",
    uploadSpecification
  );

  const onItemChange = (event) => {
    const newRows = TableUtils.getUpdatedRows(event, state);
    setState({
      ...state,
      data: newRows,
    });
  };

  const cellRender = (td, props) => {
    let extraProps = { className: td.props.className + " table-column" };
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
          style={{ minHeight: "55vh" }}
          cellRender={cellRender}
          expandField="expanded"
          selectedField="selected"
          editField="inEdit"
          subItemsField={subItemsField}
          onExpandChange={(e) =>
            setState({
              ...state,
              expanded: e.value
                ? state.expanded.filter((id) => id !== e.dataItem.id)
                : [...state.expanded, e.dataItem.id],
            })
          }
          sortable={{
            mode: "multiple",
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
              title: "Object Actions",
              width: "20%",
              cell: CommandCell,
            },
          ]}
        />
      )}
    </div>
  );
};

export default GridTable;
