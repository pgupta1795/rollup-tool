import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const CustomTab = ({ defaultTab, tabsArray }) => {
  const [value, setValue] = React.useState(defaultTab);

  const tabs = tabsArray.map(({ label, icon }) => (
    <Tab
      value={label}
      label={label}
      key={label}
      icon={icon}
      iconPosition="start"
      sx={{ mb: -2 }}
    />
  ));

  const tabElements = tabsArray.map(({ label, element }) => (
    <TabPanel value={label} className="full-width-height" key={label}>
      {element}
    </TabPanel>
  ));

  return (
    <TabContext value={value}>
      <TabList
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        aria-label="secondary tabs example"
        sx={{ pl: '24px', pr: '24px' }}
      >
        {tabs}
      </TabList>
      {tabElements}
    </TabContext>
  );
};

CustomTab.propTypes = {
  defaultTab: PropTypes.string.isRequired,
  tabsArray: PropTypes.array.isRequired,
};
export default CustomTab;
