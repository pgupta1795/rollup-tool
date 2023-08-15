import PropTypes from 'prop-types';
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../Styles/StyledAccordion';
import CustomPaper from './customPaper';

const ExpandablePanel = ({ summary, children, initialExpand }) => {
  const [expand, setExpand] = React.useState(initialExpand);
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

ExpandablePanel.defaultProps = {
  initialExpand: true,
};

ExpandablePanel.propTypes = {
  summary: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  initialExpand: PropTypes.bool,
};
export default ExpandablePanel;
