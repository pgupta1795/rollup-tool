import {
  TreeListTextFilter,
  TreeListTextEditor,
  TreeListNumericEditor,
  TreeListBooleanEditor,
} from '@progress/kendo-react-treelist';
import LinkCell from './Cell/LinkCell';
import * as ServiceUtils from '../../utils/ServiceUtils';
import RollupCell from './Cell/RollupCell';

export const DEFAULT_COLUMN_KEYS = [
  'type',
  'name',
  'revision',
  'state',
  'title',
  'description',
  'owner',
  'created',
  'modified',
];

export const DEFAULT_COLUMNS = [
  {
    field: 'type',
    title: 'Type',
    width: '7%',
    show: false,
  },
  {
    field: 'name',
    title: 'Name',
    width: '15%',
    show: false,
  },
  {
    field: 'title',
    title: 'Title',
    width: '15%',
    filter: TreeListTextFilter,
    editCell: TreeListTextEditor,
    cell: LinkCell,
  },
  {
    field: 'revision',
    title: 'Revision',
    width: '5%',
  },
  {
    field: 'state',
    title: 'State',
    width: '5%',
  },
  {
    field: 'description',
    title: 'Description',
    filter: TreeListTextFilter,
    editCell: TreeListTextEditor,
    width: '13%',
  },
  {
    field: 'owner',
    title: 'Owner',
    width: '10%',
  },
  {
    field: 'created',
    title: 'Created Date',
    width: '10%',
    format: '{0:d}',
  },
  {
    field: 'modified',
    title: 'Modified Date',
    width: '10%',
    format: '{0:d}',
  },
];

export const KEY_IDENTIFIER = 'dseno:EnterpriseAttributes';
export const OBJECT_COLUMNS = (type) => {
  const customAttributes = ServiceUtils.getMassAttributeKeys(type);
  const customColumns = customAttributes.map((customAttribute) => {
    const displayTitle = customAttribute.Label;
    const attribute = customAttribute.Attribute;
    return {
      field: attribute,
      title: displayTitle,
      width: '20%',
      editCell: TreeListNumericEditor,
      cell: RollupCell,
    };
  });
  const dbColumns = [
    {
      field: 'usage',
      title: 'Usage',
      width: '10%',
      expandable: true,
    },
    {
      field: 'endItem',
      title: 'Is End Item',
      width: '10%',
      editCell: TreeListBooleanEditor,
    },
  ];
  return [
    ...dbColumns,
    ...DEFAULT_COLUMNS.slice(0, 3),
    ...customColumns,
    ...DEFAULT_COLUMNS.slice(3, -2),
  ];
};

export const DB_COLUMN_KEYS = ['usage', 'endItem'];
