import * as React from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as ServiceUtils from '../helper/ServiceUtils';
import TypesCard from '../components/Card/typesCard';
import ActionsTable from '../components/TableContainer/ActionsTableContainer';

const HomePage = () => {
  const [value, setValue] = React.useState('actions');

  const allMenuItems = ServiceUtils.TYPES.map((type) => (
    <TypesCard type={type} key={type} />
  ));

  return (
    <Box component="div" className="roll-up-home">
      <TabContext value={value}>
        <TabList
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="actions" label="Actions" style={{ minWidth: '50%' }} />
          <Tab value="types" label="Types" style={{ minWidth: '50%' }} />
        </TabList>
        <TabPanel value="actions" className="full-width-height">
          <Box className="full-width-height">
            <ActionsTable type={null} />
          </Box>
        </TabPanel>
        <TabPanel value="types" className="full-width-height">
          <Box className="roll-up-types full-width-height">{allMenuItems}</Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default HomePage;
