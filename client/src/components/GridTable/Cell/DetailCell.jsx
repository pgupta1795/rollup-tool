import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Stack } from '@mui/material';
import ChipField from '../../Common/ChipField';
import FlexBox from '../../Common/FlexBox';
import { getAttributeLabel } from '../../../utils/ServiceUtils';

const DetailCell = ({ dataItem, field }) => {
  const cellData = dataItem[field];
  const { type, title, state, description, ...attributes } =
    JSON.parse(cellData);
  const attrElement = Object.keys(attributes)
    .filter((attr) => attr !== 'expanded' && attr !== 'inEdit')
    .map((key) => {
      const val = attributes[key];
      return <ChipField label={getAttributeLabel(key)} value={val} key={key} />;
    });
  const element = (
    <FlexBox>
      <Stack direction="column">
        <ChipField label="Title" value={title} />
        <ChipField label="Description" value={description} />
        <ChipField label="Type" value={type} />
        <ChipField label="State" value={state} />
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack direction="column" sx={{ ml: 1 }}>
        {attrElement}
      </Stack>
    </FlexBox>
  );

  return (
    <td
      colSpan="1"
      aria-selected="false"
      role="gridcell"
      className="table-column action-detail-column"
    >
      {element}
    </td>
  );
};

DetailCell.propTypes = {
  dataItem: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};
export default DetailCell;
