import { extendDataItem, mapTree } from '@progress/kendo-react-treelist';
import * as Props from './props';
import { isEqual, authenticateTableData } from '../../utils/CommonUtils';
import * as Api from '../../helper/Api';
import toast from '../../helper/toast';

export const subItemsField = 'children';

export const DATA_ITEM_KEY = 'id';

const addCustomAttributesData = (singleRow, objectDetail, customHeaderKeys) => {
  customHeaderKeys.forEach((customHeaderKey) => {
    const keyIdentifiers = Props.KEY_IDENTIFIER.split(',');
    keyIdentifiers.forEach((keyIdentifier) => {
      const identifier = objectDetail[keyIdentifier];
      singleRow[customHeaderKey] = Object.prototype.hasOwnProperty.call(
        identifier,
        customHeaderKey
      )
        ? identifier[customHeaderKey]
        : null;
    });
  });
};

export const getRows = (response, headerKeys, customHeaderKeys) => {
  const rows = [];
  if (response.member && response.member.length > 0) {
    response?.member.forEach(({ id, cestamp, ...objectDetail }) => {
      const singleRow = {
        key: `${id + Math.random()}`,
        id,
        cestamp,
      };
      headerKeys.forEach((header) => {
        if (Object.prototype.hasOwnProperty.call(objectDetail, header)) {
          const value = objectDetail[header];
          singleRow[header] = value || '-';
        }
      });
      if (customHeaderKeys)
        addCustomAttributesData(singleRow, objectDetail, customHeaderKeys);
      rows.push(singleRow);
    });
  }
  return rows;
};

export const formatChildData = (
  children,
  headerKeys,
  customHeaderKeys,
  parentId
) => {
  try {
    const allChildren = [];
    children.forEach(({ data, children: grandChildren }) => {
      const rowsData = getRows(data, headerKeys, customHeaderKeys);
      if (rowsData) {
        const childData = rowsData[0];
        childData.parent = parentId;
        childData.children = formatChildData(
          grandChildren,
          headerKeys,
          customHeaderKeys,
          childData.id
        );
        allChildren.push(childData);
      }
    });
    return allChildren;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getChildById = async (type, spaceUrl, id) => {
  try {
    const response = await Api.getAllChildren(type, spaceUrl, id);
    const headerKeys = Props.DEFAULT_COLUMN_KEYS;
    let allChildren = null;
    if (authenticateTableData(response)) {
      allChildren = formatChildData(response.children, headerKeys, id);
    }
    return allChildren;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getHeaders = (response, headerKeys) => {
  try {
    const headers = [];
    const { id, ...labels } = response.nlsLabel;
    Object.keys(labels).forEach((key) => {
      if (
        Object.prototype.hasOwnProperty.call(labels, key) &&
        !headerKeys.includes(key)
      ) {
        const label = labels[key];
        if (label) {
          headers.push({
            title: label,
            dataIndex: key,
            key,
          });
          headerKeys.push(key);
        }
      }
    });
    return headers;
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
      if (row?.children) validRow = findRowById(row?.children, id);
    }
    return validRow;
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
export const updateCellValue = (rows, id, field, newValue) =>
  mapTree(rows, subItemsField, (item) =>
    item.id === id
      ? extendDataItem(item, subItemsField, {
          [field]: newValue,
        })
      : item
  );

export const flatten = (root, flat = []) => {
  try {
    const { children, ...restElements } = root;
    flat.push(restElements);

    if (Array.isArray(children)) {
      children.forEach((child) => flatten(child, flat));
    }
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const isNotEditable = (dataItem) =>
  dataItem.children || dataItem.state === 'RELEASED';

export const createAction = async (newRow, oldRows) => {
  try {
    const { id } = newRow;
    const oldRow = findRowById(oldRows, id);
    if (oldRow && !isEqual(oldRow, newRow))
      await Api.createAction(id, newRow, oldRow);
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
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
export const updateAttributes = async (type, selectedRow, newRows, oldRows) => {
  try {
    await Api.createTypeObject(type, selectedRow);
    const response = await Api.updateObject(type, selectedRow);
    if (authenticateTableData(response)) {
      await createAction(selectedRow, oldRows);
      const id = response?.member[0].id;
      const newCEStamp = response?.member[0].cestamp;
      if (id && newCEStamp) {
        newRows = updateCellValue(newRows, id, 'cestamp', newCEStamp);
      }
      return newRows;
    }
    return newRows;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

const getObject = (objectDetails) => {
  try {
    const {
      type,
      title,
      state,
      description,
      cestamp,
      name,
      revision,
      owner,
      ...attributes
    } = objectDetails;
    return {
      type,
      title,
      state,
      description,
      ...attributes,
    };
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const getObjectAttributes = (objectDetails) => {
  try {
    const {
      type,
      title,
      state,
      description,
      cestamp,
      name,
      revision,
      owner,
      ...attributes
    } = JSON.parse(objectDetails);
    return attributes;
  } catch (error) {
    console.error(error);
    toast.error(error);
    throw error;
  }
};

export const formatActionRows = (results) =>
  results.map((action) => {
    const { _id, createdAt, objectOldDetails, objectNewDetails } = action;
    const { name, state } = objectNewDetails;
    return {
      key: _id,
      _id,
      createdAt: new Date(createdAt),
      name,
      state,
      objectOldDetails: JSON.stringify(getObject(objectOldDetails)),
      objectNewDetails: JSON.stringify(getObject(objectNewDetails)),
    };
  });
