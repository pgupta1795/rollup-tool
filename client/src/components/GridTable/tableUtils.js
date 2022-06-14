import * as Props from "./props";
import * as Api from "../../utils/Api";
import { authenticateTableData } from "../Auth/RequireAuth";
import StorageConstants from "../../utils/StorageConstants";
import * as ServiceUtils from "../../utils/ServiceUtils";
import { extendDataItem, mapTree } from "@progress/kendo-react-treelist";

export const subItemsField = "children";
export const DATA_ITEM_KEY = "id";

export const getRows = (response, headerKeys, customHeaderKeys) => {
  const rows = [];
  if (response.member && response.member.length > 0) {
    response?.member.forEach(({ id, cestamp, ...objectDetail }) => {
      const singleRow = {
        key: `${id + Math.random()}`,
        id: id,
        cestamp: cestamp,
      };
      headerKeys.forEach((header) => {
        if (objectDetail.hasOwnProperty(header)) {
          const value = objectDetail[header];
          singleRow[header] = value ? value : "-";
        }
      });
      if (customHeaderKeys)
        addCustomAttributesData(singleRow, objectDetail, customHeaderKeys);
      rows.push(singleRow);
    });
  }
  return rows;
};

const addCustomAttributesData = (singleRow, objectDetail, customHeaderKeys) => {
  customHeaderKeys.forEach((customHeaderKey) => {
    const keyIdentifiers = Props.KEY_IDENTIFIER.split(",");
    keyIdentifiers.forEach((keyIdentifier) => {
      const identifier = objectDetail[keyIdentifier];
      singleRow[customHeaderKey] = identifier.hasOwnProperty(customHeaderKey)
        ? identifier[customHeaderKey]
        : null;
    });
  });
};
export const formatChildData = (
  children,
  headerKeys,
  customHeaderKeys,
  parentId
) => {
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
};

export const getChildById = async (type, spaceUrl, id) => {
  try {
    const response = await Api.getAllChildren(type, spaceUrl, id);
    const headerKeys = Props.DEFAULT_COLUMN_KEYS;

    if (authenticateTableData(response)) {
      const allChildren = formatChildData(response.children, headerKeys, id);
      return allChildren;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getHeaders = (response, headerKeys) => {
  const headers = [];
  let { id, ...labels } = response.nlsLabel;
  Object.keys(labels).forEach((key) => {
    if (labels.hasOwnProperty(key) && !headerKeys.includes(key)) {
      const label = labels[key];
      if (label) {
        headers.push({
          title: label,
          dataIndex: key,
          key: key,
        });
        headerKeys.push(key);
      }
    }
  });
  return headers;
};

export const getSearchBody = (type, spaceUrl, top, skip, name) => {
  const { SEARCH_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (SEARCH_ENDPOINT && spaceUrl) {
    const splitted = SEARCH_ENDPOINT.split("?");
    const endpoint =
      splitted < 1
        ? SEARCH_ENDPOINT
        : SEARCH_ENDPOINT.replace("{}", name || "")
            .replace("{}", top || "")
            .replace("{}", skip);
    const data = {
      BASE_URL: spaceUrl,
      GET_ENDPOINT: endpoint,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Cookie: localStorage.getItem(StorageConstants.Cookies),
        ENO_CSRF_TOKEN: localStorage.getItem(StorageConstants.CSRF_TOKEN),
        SecurityContext: localStorage.getItem(StorageConstants.Preferred),
      },
    };
    return data;
  }
};

export const getChildrenBody = (type, spaceUrl, id) => {
  const { GET_ENDPOINT, CHILD_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (GET_ENDPOINT && CHILD_ENDPOINT && spaceUrl && id) {
    const data = {
      ID: id,
      BASE_URL: spaceUrl,
      GET_ENDPOINT: GET_ENDPOINT,
      CHILD_ENDPOINT: CHILD_ENDPOINT,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Cookie: localStorage.getItem(StorageConstants.Cookies),
        ENO_CSRF_TOKEN: localStorage.getItem(StorageConstants.CSRF_TOKEN),
        SecurityContext: localStorage.getItem(StorageConstants.Preferred),
      },
    };
    return data;
  }
};

export const flatten = (root, flat = []) => {
  const { children, ...restElements } = root;
  flat.push(restElements);

  if (Array.isArray(children)) {
    children.forEach((child) => flatten(child, flat));
  }
};

export const isNotEditable = (dataItem) => {
  return dataItem.children || dataItem.state === "RELEASED";
};

//call PATCH for row object to update enovia attributes
//use response of patch to update cestamp and updated attribute values to pass to GridTable
// RECUSRISVER(parent)
//call PATCH for parent of row object to update enovia attributes and check if cell is numeric rollup values from child
//ex- COST = Parent cost - prev cost of row object + new cost of row object
//OR take cost of all the child rows and sum it up
//call RECUSRISVER again(parent.parent)

export const getUpdateObjectBody = (type, { id, ...selectedRow }) => {
  let payload;
  const { POST_ENDPOINT } = ServiceUtils.getTypeSettings(type);
  if (type === "VPMReference") {
    payload = getVPMReferencePayload(type, selectedRow);
  }

  if (POST_ENDPOINT && id && payload) {
    const BASE_URL = localStorage.getItem(StorageConstants.SPACE3d);
    const url = BASE_URL + POST_ENDPOINT.replace("{}", id);
    const data = {
      URL: url,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Cookie: localStorage.getItem(StorageConstants.Cookies),
        ENO_CSRF_TOKEN: localStorage.getItem(StorageConstants.CSRF_TOKEN),
        SecurityContext: localStorage.getItem(StorageConstants.Preferred),
      },
      payload: payload,
    };
    return data;
  }
  console.error("Error : Unable to create payload to update object attributes");
};

const getVPMReferencePayload = (type, selectedRow) => {
  const customAttributesIdentifier = Props.KEY_IDENTIFIER;
  const customAttributes = { [customAttributesIdentifier]: {} };
  const { cestamp, title, description } = selectedRow;

  ServiceUtils.getCustomAttributeNames(type)?.forEach((attr) => {
    const attrName = ServiceUtils.getCustomAttributeDBName(type, attr);
    customAttributes[customAttributesIdentifier][attrName] = selectedRow[attr];
  });
  return {
    cestamp,
    title,
    description,
    [customAttributesIdentifier]: customAttributes[customAttributesIdentifier],
  };
};

export const updateAttributes = async (type, selectedRow, newRows) => {
  const response = await Api.updateObject(type, selectedRow);
  if (authenticateTableData(response)) {
    const id = response?.member[0].id;
    const newCEStamp = response?.member[0].cestamp;
    if (id && newCEStamp) {
      newRows = updateCellValue(newRows, id, "cestamp", newCEStamp);
    }
    const parentRow = findRowById(newRows, selectedRow?.parent);
    if (parentRow) {
      newRows = await updateAttributes(type, parentRow, newRows);
    }
    return newRows;
  }
};

/**
 * updates the newValue to itself and summating it till parent level
 * @param {*} id
 * @param {*} newRows
 * @param {*} field
 * @returns
 */
export const rollUpAttribute = (id, newRows, field) => {
  const row = id ? findRowById(newRows, id) : "";
  if (row) {
    let newValueParent = 0;
    if (row[subItemsField]) {
      row[subItemsField].forEach((children) => {
        const childval = Number(children[field]);
        newValueParent += isNaN(childval) ? 0 : childval;
      });
      newRows = updateCellValue(newRows, id, field, newValueParent);
    }
    newRows = rollUpAttribute(row?.parent, newRows, field);
  }
  return newRows;
};

export const getUpdatedRows = (event, state) => {
  const field = event.field;
  const newValue = event.value;
  let newRows = updateCellValue(state.data, event.dataItem.id, field, newValue);
  const customKeys = ServiceUtils.getCustomAttributeNames(event.dataItem?.type);
  if (customKeys?.includes(field)) {
    newRows = rollUpAttribute(event.dataItem.parent, newRows, field);
  }
  return newRows;
};
/**
 * Updates cell value in the table and returns newly updated rows
 * @param {*} rows
 * @param {*} id
 * @param {*} field
 * @param {*} newValue
 * @returns
 */
export const updateCellValue = (rows, id, field, newValue) => {
  return mapTree(rows, subItemsField, (item) =>
    item.id === id
      ? extendDataItem(item, subItemsField, {
          [field]: newValue,
        })
      : item
  );
};

/**
 * returns the row after matching id with all the rows ids
 * @param {} rows
 * @param {} id
 * @returns
 */
export const findRowById = (rows, id) => {
  let validRow;

  for (let index = 0; index < rows?.length; index++) {
    const row = rows[index];
    if (row?.id === id) {
      validRow = row;
      break;
    }
    if (row?.children) validRow = findRowById(row?.children, id);
  }
  return validRow;
};
