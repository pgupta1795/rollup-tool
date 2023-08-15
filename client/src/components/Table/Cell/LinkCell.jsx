import PropTypes from 'prop-types';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TYPES } from '../../../utils/ServiceUtils';

const LinkCell = ({ cell, row }) => {
  const { type } = useParams();
  const id = row?.original?.id;
  return (
    <Link className="link" to={`../type/${type || TYPES[0]}/${id}`}>
      {cell.getValue()}
    </Link>
  );
};

LinkCell.propTypes = {
  cell: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
};

export default LinkCell;
