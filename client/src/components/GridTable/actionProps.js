import DetailCell from './Cell/DetailCell';

export const DATE_FORMAT = 'dd MMM, yyyy hh:mm';

export const ACTION_COLUMNS = [
  {
    field: 'name',
    title: 'Object',
    width: '15%',
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
