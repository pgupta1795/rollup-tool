import { subItemsField } from './TableUtils';

export const flatten = (mData, result = []) => {
  mData.forEach((obj) => {
    if (!obj[subItemsField]) return result.push(obj);
    const el = { ...obj, ...{} };
    delete el[subItemsField];
    result.push(el);
    return flatten(obj[subItemsField], result);
  });
  return result;
};

const addLevel = (root, flat, level) => {
  const subRows = root[subItemsField];
  const el = { ...root, ...{} };
  delete el[subItemsField];
  flat.push({ ...root, level });
  if (Array.isArray(subRows)) {
    subRows.forEach((child) => addLevel(child, flat, level + 1));
  }
};

/**
 * flattens the rows and adds levels to the row depending on depth
 * @param {*} rows
 */
export const flattenWithLevel = (rows) => {
  const flatRows = [];
  rows.forEach((row) => {
    addLevel(row, flatRows, 0);
  });
  return flatRows;
};
