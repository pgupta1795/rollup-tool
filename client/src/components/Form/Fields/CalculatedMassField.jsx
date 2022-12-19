import PropTypes from 'prop-types';
import React from 'react';
import { roundOff } from '../../../utils/CommonUtils';
import ChipField from '../../Common/ChipField';
import MassField from './MassField';

const CalculatedMassField = ({ objectDBData }) => (
  <MassField
    attribute="Weight"
    value={objectDBData?.sumCalculatedMass?.$numberDecimal}
  >
    <ChipField
      label="Sum Calculated Mass"
      variant="subtitle1"
      value={
        roundOff(Number(objectDBData?.sumCalculatedMass?.$numberDecimal)) || ''
      }
    />
  </MassField>
);

CalculatedMassField.defaultProps = {
  objectDBData: null,
};

CalculatedMassField.propTypes = {
  objectDBData: PropTypes.object,
};
export default CalculatedMassField;
