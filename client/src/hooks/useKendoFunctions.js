import { getter } from '@progress/kendo-react-common';
import {
  extendDataItem,
  filterBy,
  getSelectedState,
  mapTree,
  orderBy,
} from '@progress/kendo-react-treelist';
import { useCallback, useState } from 'react';

import * as TableUtils from '../components/GridTable/tableUtils';

const useKendoFunctions = (state) => {
  const idGetter = getter(TableUtils.DATA_ITEM_KEY);

  const [selectedState, setSelectedState] = useState({});

  const onSelectionChange = useCallback(
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

  const onHeaderSelectionChange = useCallback((event) => {
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
    if (!state) return null;
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

  return {
    onSelectionChange,
    onHeaderSelectionChange,
    addExpandField,
    processData,
  };
};

export default useKendoFunctions;
