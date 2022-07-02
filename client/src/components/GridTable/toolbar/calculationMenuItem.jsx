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
import toast from '../../../helper/toast';
import RadioField from '../../Common/RadioField';
import * as ServiceUtils from '../../../utils/ServiceUtils';
import { ObjectContext } from '../../../hooks/contexts';
import * as RollupUtils from '../rollupUtils';

const BEST_AVAILABLE = 'Best Available';

const BEST_AVAILABLE_V2 = 'Best Available v2';

const CalculationMenu = ({ func }) => {
  const object = React.useContext(ObjectContext);
  const { state, setState, oldRows, setOldRows } = object;
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [rollupStatus, setRollupStatus] = React.useState(false);

  const rollupBestAvailable = () => {
    // Actual > Estimated > Calculated
    // const rollupOrder = RollupUtils.getRollupOrder().split('>');
    // const newRows = RollupUtils.rollup(field, state.data);
  };

  const rollupBestAvailableV2 = () => {};

  const handleRadioChange = (event) => {
    const field = event.target.value;
    setValue(field);

    if (field === BEST_AVAILABLE) {
      const { title } = event.target.labels[0];
      toast.info(title, { autoClose: 5000 });
      rollupBestAvailable();
      return;
    }

    if (field === BEST_AVAILABLE_V2) {
      const { title } = event.target.labels[0];
      toast.info(title, { autoClose: 5000 });
      rollupBestAvailableV2();
      return;
    }

    const newRows = RollupUtils.rollup(field, state.data);
    setRollupStatus(false);
    setState({
      ...state,
      data: newRows,
      rollup: [field],
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!value) {
        setError(true);
        return;
      }
      func();
      let { data: newRows } = state;
      const rootRow = newRows[0];
      newRows = await RollupUtils.actualEnoviaRollup(
        rootRow.type,
        rootRow,
        newRows,
        oldRows
      );
      setRollupStatus(true);
      setState({ ...state, data: newRows, rollup: [] });
      setOldRows(newRows);
    } catch (err) {
      setRollupStatus(false);
      throw err;
    }
  };

  const customAttributes = ServiceUtils.getCustomAttributeKeys();
  const massRadioFields = customAttributes.map((customAttribute) => {
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
  });

  const handleClickAway = () => {
    if (!rollupStatus) {
      setState({ ...state, data: oldRows, rollup: [] });
      return;
    }
    setState({ ...state, rollup: [] });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 0.5 }} error={error} variant="standard">
          <FormControlLabel
            control={<Switch defaultChecked />}
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
              value={BEST_AVAILABLE}
              label={BEST_AVAILABLE}
              title={Constants.BEST_AVAILABLE}
            />
            <RadioField
              value={BEST_AVAILABLE_V2}
              label={BEST_AVAILABLE_V2}
              title={Constants.BEST_AVAILABLE_V2}
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
