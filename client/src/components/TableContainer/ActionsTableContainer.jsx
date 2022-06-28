import { Box, TableContainer } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import { useAuth } from '../../authentication/auth';
import * as Api from '../../helper/Api';
import Paths from '../../helper/Paths';
import ExpandablePanel from '../Card/expandablePanel';
import ObjectTable from '../GridTable/ObjectTable';
import MyPagination from '../GridTable/toolbar/pagination';
import * as ActionProps from '../GridTable/actionProps';
import useTable from '../../hooks/useTable';
import * as TableUtils from '../GridTable/tableUtils';
import ActionGraphs from '../Graphs/actionGraphs';
import { ActionsContext } from '../../hooks/contexts';
import toast from '../../helper/toast';

const ActionsTable = () => {
  const auth = useAuth();
  const [current, setCurrent] = React.useState(1);
  const [toolbar, state, , oldRows, reRender, loading, setters] = useTable({
    field: 'createdAt',
    dir: 'desc',
  });
  const [setLoading, setState, setProps] = setters;
  const columns = ActionProps.ACTION_COLUMNS;

  const fetchData = React.useCallback(async () => {
    try {
      const pageSize = 30;
      setLoading(true);
      const results = await Api.getActions(pageSize, (current - 1) * pageSize);
      if (!results) {
        return;
      }
      const rows = TableUtils.formatActionRows(results);
      const pagination = (
        <MyPagination
          current={current}
          onChange={(e, page) => setCurrent(page)}
        />
      );
      setProps(rows, [...columns], null, pagination);
    } catch (error) {
      console.error(error);
      toast.error(error);
      auth.logout();
      <Navigate to={Paths.LOGIN} />;
    }
  }, [current, auth]);

  React.useEffect(() => {
    fetchData();
  }, [reRender, fetchData]);

  return (
    <ActionsContext.Provider value={{ state }}>
      <Box m={1}>
        <ExpandablePanel summary={<Dashboard color="primary" />}>
          <ActionGraphs />
        </ExpandablePanel>
        <ExpandablePanel summary={toolbar}>
          <TableContainer component="div">
            <ObjectTable
              state={state}
              setState={setState}
              oldRows={oldRows}
              loading={loading}
              columns={columns}
              rowActionsRequired={false}
            />
          </TableContainer>
        </ExpandablePanel>
      </Box>
    </ActionsContext.Provider>
  );
};

export default ActionsTable;
