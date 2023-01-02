import { Dashboard, Info } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomTab from '../components/Card/customTab';
import ObjectGraphsContainer from '../components/Graphs/Container/ObjectGraphsContainer';
import useMassColumns from '../components/Table/Columns/useMassColumns';
import MassTable from '../components/Table/Container/MassTable';
import { fetchObjects } from '../features/table/Actions';
import {
  getObjectsError,
  getObjectsStatus,
} from '../features/table/structureTableSlice';

const ObjectPage = () => {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(getObjectsStatus);
  const error = useSelector(getObjectsError);
  const columns = [...useMassColumns(type)];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchObjects({ type, id, columns }));
    }
  }, [status, dispatch, id, type]);

  if (status === 'failed') return error;

  return (
    <CustomTab
      defaultTab="MASS"
      tabsArray={[
        {
          label: 'MASS',
          element: <MassTable />,
          icon: <Info />,
        },
        {
          label: 'Dashboard',
          element: <ObjectGraphsContainer />,
          icon: <Dashboard />,
        },
      ]}
    />
  );
};

export default ObjectPage;
