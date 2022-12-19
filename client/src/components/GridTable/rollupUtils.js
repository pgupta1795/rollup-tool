/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import { authenticateTableData } from '../../utils/CommonUtils';
import * as Api from '../../helper/Api';
import { updateTypeObjectById } from '../../helper/TypeObjectApi';
import * as ServiceUtils from '../../utils/ServiceUtils';
import toast from '../../helper/toast';
import {
  subItemsField,
  findRowById,
  updateCellValue,
  createAction,
  hasChildren,
} from './tableUtils';

export const BEST_AVAILABLE = 'Best Available';

export const BEST_AVAILABLE_V2 = 'Best Available v2';

export const ACTUAL_MASS = 'Actual_Weight';

export const ESTIMATED_MASS = 'Estimated_Weight';

export const CALCULATED_MASS = 'Weight';

export const getRollupOrder = () => {
  const typeSettings = ServiceUtils.getTypeSettings('VPMReference');
  return typeSettings.ROLLUP_ORDER.split('>');
};

/**
 * updates the newValue to itself and summating it till parent level
 * @param {*} id
 * @param {*} newRows
 * @param {*} field
 * @returns
 */
export const rollUpFromChildren = (id, newRows, field) => {
  try {
    const row = id ? findRowById(newRows, id) : '';
    if (row) {
      let newValueParent = 0;
      if (row[subItemsField]) {
        row[subItemsField].forEach((children) => {
          const childval = Number(children[field]);
          newValueParent += Number.isNaN(childval) ? 0 : childval;
        });
        newRows = updateCellValue(newRows, id, field, newValueParent);
      }
      newRows = rollUpFromChildren(row?.parent, newRows, field);
    }
    return newRows;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

/**
 *
 * @param {parentrow} row
 * @param {field name to use for sum children data} field
 * @returns
 */
const sumChildRows = (row, field) => {
  if (row?.endItem) return row[field];
  let newValueParent = 0;

  row[subItemsField].forEach((children) => {
    const childval = hasChildren(children)
      ? sumChildRows(children, field)
      : children.endItem
      ? children[field]
      : 0;

    newValueParent += Number.isNaN(childval) ? 0 : childval;
  });
  return newValueParent;
};

/**
 * updates the newValue by summing up values from parent
 * @param {parentId} id
 * @param {data rows} newRows
 * @param {field to rollup} field
 * @returns
 */
export const rollUpFromParent = (id, newRows, field) => {
  try {
    const row = id ? findRowById(newRows, id) : '';
    if (
      !row ||
      _.isUndefined(row[subItemsField]) ||
      (row[subItemsField] && row[subItemsField].length === 0)
    ) {
      return newRows;
    }
    const rollUpValue = sumChildRows(row, field);
    return updateCellValue(newRows, id, field, rollUpValue);
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

/**
 * Shows the probable rollup values on table views,without commiting it to database
 * @param {event} event
 * @param {state} state
 * @returns
 */
export const rollup = (field, newRows) => {
  const customKeys = ServiceUtils.getCustomAttributeNames();
  if (customKeys?.includes(field)) {
    const { id } = newRows[0];
    newRows = rollUpFromParent(id, newRows, field);
  }
  return newRows;
};

/**
 * 1.) Creates object in mongodb database if not already present
 * 2.) Updates attribute values in enovia using webservice
 * 3.) Creates action if above things are success
 * 4.) Updates cestamp with a new value for the object after updation in enovia
 *
 * @param {type} type
 * @param {selectedRow} selectedRow
 * @param {newRows} newRows
 * @param {oldRows} oldRows
 * @returns
 */
export const actualEnoviaRollup = async (
  type,
  currentRow,
  newRows,
  oldRows
) => {
  try {
    await Api.createTypeObject(type, currentRow);
    const response = await Api.updateObject(type, currentRow);
    if (!authenticateTableData(response)) {
      return newRows;
    }
    await createAction(currentRow, oldRows);
    const id = response?.member[0].id;
    const newCEStamp = response?.member[0].cestamp;
    if (id && newCEStamp) {
      newRows = updateCellValue(newRows, id, 'cestamp', newCEStamp);
    }
    if (!hasChildren(currentRow)) {
      return newRows;
    }
    await Promise.all(
      currentRow[subItemsField].map(async (children) => {
        newRows = await actualEnoviaRollup(type, children, newRows, oldRows);
      })
    );
    return newRows;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

const getRollupField = (row, rollupOrder) => {
  let field;
  for (const cField of rollupOrder) {
    const fieldValue = row[cField];
    if (fieldValue !== 0) {
      field = cField;
      break;
    }
  }
  return field;
};

/**
 * takes Actual_mass first and if non zero returns that field,
 * otherwise goes to next and continues
 * @param {row} row
 * @param {Fields in which rollup should be done} rollupOrder
 * @returns
 */
const sumMultiFieldChildRows = (row, rollupOrder) => {
  let pField = getRollupField(row, rollupOrder);
  pField = pField || rollupOrder[0];
  let newValueParent = row.endItem ? row[pField] : 0;

  row[subItemsField].forEach((children) => {
    let field = getRollupField(children, rollupOrder);
    field = field || rollupOrder[0];
    const childval = hasChildren(children)
      ? sumMultiFieldChildRows(children, rollupOrder)
      : children.endItem
      ? children[field]
      : 0;

    newValueParent += Number.isNaN(childval) ? 0 : childval;
  });
  return newValueParent;
};

const sumMultiFieldChildRowsV2 = (row, rollupOrder) => {
  let newValueParent = 0;
  row[subItemsField].forEach((children) => {
    let field = getRollupField(children, rollupOrder);
    field = field || rollupOrder[0];
    let currentVal = children[field];
    if (hasChildren(children)) {
      const grandChildSum = sumMultiFieldChildRowsV2(children, rollupOrder);
      currentVal = currentVal > grandChildSum ? currentVal : grandChildSum;
    }
    newValueParent += Number.isNaN(currentVal) ? 0 : currentVal;
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
 * @param {data rows} newRows
 * @param {field to rollup} field
 * @returns
 */
export const rollupBestAvailable = (id, newRows, rollupOrder, isV2) => {
  try {
    const row = id ? findRowById(newRows, id) : '';

    let field = getRollupField(row, rollupOrder);
    field = field || rollupOrder[0];
    let rollUpValue = row.endItem ? row[field] : 0;

    if (row && hasChildren(row)) {
      rollUpValue = isV2
        ? sumMultiFieldChildRowsV2(row, rollupOrder)
        : sumMultiFieldChildRows(row, rollupOrder);
    }
    return rollUpValue;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getRollupBestAvailable = (newRows) => {
  const rollupOrder = getRollupOrder();
  const { id } = newRows[0];
  const rollupVal = rollupBestAvailable(id, newRows, rollupOrder, false);
  return rollupVal;
};

export const getRollupBestAvailableV2 = (newRows) => {
  const rollupOrder = getRollupOrder();
  const rootRow = newRows[0];
  const { id } = rootRow;
  let field = getRollupField(rootRow, rollupOrder);
  field = field || rollupOrder[0];

  const childRollUpValue = rollupBestAvailable(id, newRows, rollupOrder, true);
  const parentRollUpValue = rootRow[field];

  const rollUpValue =
    parentRollUpValue > childRollUpValue ? parentRollUpValue : childRollUpValue;

  return rollUpValue;
};

export const calculate = async (rows, attribute) => {
  const currentRows = rows;
  const rootRow = rows[0];
  let param;
  let paramValue = rootRow[attribute];
  switch (attribute) {
    case ACTUAL_MASS:
      param = 'sumActualMass';
      break;
    case CALCULATED_MASS:
      param = 'sumCalculatedMass';
      break;
    case ESTIMATED_MASS:
      param = 'sumEstimatedMass';
      break;
    case BEST_AVAILABLE:
      param = 'bestAvailable';
      paramValue = getRollupBestAvailable(currentRows);
      break;
    case BEST_AVAILABLE_V2:
      param = 'bestAvailableV2';
      paramValue = getRollupBestAvailableV2(currentRows);
      break;
    default:
      break;
  }
  await updateTypeObjectById(rootRow.id, param, paramValue);
  toast.info(`UPDATED ${param} with value ${paramValue}`);
};
