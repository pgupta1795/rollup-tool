import { TableContainer } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../authentication/auth';
import * as Api from '../../helper/Api';
import Paths from '../../helper/Paths';
import StorageConstants from '../../helper/StorageConstants';
import ExpandablePanel from '../Card/expandablePanel';
import ObjectTable from '../GridTable/ObjectTable';
import MyPagination from '../GridTable/toolbar/pagination';
import * as Props from '../GridTable/props';
import * as TableUtils from '../GridTable/tableUtils';
import { authenticateTableData } from '../../helper/CommonUtils';
import useTable from '../../hooks/useTable';

const ActionsTable = ({ type }) => {
  const auth = useAuth();
  const [current, setCurrent] = React.useState(1);
  const [toolbar, state, , oldRows, reRender, loading, setters] = useTable();
  const [setLoading, setState, setProps] = setters;

  const fetchData = React.useCallback(async () => {
    try {
      const pageSize = 30;
      const columns = Props.DEFAULT_COLUMNS;
      const spaceUrl = localStorage.getItem(StorageConstants.SPACE3d);
      setLoading(true);
      const response = await Api.searchObjects(
        type,
        spaceUrl,
        pageSize,
        (current - 1) * pageSize
      );
      if (!authenticateTableData(response)) {
        return;
      }
      const headerKeys = Props.DEFAULT_COLUMN_KEYS;
      const rows = TableUtils.getRows(response, headerKeys);
      const pagination = (
        <MyPagination
          current={current}
          onChange={(e, page) => setCurrent(page)}
        />
      );
      setProps(rows, [...columns], null, pagination);
    } catch (error) {
      auth.logout();
      <Navigate to={Paths.LOGIN} />;
    }
  }, [type, current, auth]);

  React.useEffect(() => {
    fetchData();
  }, [reRender, fetchData]);

  return (
    <ExpandablePanel summary={toolbar}>
      <TableContainer component="div">
        <ObjectTable
          type={type}
          state={state}
          setState={setState}
          oldRows={oldRows}
          loading={loading}
          columns={Props.DEFAULT_COLUMNS}
        />
      </TableContainer>
    </ExpandablePanel>
  );
};

ActionsTable.propTypes = {
  type: PropTypes.string.isRequired,
};
export default ActionsTable;
