import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const CustomTab = ({ defaultTab, tabsArray }) => {
  const [value, setValue] = React.useState(defaultTab);

  const tabs = tabsArray.map(({ label, icon }) => (
    <Tab
      value={label}
      label={label}
      key={label}
      icon={icon}
      iconPosition="start"
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
        sx={{ paddingLeft: '24px', paddingRight: '24px' }}
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
