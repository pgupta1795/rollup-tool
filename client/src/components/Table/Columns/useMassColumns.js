import React from 'react';
import { useSelector } from 'react-redux';
import { getCacheCellColors } from '../../../features/cache/cacheSlice';
import { shadeColor } from '../../../utils/CommonUtils';
import { getMassAttributeDetails } from '../../../utils/ServiceUtils';
import CustomAttribute from '../Header/CustomAttribute';
import { DEFAULT_COLUMNS } from './DefaultColumns';
import UsageEndItemColumns from './UsageEndItemColumns';

export default (type) => {
  const cellColors = useSelector(getCacheCellColors);
  const customColumns = getMassAttributeDetails(type).map(
    ({ Attribute: attribute, Label: label }) => ({
      accessorKey: attribute,
      id: attribute, // id is still required when using accessorFn instead of accessorKey
      header: label,
      attributeType: 'dseno:EnterpriseAttributes',
      Header: (props) => <CustomAttribute {...props} />,
      muiTableBodyCellEditTextFieldProps: ({ cell: { row, column } }) => {
        const oid = row.original.id;
        const rowObj = cellColors.find((cColor) => cColor.id === oid);
        const editColor = rowObj ? rowObj[column.id]?.color : null;
        return {
          type: 'number',
          InputProps: {
            inputProps: {
              style: {
                color: editColor || 'inherit',
                fontWeight: '600',
                background: shadeColor(editColor, 100),
              },
            },
          },
        };
      },
      muiTableBodyCellProps: ({ cell: { row, column } }) => {
        const oid = row.original.id;
        const rowObj = cellColors.find((cColor) => cColor.id === oid);
        const color = rowObj ? rowObj[column.id]?.color : null;
        const show = rowObj ? rowObj[column.id]?.show : false;
        if (!show)
          return {
            sx: {
              fontWeight: '600',
            },
          };
        return {
          sx: {
            color,
            fontWeight: '600',
            background: shadeColor(color, 100),
          },
        };
      },
    })
  );

  return [
    ...DEFAULT_COLUMNS.slice(0, 1),
    ...customColumns,
    ...UsageEndItemColumns,
    ...DEFAULT_COLUMNS.slice(1),
  ];
};
