import PropTypes from 'prop-types';
import React from 'react';
import { roundOff } from '../../../utils/CommonUtils';
import ChipField from '../../Common/ChipField';
import MassField from './MassField';

const ActualMassField = ({ objectDBData }) => (
  <MassField
    attribute="Actual_Weight"
    value={objectDBData?.sumActualMass?.$numberDecimal}
  >
    <ChipField
      label="Sum Actual Mass"
      variant="subtitle1"
      value={
        roundOff(Number(objectDBData?.sumActualMass?.$numberDecimal)) || ''
      }
    />
  </MassField>
);

ActualMassField.defaultProps = {
  objectDBData: null,
};

ActualMassField.propTypes = {
  objectDBData: PropTypes.object,
};
export default ActualMassField;
