import _ from 'lodash';
import { createAction as createActionApi } from '../api/ActionsApi';
import { updateObject } from '../api/EnoviaApi';
import { createTypeObject, updateTypeObjectById } from '../api/TypeObjectApi';
import { KEY } from '../components/Table/Columns/DefaultColumns';
import Constants from '../helper/Constants';
import toast from '../helper/toast';
import { authenticateTableData } from './CommonUtils';
import { TYPES } from './ServiceUtils';

export const subItemsField = 'subRows';

export const parentField = 'parent';

export const filterFunctions = {
  customGlobalSearch: (row, id1, filterValue) =>
    row.getValue(id1).startsWith(filterValue),
};

export const formatRows = (response, columns) => {
  const rows = [];
  const details = response?.member;
  if (!details || details?.length === 0) return rows;

  details.forEach(({ id, cestamp, ...detail }) => {
    const singleRow = {
      key: `${id + Math.random()}`,
      id,
      cestamp,
    };
    columns?.forEach(({ attributeType: attrType, ...column }) => {
      const columnKey = KEY(column);
      if (attrType !== 'db' && attrType !== 'default') {
        const customAttrDetails = detail[attrType];
        if (
          customAttrDetails &&
          Object.prototype.hasOwnProperty.call(customAttrDetails, columnKey)
        ) {
          singleRow[columnKey] = Number(customAttrDetails[columnKey]) || 0;
        }
      }
      if (Object.prototype.hasOwnProperty.call(detail, columnKey)) {
        singleRow[columnKey] = detail[columnKey];
      }
    });
    rows.push(singleRow);
  });
  return rows;
};

export const formatChildRows = (children, columns, parentId) => {
  try {
    return children?.map((grandChildrenData) => {
      const { data } = grandChildrenData;
      const grandChildren = grandChildrenData.children;
      const rowsData = formatRows(data, columns);
      if (!rowsData) return null;
      const childData = rowsData[0];
      childData.parent = parentId;
      childData[subItemsField] =
        formatChildRows(grandChildren, columns, childData.id) || [];
      return childData;
    });
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

/**
 * returns the row after matching id with all the rows ids
 * @param {} rows
 * @param {} id
 * @returns
 */
export const findRowById = (rows, id) => {
  try {
    let validRow;
    for (let index = 0; index < rows?.length; index += 1) {
      const row = rows[index];
      if (row?.id === id) {
        validRow = row;
        return validRow;
      }
      if (row && row[subItemsField])
        validRow = findRowById(row[subItemsField], id);
    }
    return validRow;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const createAction = async (newRow, oldRows) => {
  try {
    const { id } = newRow;
    const oldRow = findRowById(oldRows, id);
    if (oldRow && !_.isEqual(oldRow, newRow))
      await createActionApi(id, newRow, oldRow);
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

/**
 * Updates cell value in the table and returns newly updated rows
 * @param {*} rows
 * @param {*} id
 * @param {*} field
 * @param {*} newValue
 * @returns
 */
export const updateTableCell = (rows, id, field, newValue) => {
  if (id === rows.id) {
    rows[field] = newValue;
  }
  for (const k in rows) {
    if (typeof rows[k] === 'object') {
      updateTableCell(rows[k], id, field, newValue);
    }
  }
};

/**
 * Updates entire row in the table and returns newly updated rows
 * @param {*} rows
 * @param {*} id
 * @param {*} field
 * @param {*} newValue
 * @returns
 */
export const updateTableRow = (rows, newRow) => {
  if (newRow.id === rows.id) {
    for (const k in rows) {
      if (Object.prototype.hasOwnProperty.call(rows, k)) {
        rows[k] = newRow[k];
      }
    }
  }
  for (const k in rows) {
    if (typeof rows[k] === 'object') {
      updateTableRow(rows[k], newRow);
    }
  }
};

/**
 * 1.) Creates object in mongodb database if not already present
 * 2.) Updates attribute values in enovia using webservice
 * 3.) Creates action if above things are success
 * 4.) Updates cestamp with a new value for the object after updation in enovia
 *
 * @param {selectedRow} selectedRow
 * @param {newRows} rows
 * @returns
 */
export const updateAttributes = async (selectedRow, rows, oldRows) => {
  try {
    const type = TYPES[0];
    updateTableRow(rows, selectedRow);
    await createTypeObject(type, selectedRow);
    const response = await updateObject(type, selectedRow);
    if (!authenticateTableData(response)) return rows;
    await createAction(selectedRow, oldRows);
    const id = response?.member[0].id;
    const newCEStamp = response?.member[0].cestamp;
    if (id && newCEStamp) updateTableCell(rows, id, 'cestamp', newCEStamp);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const hasChildren = (row) =>
  row && row[subItemsField] && row[subItemsField]?.length > 0;

export const hasParent = (row) => row && row[parentField]?.length > 0;

export const saveRelatedEndItem = async (newRows, id, field) => {
  try {
    if (!id) return;
    const row = findRowById(newRows, id);
    if (!hasChildren(row)) {
      if (!row.parent) return;
      const parentResponse = await updateTypeObjectById(
        row.parent,
        Constants.ENDITEM,
        false
      );
      console.log({ parentResponse });
      return;
    }

    await Promise.all(
      row &&
        row[subItemsField]?.map(async (children) => {
          const response = await updateTypeObjectById(
            children.id,
            Constants.ENDITEM,
            children[Constants.ENDITEM]
          );
          console.log({ response });
          saveRelatedEndItem(newRows, children.id, field);
        })
    );
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

/**
 *  If the End Item is set to "TRUE" on an assembly level (where Usage column = Assembly),
 *  then the child objects should automatically have  End Item set to "FALSE"
 *  ............
 *  If any 3DParts of an Assembly have End Item set to “TRUE” then the parent assembly should automatically have End Item set to “FALSE”
 * @param {*} newRows
 * @param {*} id
 * @param {*} field
 * @param {*} rowEndItem
 * @returns
 */
export const updateRelatedEndItem = (newRows, id, field, rowEndItem) => {
  try {
    if (!id) return;
    const row = findRowById(newRows, id);
    if (!hasChildren(row)) {
      if (!rowEndItem) return;
      updateTableCell(newRows, row?.parent, field, false);
      return;
    }
    row[subItemsField]?.forEach(({ id: childId }) => {
      if (rowEndItem) {
        updateTableCell(newRows, childId, field, false);
        updateRelatedEndItem(newRows, childId, field, false);
      }
    });
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getColumnsAndRows = (table) => {
  const allRowsData = table.getRowModel().rows.map((row) => row.original);
  const rows = allRowsData.filter((row) => !hasParent(row));
  if (!rows || rows.length === 0) {
    console.info('NO DATA TO EXPORT');
    return { columns: [], rows: [] };
  }
  const columns = table
    .getAllColumns()
    .filter((c) => Object.prototype.hasOwnProperty.call(rows[0], c.id));
  return { columns, rows };
};
