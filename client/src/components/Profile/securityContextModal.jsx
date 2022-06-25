import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  NativeSelect,
} from '@mui/material';
import PropTypes from 'prop-types';
import StorageConstants from '../../helper/StorageConstants';

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  m: 'auto',
  justifyContent: 'center',
};

const SecurityContextModal = ({ open, setOpen }) => {
  const [preferred, setPreferred] = React.useState(
    localStorage.getItem(StorageConstants.Preferred)
  );
  const securityContexts = localStorage.getItem(
    StorageConstants.SecurityContexts
  );
  const allmenuContexts = [];
  securityContexts?.split(',').forEach((securityContext) => {
    allmenuContexts.push(
      <option key={securityContext} value={securityContext}>
        {securityContext}
      </option>
    );
  });

  const handleChange = (event) => {
    localStorage.setItem(StorageConstants.Preferred, event.target.value);
    setPreferred(event.target.value);
    setOpen(false);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Security Context</DialogTitle>
      <DialogContent>
        <DialogContentText>Choose preferred Security Context</DialogContentText>
        <Box sx={style} noValidate component="form">
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <NativeSelect
              autoFocus
              value={preferred}
              onChange={handleChange}
              label="Security Contexts"
              inputProps={{
                name: 'Security Contexts',
                id: 'Security Contexts',
              }}
            >
              {allmenuContexts}
            </NativeSelect>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

SecurityContextModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default SecurityContextModal;
