import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { TableContainer } from '@mui/material';
import { useAuth } from '../../authentication/auth';
import * as Api from '../../helper/Api';
import Paths from '../../helper/Paths';
import * as ServiceUtils from '../../helper/ServiceUtils';
import StorageConstants from '../../helper/StorageConstants';
import ExpandablePanel from '../Card/expandablePanel';
import Details from '../Form/Details';
import ObjectTable from '../GridTable/ObjectTable';
import * as Props from '../GridTable/props';
import * as TableUtils from '../GridTable/tableUtils';
import Toolbar from '../GridTable/toolbar/toolbar';
import ToolbarSkeleton from '../GridTable/toolbar/toolbarSkeleton';

const ObjectsTableContainer = ({ type, id }) => {
  const auth = useAuth();
  const [toolbar, setToolbar] = React.useState(<ToolbarSkeleton />);
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
  const [details, setDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [oldRows, setOldRows] = React.useState([]);
  const [reRender, setRerender] = React.useState(false);

  const formattedData = React.useCallback(
    (response) => {
      const headerKeys = Props.DEFAULT_COLUMN_KEYS.slice(0, -2);
      const customHeaderKeys = ServiceUtils.getCustomAttributeNames(type);
      const rows = TableUtils.getRows(
        response.data,
        headerKeys,
        customHeaderKeys
      );
      const children = TableUtils.formatChildData(
        response.children,
        headerKeys,
        customHeaderKeys,
        id
      );
      rows[0].children = children;
      const objDetails = TableUtils.getRows(
        response.data,
        Props.DEFAULT_COLUMN_KEYS,
        customHeaderKeys
      )[0];
      return {
        rows,
        objDetails,
      };
    },
    [id, type]
  );

  const fetchData = React.useCallback(async () => {
    try {
      if (!id) return;
      const columns = Props.OBJECT_COLUMNS(type);
      const spaceUrl = localStorage.getItem(StorageConstants.SPACE3d);
      setLoading(true);
      const response = await Api.getAllChildren(type, spaceUrl, id);
      if (!TableUtils.authenticateTableData(response)) {
        return;
      }
      const { rows, objDetails } = formattedData(response);
      setDetails(objDetails);
      setState({
        ...state,
        data: rows,
      });
      setOldRows(rows);
      setRerender(false);
      setToolbar(
        <Toolbar
          setRerender={setRerender}
          setLoading={setLoading}
          columns={[...columns]}
          rows={rows}
        />
      );
      setLoading(false);
    } catch (error) {
      auth.logout();
      <Navigate to={Paths.LOGIN} />;
    }
  }, [id, type, formattedData, auth]);

  React.useEffect(() => {
    fetchData();
  }, [reRender, fetchData]);

  return (
    <>
      <Details data={details} />
      <ExpandablePanel summary={toolbar}>
        <TableContainer component="div">
          <ObjectTable
            type={type}
            state={state}
            setState={setState}
            oldRows={oldRows}
            loading={loading}
            columns={Props.OBJECT_COLUMNS(type)}
          />
        </TableContainer>
      </ExpandablePanel>
    </>
  );
};

ObjectsTableContainer.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default ObjectsTableContainer;
