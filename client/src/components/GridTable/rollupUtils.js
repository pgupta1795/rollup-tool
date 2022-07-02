import _ from 'lodash';
import { authenticateTableData } from '../../utils/CommonUtils';
import * as Api from '../../helper/Api';
import * as ServiceUtils from '../../utils/ServiceUtils';
import toast from '../../helper/toast';
import {
  subItemsField,
  findRowById,
  updateCellValue,
  createAction,
} from './tableUtils';

export const getRollupOrder = () => {
  const typeSettings = ServiceUtils.getTypeSettings('VPMReference');
  return typeSettings.ROLLUP_ORDER;
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
  let newValueParent = 0;
  row[subItemsField].forEach((children) => {
    const childval = Number(children[field]);
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
    row[subItemsField].forEach((children) => {
      newRows = rollUpFromParent(children.id, newRows, field);
    });
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

const hasChildren = (row) =>
  row[subItemsField] && row[subItemsField].length > 0;

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
