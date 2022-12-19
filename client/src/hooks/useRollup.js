import { useContext, useState } from 'react';
import { ObjectContext } from './contexts';
import * as RollupUtils from '../components/GridTable/rollupUtils';
import toast from '../helper/toast';

export default (func) => {
  const object = useContext(ObjectContext);
  const { state, setState, oldRows } = object;
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [rollupStatus, setRollupStatus] = useState(false);

  const handleClickAway = () => {
    if (!rollupStatus) {
      setState({ ...state, data: oldRows, rollup: [] });
      return;
    }
    setState({ ...state, rollup: [] });
  };

  const handleRadioChange = (event) => {
    const field = event.target.value;
    setValue(field);

    if (field === RollupUtils.BEST_AVAILABLE) {
      const { title } = event.target.labels[0];
      toast.info(title, { position: 'bottom-right' });
      setState({
        ...state,
        rollup: [...RollupUtils.getRollupOrder()],
      });
      return;
    }

    if (field === RollupUtils.BEST_AVAILABLE_V2) {
      const { title } = event.target.labels[0];
      toast.info(title, { position: 'bottom-right' });
      setState({
        ...state,
        rollup: [...RollupUtils.getRollupOrder()],
      });
      return;
    }

    const newRows = RollupUtils.rollup(field, oldRows);
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
      const { data: newRows } = state;
      RollupUtils.calculate(newRows, value);
      setRollupStatus(true);
      // TODO do not update values in enovia for now
      // const updateInEnovia = false;
      // if (updateInEnovia) {
      //   newRows = await RollupUtils.actualEnoviaRollup(
      //     rootRow.type,
      //     rootRow,
      //     newRows,
      //     oldRows
      //   );
      //   setState({ ...state, data: newRows, rollup: [] });
      //   setOldRows(newRows);
      // }
      setState({ ...state, data: oldRows, rollup: [] });
    } catch (err) {
      setRollupStatus(false);
      setState({ ...state, data: oldRows, rollup: [] });
    }
  };

  return [value, error, handleRadioChange, handleSubmit, handleClickAway];
};
