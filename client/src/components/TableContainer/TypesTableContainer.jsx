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
import Toolbar from '../GridTable/toolbar/toolbar';
import ToolbarSkeleton from '../GridTable/toolbar/toolbarSkeleton';

const TypesTableContainer = ({ type }) => {
  const auth = useAuth();
  const [toolbar, setToolbar] = React.useState(<ToolbarSkeleton />);
  const [current, setCurrent] = React.useState(1);
  const [state, setState] = React.useState({
    data: [],
    dataState: {
      sort: [
        {
          field: 'name',
          dir: 'asc',
        },
      ],
      filter: [],
    },
    expanded: [1, 2, 32],
    inEdit: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [oldRows, setOldRows] = React.useState([]);
  const [reRender, setRerender] = React.useState(false);

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
      if (!TableUtils.authenticateTableData(response)) {
        return;
      }
      const headerKeys = Props.DEFAULT_COLUMN_KEYS;
      const rows = TableUtils.getRows(response, headerKeys);
      setState({
        ...state,
        data: rows,
      });
      setOldRows(rows);
      setRerender(false);
      setLoading(false);
      setToolbar(
        <Toolbar
          setRerender={setRerender}
          setLoading={setLoading}
          columns={[...columns]}
          rows={rows}
          pagination={
            <MyPagination
              current={current}
              onChange={(e, page) => setCurrent(page)}
            />
          }
        />
      );
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

TypesTableContainer.propTypes = {
  type: PropTypes.string.isRequired,
};
export default TypesTableContainer;
