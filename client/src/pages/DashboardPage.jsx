import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box, Typography } from '@mui/material';
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpandablePanel from '../components/Card/expandablePanel';
import ActionGraphsContainer from '../components/Graphs/Container/ActionGraphsContainer';
import useActionColumns from '../components/Table/Columns/useActionColumns';
import { fetchActions } from '../features/actions/Actions';
import {
  getActionsError,
  getActionsStatus,
  selectAllActions,
} from '../features/actions/actionsSlice';

const MaterialTable = lazy(() => import('../components/Table/MaterialTable'));

const DashboardPage = () => {
  const dispatch = useDispatch();
  const actions = useSelector(selectAllActions);
  const status = useSelector(getActionsStatus);
  const error = useSelector(getActionsError);
  const columns = [...useActionColumns()];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActions());
    }
  }, [status, dispatch]);

  if (status === 'failed') return error;
  return (
    <Box m={1}>
      <ExpandablePanel summary={<DashboardIcon color="primary" />}>
        <ActionGraphsContainer />
      </ExpandablePanel>
      <ExpandablePanel
        summary={
          <Typography variant="h6" color="primary">
            Actions History
          </Typography>
        }
      >
        <Suspense fallback={<>LOADING...</>}>
          <MaterialTable
            loading={status === 'loading'}
            tableData={actions}
            columns={columns}
            enableExpanding={false}
            enableEditing={false}
            displayColumnDefOptions={{}}
            enableRowActions={false}
            enablePagination={false}
          />
        </Suspense>
      </ExpandablePanel>
    </Box>
  );
};

export default DashboardPage;
