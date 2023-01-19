import TuneIcon from '@mui/icons-material/Tune';
import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { updateSettings } from '../api/SettingsApi';
import Submit from '../components/Button/Submit';
import Colors from '../helper/Colors';
import toast from '../helper/toast';
import formData from '../Settings.json';

const SettingsPage = () => {
  const [json, setJson] = useState(formData);

  const handleChange = (e) => {
    console.log(e.updated_src);
    setJson(e.updated_src);
  };

  const defaultProps = {
    // theme: getStoreTheme() === 'dark' ? 'monokai' : 'apathy:inverted',
    src: json,
    collapsed: 5, // true / false / 1 /2 / 3
    collapseStringsAfter: 15,
    displayObjectSize: false,
    enableClipboard: false,
    indentWidth: 4,
    displayDataTypes: false,
    iconStyle: 'triangle',
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await updateSettings(json);
      console.log(result);
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Typography variant="h4" fontWeight={600}>
        <TuneIcon />
        &nbsp;EDIT
      </Typography>
      <Container
        sx={{
          borderRadius: '1em',
          background: `linear-gradient(to right bottom,${Colors.THEME_MAIN},${Colors.THEME_LIGHT})`,
          fontWeight: 600,
          my: 2,
          p: 2,
          wordBreak: 'break-all',
        }}
      >
        <ReactJson
          {...defaultProps}
          onAdd={handleChange}
          onEdit={handleChange}
          onDelete={false}
        />
      </Container>
      <Submit onClick={submit} fullWidth>
        <Typography variant="h5" fontWeight={600}>
          Update
        </Typography>
      </Submit>
    </Container>
  );
};

export default SettingsPage;
