import React from 'react';
import Constants from '../../../helper/Constants';
import EndItemCell from '../Cell/EndItemCell';

const UsageEndItemColumns = [
  {
    accessorKey: 'usage',
    header: 'Usage',
    enableColumnActions: false,
    enableEditing: false,
    enableColumnFilter: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    attributeType: 'db',
    size: 80,
  },
  {
    accessorFn: (row) => Boolean(row.endItem),
    id: Constants.ENDITEM,
    header: 'Is End Item',
    Cell: (props) => <EndItemCell {...props} />,
    enableEditing: false,
    enableColumnActions: false,
    enableColumnFilter: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    attributeType: 'db',
    size: 100,
  },
];

export default UsageEndItemColumns;
