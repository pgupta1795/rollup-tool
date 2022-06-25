/* eslint-disable react/prop-types */
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Skeleton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function MyCommandCell(
  enterEdit,
  save,
  cancel,
  editField,
  uploadSpecification
) {
  const [editMode, setEditMode] = React.useState(false);

  return class extends React.Component {
    render() {
      const { dataItem } = this.props;
      return dataItem[editField] ? (
        <td
          colSpan="1"
          aria-colindex="10"
          aria-selected="false"
          role="gridcell"
          data-grid-col-index="9"
          className="table-column"
        >
          {editMode ? (
            <Skeleton />
          ) : (
            <>
              <IconButton
                aria-label="table edit save"
                onClick={async () => {
                  setEditMode(true);
                  await save(dataItem);
                  setEditMode(false);
                }}
                size="small"
                color="primary"
                title="Save Changes"
              >
                <EditOffIcon color="inherit" />
              </IconButton>
              <IconButton
                aria-label="table edit discard"
                onClick={() => cancel(dataItem)}
                size="small"
                color="primary"
                title="Discard Changes"
              >
                <CancelIcon color="inherit" />
              </IconButton>
            </>
          )}
        </td>
      ) : (
        <td
          colSpan="1"
          aria-colindex="10"
          aria-selected="false"
          role="gridcell"
          data-grid-col-index="9"
          className="table-column"
        >
          <IconButton
            aria-label="table edit"
            onClick={() => enterEdit(dataItem)}
            size="small"
            color="primary"
            title="Edit table Column"
          >
            <EditIcon color="inherit" />
          </IconButton>
          <IconButton
            aria-label="table upload specification"
            onClick={() => uploadSpecification(dataItem)}
            size="small"
            color="primary"
            title="Upload specification"
          >
            <FileUploadIcon color="inherit" />
          </IconButton>
        </td>
      );
    }
  };
}
