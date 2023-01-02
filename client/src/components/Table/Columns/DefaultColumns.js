import React from 'react';
import LinkCell from '../Cell/LinkCell';
import DateFilter from '../Filters/DateFilter';

export const DEFAULT_COLUMNS = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 200,
    attributeType: 'default', // to check if attribute is a 3dx property or 3dx custom attribute or mongodb attribute
    Cell: (props) => <LinkCell {...props} />,
    muiTableBodyCellEditTextFieldProps: {
      multiline: true,
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    enableColumnActions: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    size: 120,
    attributeType: 'default',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    muiTableBodyCellProps: ({ cell }) => ({
      onChange: () => {
        alert(cell.getValue(), cell.id);
      },
    }),
    enableEditing: false,
    attributeType: 'default',
    size: 200,
  },
  {
    accessorKey: 'revision',
    header: 'Revision',
    enableColumnActions: false,
    enableEditing: false,
    enableColumnFilter: false,
    attributeType: 'default',
    size: 80,
  },
  {
    accessorKey: 'state',
    header: 'State',
    enableEditing: false,
    attributeType: 'default',
    size: 120,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    attributeType: 'default',
    size: 150,
    muiTableBodyCellEditTextFieldProps: {
      multiline: true,
    },
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    enableColumnActions: false,
    enableEditing: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    attributeType: 'default',
    size: 100,
  },
  {
    accessorFn: (row) => new Date(row.created),
    id: 'created',
    header: 'Created Date',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
    Filter: (props) => <DateFilter {...props} />,
    enableEditing: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    attributeType: 'default',
  },
  {
    accessorFn: (row) => new Date(row.modified),
    id: 'modified',
    header: 'Modified Date',
    filterFn: 'lessThanOrEqualTo',
    sortingFn: 'datetime',
    Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
    Filter: (props) => <DateFilter {...props} />,
    enableEditing: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    attributeType: 'default',
  },
];

export const KEY = (column) => column.accessorKey || column.id;
