import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {
  ClickAwayListener,
  FormControlLabel,
  FormHelperText,
  Switch,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Constants from '../../../helper/Constants';
import RadioField from '../../Common/RadioField';
import * as ServiceUtils from '../../../utils/ServiceUtils';
import * as RollupUtils from '../rollupUtils';
import useRollup from '../../../hooks/useRollup';

const CalculationMenu = ({ func }) => {
  const [value, error, handleRadioChange, handleSubmit, handleClickAway] =
    useRollup(func);

  const massRadioFields = ServiceUtils.getMassAttributeKeys().map(
    (customAttribute) => {
      const displayTitle = customAttribute.Label;
      const attrName = customAttribute.Attribute;
      if (!displayTitle.includes('Mass')) {
        return null;
      }
      return (
        <RadioField
          value={attrName}
          label={displayTitle}
          title={`Rollup ${displayTitle}`}
          key={displayTitle}
        />
      );
    }
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 0.5 }} error={error} variant="standard">
          <FormControlLabel
            control={<Switch defaultChecked />}
            className="no-display"
            label={<Typography variant="subtitle2">Add +5% or -5%</Typography>}
          />
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="rollupCalculation"
            value={value}
            onChange={handleRadioChange}
          >
            {massRadioFields}
            <RadioField
              value={RollupUtils.BEST_AVAILABLE}
              label={RollupUtils.BEST_AVAILABLE}
              title={Constants.BEST_AVAILABLE}
            />
            <RadioField
              value={RollupUtils.BEST_AVAILABLE_V2}
              label={RollupUtils.BEST_AVAILABLE_V2}
              title={Constants.BEST_AVAILABLE_V2}
              className="no-display"
            />
          </RadioGroup>
          {error ? (
            <FormHelperText>Please select an option</FormHelperText>
          ) : null}
          <Button
            sx={{ mt: 1, mr: 1 }}
            type="submit"
            variant="outlined"
            size="small"
          >
            Calculate
          </Button>
        </FormControl>
      </form>
    </ClickAwayListener>
  );
};

CalculationMenu.propTypes = {
  func: PropTypes.func.isRequired,
};
export default CalculationMenu;
