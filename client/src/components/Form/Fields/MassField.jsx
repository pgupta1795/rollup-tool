import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { roundOff } from '../../../utils/CommonUtils';
import { getAttributeTolerance } from '../../../utils/ServiceUtils';

const MassField = ({ attribute, children, value }) => {
  const tolerance = getAttributeTolerance(attribute);
  const upperLimitValue = value
    ? Number(value) + Number((value * tolerance.Upper) / 100)
    : null;
  const lowerLimitValue = value
    ? Number(value) + Number((value * tolerance.Lower) / 100)
    : null;

  return (
    <Stack direction="column">
      <div className="flex-column-box">
        <div className="flex-column-box">
          <ArrowDropUp color="success" />
          <Typography
            component="span"
            color="text.secondary"
            variant="caption"
            sx={{ ml: 0.5 }}
          >
            <strong>{`Upper (${tolerance.Upper}%)`}</strong>
          </Typography>
        </div>
        <Typography component="span" color="green" variant="caption">
          <strong>{roundOff(Number(upperLimitValue))}</strong>
        </Typography>
      </div>
      {children}
      <div className="flex-column-box">
        <div className="flex-column-box">
          <ArrowDropDown color="error" />
          <Typography component="span" color="text.secondary" variant="caption">
            <strong>{`Lower (${tolerance.Lower}%)`}</strong>
          </Typography>
        </div>
        <Typography
          component="span"
          color="red"
          variant="caption"
          sx={{ ml: 0.5 }}
        >
          <strong>{roundOff(Number(lowerLimitValue))}</strong>
        </Typography>
      </div>
    </Stack>
  );
};

MassField.defaultProps = {
  value: 0,
};

MassField.propTypes = {
  attribute: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  value: PropTypes.any,
};
export default MassField;
