import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { TableContainer } from '@mui/material';
import { Dashboard, Info } from '@mui/icons-material';
import { useAuth } from '../../authentication/auth';
import * as Api from '../../helper/Api';
import Paths from '../../helper/Paths';
import * as ServiceUtils from '../../utils/ServiceUtils';
import StorageConstants from '../../helper/StorageConstants';
import ExpandablePanel from '../Card/expandablePanel';
import Details from '../Form/Details';
import ObjectTable from '../GridTable/ObjectTable';
import * as Props from '../GridTable/props';
import * as TableUtils from '../GridTable/tableUtils';
import { authenticateTableData } from '../../utils/CommonUtils';
import useTable from '../../hooks/useTable';
import { ObjectContext } from '../../hooks/contexts';
import ObjectGraphs from '../Graphs/objectGraphs';
import CustomTab from '../Card/customTab';
import toast from '../../helper/toast';
import RollupMenu from '../GridTable/toolbar/rollupMenu';

const ObjectsTableContainer = ({ type, id }) => {
  const auth = useAuth();
  const [toolbar, state, details, oldRows, reRender, loading, setters] =
    useTable();
  const [setLoading, setState, setProps, setOldRows] = setters;
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
      if (!authenticateTableData(response)) {
        return;
      }
      const { rows, objDetails } = formattedData(response);
      setProps(rows, [...columns], objDetails, null, [
        <RollupMenu key="rollupCommand" />,
      ]);
    } catch (error) {
      console.log(error);
      toast.error(error);
      auth.logout();
      <Navigate to={Paths.LOGIN} />;
    }
  }, [formattedData, auth]);

  React.useEffect(() => {
    fetchData();
  }, [reRender, fetchData]);

  const table = (
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

  return (
    <ObjectContext.Provider value={{ state, setState, oldRows, setOldRows }}>
      <CustomTab
        defaultTab="Object"
        tabsArray={[
          {
            label: 'Object',
            element: table,
            icon: <Info />,
          },
          {
            label: 'Dashboard',
            element: <ObjectGraphs />,
            icon: <Dashboard />,
          },
        ]}
      />
    </ObjectContext.Provider>
  );
};

ObjectsTableContainer.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default ObjectsTableContainer;
