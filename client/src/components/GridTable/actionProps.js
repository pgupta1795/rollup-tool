import DetailCell from './Cell/DetailCell';
import LinkCell from './Cell/LinkCell';

export const DATE_FORMAT = 'dd MMM, yyyy';

export const ACTION_COLUMNS = [
  {
    field: 'name',
    title: 'Object',
    width: '15%',
    cell: LinkCell,
  },
  {
    field: 'objectOldDetails',
    title: 'Before',
    cell: DetailCell,
    width: '25%',
  },
  {
    field: 'objectNewDetails',
    title: 'After',
    cell: DetailCell,
    width: '25%',
  },
  {
    field: 'createdAt',
    title: 'Action Date',
    width: '10%',
    format: `{0:${DATE_FORMAT}}`,
  },
];
