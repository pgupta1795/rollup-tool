import { KEY } from '../components/Table/Columns/DefaultColumns';
import Colors from '../helper/Colors';
import Constants from '../helper/Constants';
import { flatten } from './ArrayUtils';
import { getRollupField } from './RollupUtils';
import { findRowById, hasChildren } from './TableUtils';

const getProperty = (details, field) => {
  if (!Object.prototype.hasOwnProperty.call(details, field)) return null;
  return details[field];
};

/**
 * Object does not have value : RED,
 * Object is endItem : GREEN
 * @param {*} details
 * @param {*} field
 * @returns
 */
export const calculateEditColumnColor = (
  details,
  field,
  isBestAvailableColor = false
) => {
  if (!Object.prototype.hasOwnProperty.call(details, field)) return null;
  const value = details[field];
  if (!value) return Colors.COLOR_RED;
  const isEndItem = details[Constants.ENDITEM];
  if (isBestAvailableColor && isEndItem) return Colors.COLOR_GREEN;
  return Colors.COLOR_ORANGE;
};

/**
 * stores array of objects containing id,customAttributename and its color as render value
 * ex: [{
    id : 'ABCED',
    Actual_Weight : {
      color : 'Red',
      show : false
    },
	...
  },...]
 * @param {*} tableData 
 */
export const getCellColors = (tableData, columns) => {
  if (!tableData) return [];
  const flattenRows = flatten(tableData);
  return flattenRows?.map(({ id, ...details }) => {
    const originalRow = findRowById(tableData, id);
    const hasChild = originalRow ? hasChildren(originalRow) : false;
    const cellColor = {
      id,
      hasChildren: hasChild,
      rowColor: hasChild ? Colors.COLOR_ASSEMBLY : null,
      endItem: details.endItem,
    };
    columns?.forEach(({ attributeType: attrType, ...column }) => {
      if (attrType === 'db' || attrType === 'default') return;
      const colKey = KEY(column);
      const color = calculateEditColumnColor(details, colKey);
      const value = getProperty(details, colKey);
      cellColor[colKey] = {
        color,
        show: false,
        value,
      };
    });
    return cellColor;
  });
};

export const modifyAttributeCellColors = (
  rows,
  cellColors,
  attribute,
  show = true
) => {
  const newCellColors = cellColors.map(({ id, ...cellColorRow }) => {
    const row = findRowById(rows, id);
    const color = calculateEditColumnColor(row, attribute);
    cellColorRow[attribute].show = show;
    cellColorRow[attribute].color = color;
    cellColorRow[attribute].value = row[attribute];
    return { id, ...cellColorRow };
  });
  return newCellColors;
};

export const modifyBestAvailableCellColors = (
  rows,
  cellColors,
  show = true
) => {
  const newCellColors = cellColors.map(({ id, ...cellColorRow }) => {
    const row = findRowById(rows, id);
    const rollupField = getRollupField(row);
    const color = calculateEditColumnColor(row, rollupField, true);
    cellColorRow[rollupField].show = show;
    cellColorRow[rollupField].color = color;
    cellColorRow[rollupField].value = row[rollupField];
    return { id, ...cellColorRow };
  });
  return newCellColors;
};
