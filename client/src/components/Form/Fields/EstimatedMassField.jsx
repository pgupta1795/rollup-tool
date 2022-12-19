import PropTypes from 'prop-types';
import React from 'react';
import { roundOff } from '../../../utils/CommonUtils';
import ChipField from '../../Common/ChipField';
import MassField from './MassField';

const EstimatedMassField = ({ objectDBData }) => (
  <MassField
    attribute="Estimated_Weight"
    value={objectDBData?.sumEstimatedMass?.$numberDecimal}
  >
    <ChipField
      label="Sum Estimated Mass"
      variant="subtitle1"
      value={
        roundOff(Number(objectDBData?.sumEstimatedMass?.$numberDecimal)) || ''
      }
    />
  </MassField>
);

EstimatedMassField.defaultProps = {
  objectDBData: null,
};

EstimatedMassField.propTypes = {
  objectDBData: PropTypes.object,
};
export default EstimatedMassField;
