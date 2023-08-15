import { Divider, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { getMassAttributeLabels } from '../../../utils/ServiceUtils';
import ChipField from '../../Common/ChipField';
import FlexBox from '../../Common/FlexBox';

const DetailCell = ({ cell, row }) => {
  const exclude = new Set([
    'cestamp',
    'type',
    'name',
    'revision',
    'state',
    'owner',
    'subRows',
    'created',
    'modified',
    'usage',
    'endItem',
  ]);
  const details = row.original[cell.column.id];
  if (!details) return 'NO DATA';
  const { title, description, ...attributes } = JSON.parse(details || '{}');

  return (
    <FlexBox>
      <Stack direction="column">
        <ChipField label="Title" value={title || ''} />
        <ChipField label="Description" value={description || ''} />
      </Stack>
      <Divider orientation="vertical" flexItem />
      <Stack direction="column" sx={{ ml: 1 }}>
        {Object.keys(attributes)
          .filter((el) => !exclude.has(el))
          .map((key) => (
            <ChipField
              label={getMassAttributeLabels(key) || key}
              value={attributes[key]}
              key={key}
            />
          ))}
      </Stack>
    </FlexBox>
  );
};

DetailCell.propTypes = {
  cell: PropTypes.any.isRequired,
  row: PropTypes.any.isRequired,
};
export default DetailCell;
