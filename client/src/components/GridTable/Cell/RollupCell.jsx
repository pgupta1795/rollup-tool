import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { rowEditColor } from '../../../Styles/tableStyle';
import { ObjectContext } from '../../../hooks/contexts';

const getRollupFields = (object) => {
  if (!object || !object?.state) {
    return undefined;
  }
  const { rollup } = object.state;
  return rollup;
};

const RollupCell = (props) => {
  const { dataItem, field } = props;
  const cellData = dataItem[field];
  const object = useContext(ObjectContext);
  const rollupFields = getRollupFields(object);

  const isInEditMode = () => {
    if (!object || !object?.state) {
      return false;
    }
    const { inEdit } = object.state;
    return inEdit.length > 0;
  };

  const getColor = () => {
    let colorClass;
    const { children } = dataItem;
    colorClass = children ? rowEditColor.PARENT : rowEditColor.CHILDREN;
    if (!cellData || _.isNull(cellData)) colorClass = rowEditColor.ERROR;
    return colorClass;
  };

  const getColorClassName = () => {
    if (!isInEditMode()) {
      if (rollupFields?.length > 0 && rollupFields.includes(field))
        return getColor();
      return rowEditColor.DEFAULT;
    }
    return getColor();
  };

  return (
    <td
      colSpan="1"
      aria-selected="false"
      role="gridcell"
      className={getColorClassName()}
    >
      {cellData}
    </td>
  );
};

RollupCell.propTypes = {
  dataItem: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};
export default RollupCell;
