import { BEST_AVAILABLE_DB_NAME } from '../../utils/RollupUtils';
import { getMassAttributeNames } from '../../utils/ServiceUtils';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  massChecked: {
    ...getMassAttributeNames().reduce((r, att) => ({ ...r, [att]: false }), {}),
    [BEST_AVAILABLE_DB_NAME]: false,
  },
};

export default initialState;
