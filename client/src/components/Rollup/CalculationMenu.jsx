import {
  Box,
  ClickAwayListener,
  FormHelperText as InfoText,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleClickAway } from '../../features/rollup/Actions';
import { getCheckedFields, hasError } from '../../features/rollup/rollupSlice';
import { getTableData } from '../../features/table/structureTableSlice';
import Constants from '../../helper/Constants';
import toast from '../../helper/toast';
import { calculate } from '../../utils/RollupUtils';
import { getMassAttributeDetails } from '../../utils/ServiceUtils';
import Submit from '../Button/Submit';
import RollupAll from './command/RollupAll';
import RollupBestAvailable from './command/RollupBestAvailable';
import RollupMass from './command/RollupMass';

const CalculationMenu = memo(() => {
  const dispatch = useDispatch();
  const tableData = useSelector(getTableData);
  const rows = [tableData && JSON.parse(JSON.stringify(tableData[0]))];
  const values = useSelector(getCheckedFields);
  const error = useSelector(hasError);

  /**
   * When submitting the rollup form,
   * after adding calculation of rollup values in local DB,
   * add the cachedTableData back into tableData in redux store
   *
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newRows = [...rows];
      values.forEach((value) => {
        calculate(newRows, value);
      });
      dispatch(handleClickAway());
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => dispatch(handleClickAway())}>
      <form onSubmit={handleSubmit}>
        <FormControl error={error}>
          <RollupAll />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {getMassAttributeDetails().map(({ Label, Attribute }) => (
              <RollupMass attribute={Attribute} label={Label} key={Attribute} />
            ))}
            <RollupBestAvailable />
          </Box>
          {error ? <InfoText>{Constants.ROLLUP_MENU_SELECT}</InfoText> : null}
          <Submit>Calculate</Submit>
        </FormControl>
      </form>
    </ClickAwayListener>
  );
});

export default CalculationMenu;
