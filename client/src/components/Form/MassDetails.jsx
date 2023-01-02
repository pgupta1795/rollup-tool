import React from 'react';
import useTypeObjectById from '../../hooks/useTypeObjectById';
import { roundOff } from '../../utils/CommonUtils';
import { getMassAttributeDetails } from '../../utils/ServiceUtils';
import ChipField from '../Common/ChipField';
import DetailsContainer from './Container/DetailsContainer';
import MassField from './Fields/MassField';

const MassDetails = () => {
  const { objectDBData, isLoading } = useTypeObjectById();

  return (
    <DetailsContainer objectDBData={objectDBData} isLoading={isLoading}>
      {getMassAttributeDetails().map(
        ({ Attribute: attr, Label: label, DB_Name: dbName }) => {
          const attrVal = objectDBData && objectDBData[dbName]?.$numberDecimal;
          return (
            <MassField
              attribute={attr}
              value={attrVal}
              key={`${attr} ${attrVal}`}
            >
              <ChipField
                label={`Sum ${label}`}
                variant="subtitle1"
                value={roundOff(Number(attrVal)) || ''}
              />
            </MassField>
          );
        }
      )}
    </DetailsContainer>
  );
};

export default MassDetails;
