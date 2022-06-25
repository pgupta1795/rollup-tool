import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../Styles/StyledAccordion';
import CustomPaper from './customPaper';

const ExpandablePanel = ({ summary, children }) => {
  const [expand, setExpand] = React.useState(true);
  const toggle = () => {
    setExpand((prev) => !prev);
  };

  return (
    <CustomPaper>
      <Accordion expanded={expand} sx={{ minHeight: 10 }}>
        <AccordionSummary toggle={toggle}>{summary}</AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </CustomPaper>
  );
};

ExpandablePanel.propTypes = {
  summary: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
};
export default ExpandablePanel;
