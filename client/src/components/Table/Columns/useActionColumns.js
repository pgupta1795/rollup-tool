import React from 'react';
import DetailCell from '../Cell/DetailCell';
import LinkCell from '../Cell/LinkCell';
import DateFilter from '../Filters/DateFilter';

export default () => [
  {
    accessorKey: 'name',
    header: 'Name',
    enableEditing: false,
    Cell: (props) => <LinkCell {...props} />,
    attributeType: 'db',
    size: 100,
  },
  {
    accessorKey: 'objectOldDetails',
    header: 'Before',
    enableEditing: false,
    Cell: (props) => <DetailCell {...props} />,
    attributeType: 'db',
    size: 250,
  },
  {
    accessorKey: 'objectNewDetails',
    header: 'After',
    enableEditing: false,
    Cell: (props) => <DetailCell {...props} />,
    attributeType: 'db',
    size: 250,
  },
  {
    accessorFn: (row) => new Date(row.createdAt),
    id: 'createdAt',
    header: 'Action Date',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
    Filter: (props) => <DateFilter {...props} />,
    enableEditing: false,
    attributeType: 'db',
    size: 100,
  },
];
