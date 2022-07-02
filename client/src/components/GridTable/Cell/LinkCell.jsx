import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Paths from '../../../helper/Paths';
import { rowEditColor } from '../../../Styles/tableStyle';

const LinkCell = ({ dataItem, field }) => {
  const cellData = dataItem[field];
  const { id, type } = dataItem;
  const path = `${Paths.HOME}/${type}/${id}`;
  return (
    <td
      colSpan="1"
      aria-colindex="5"
      aria-selected="false"
      role="gridcell"
      data-grid-col-index="4"
      className={rowEditColor.DEFAULT}
    >
      <div className="link">
        <Link className="link" to={`../${path}`}>
          {cellData}
        </Link>
      </div>
    </td>
  );
};

LinkCell.propTypes = {
  dataItem: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};
export default LinkCell;
