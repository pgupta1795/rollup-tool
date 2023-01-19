import { updateTypeObjectById } from '../api/TypeObjectApi';
import Constants from '../helper/Constants';
import toast from '../helper/toast';
import { getAttributeLocalDBName, getMassAttributeNames } from './ServiceUtils';
import {
  findRowById,
  hasChildren,
  subItemsField,
  updateTableCell,
} from './TableUtils';

// Best Available Mass attribute

export const BEST_AVAILABLE = 'Best Available';

export const BEST_AVAILABLE_DB_NAME = 'bestAvailable';

export const getRollupOrder = () => getMassAttributeNames();

/**
 *
 * @param {parentrow} row
 * @param {field name to use for sum children data} field
 * @returns
 */
const sumChildRows = (row, field) => {
  if (row && row[Constants.ENDITEM]) return Number(row[field]) || row[field];
  let newValueParent = 0;
  row[subItemsField].forEach((children) => {
    let childVal = 0;
    if (hasChildren(children)) childVal = sumChildRows(children, field);
    if (children[Constants.ENDITEM])
      childVal = Number(children[field]) || children[field];
    newValueParent += Number.isNaN(childVal) ? 0 : childVal;
  });
  return newValueParent;
};

/**
 * Shows the probable rollup values on table views,without commiting it to database
 * AND,
 * updates the newValue by summing up values from parent
 * @param {parentId} id
 * @param {data rows} newRows
 * @param {field to rollup} field
 * @returns
 */
export const rollUpFromParent = (newRows, field) => {
  try {
    const row = newRows && newRows[0];
    if (!row || !hasChildren(row)) return;
    const rollUpValue = sumChildRows(row, field);
    updateTableCell(newRows, row.id, field, rollUpValue);
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getRollupField = (row) => {
  const rollupOrder = getRollupOrder();
  let field;
  for (const cField of rollupOrder) {
    // eslint-disable-next-line eqeqeq
    if (row[cField] != 0) {
      field = cField;
      break;
    }
  }
  return field || rollupOrder[0];
};

/**
 * takes Actual_mass first and if non zero returns that field,
 * otherwise goes to next and continues
 * @param {row} row
 * @param {Fields in which rollup should be done} rollupOrder
 * @returns
 */
const sumMultiFieldChildRows = (row) => {
  const parentField = getRollupField(row);
  let newValueParent = row[Constants.ENDITEM]
    ? Number(row[parentField]) || row[parentField]
    : 0;
  row[subItemsField].forEach((children) => {
    const field = getRollupField(children);
    let childVal = 0;
    if (hasChildren(children)) childVal = sumMultiFieldChildRows(children);
    if (children[Constants.ENDITEM])
      childVal = Number(children[field]) || children[field];
    newValueParent += Number.isNaN(childVal) ? 0 : childVal;
  });
  return newValueParent;
};

/**
 * updates the newValue by summing up values from parent
 * OR
 * updates the rollup value by taking parent's values ,
 * if parent's values > child's value is less
 * else child's value
 * @param {parentId} id
 * @param {rows} newRows
 * @returns
 */
export const rollupBestAvailable = (id, newRows) => {
  try {
    let bestRollUp = 0;
    const row = findRowById(newRows, id);
    const parentField = getRollupField(row);
    if (row && row[Constants.ENDITEM])
      bestRollUp = Number(row[parentField]) || row[parentField];
    if (row && hasChildren(row)) bestRollUp = sumMultiFieldChildRows(row);
    return bestRollUp;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const calculate = async (rows, attribute) => {
  const root = rows[0];
  let param = getAttributeLocalDBName(attribute);
  let paramValue = root[attribute];
  if (attribute === BEST_AVAILABLE_DB_NAME) {
    param = BEST_AVAILABLE_DB_NAME;
    paramValue = rollupBestAvailable(rows[0]?.id, rows);
  }
  await updateTypeObjectById(root.id, param, paramValue);
  toast.info(`UPDATED ${param} with value ${paramValue}`);
};
