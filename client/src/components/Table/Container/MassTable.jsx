/* eslint-disable react/prop-types */
import React, { lazy, memo, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleRowEdit } from '../../../features/table/Actions';
import {
  getObjectsStatus,
  getTableData,
} from '../../../features/table/structureTableSlice';
import ExpandablePanel from '../../Card/expandablePanel';
import useCustomColumns from '../Columns/useCustomColumns';
import MassTableHeader from '../Header/MassTableHeader';
import TopToolbar from '../Toolbars/TopToolbar';

const ObjectDetails = lazy(() => import('../../Form/ObjectDetails'));
const MaterialTable = lazy(() => import('../MaterialTable'));

const MassTable = memo(() => {
  const { id, type } = useParams();
  const columns = [...useCustomColumns(type)];
  const tableData = useSelector(getTableData);
  const status = useSelector(getObjectsStatus);
  const dispatch = useDispatch();
  const initialState = {
    showColumnFilters: false,
    density: 'compact',
    showGlobalFilter: false,
    expanded: true,
    columnVisibility: {
      type: false,
      name: false,
      revision: false,
    },
  };

  const save = async (props) => {
    try {
      const dataItem = {
        ...props.table.getRow(props.row.id).original,
        ...props.values,
      };
      dispatch(handleRowEdit(dataItem));
      props.exitEditingMode();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Suspense fallback={<>LOADING...</>}>
        <ObjectDetails />
      </Suspense>
      <ExpandablePanel summary={<MassTableHeader />}>
        <Suspense fallback={<>LOADING...</>}>
          <MaterialTable
            loading={status === 'loading'}
            key={id}
            isSaving={status === 'saving'}
            tableData={tableData}
            columns={columns}
            toolbar={({ table }) => <TopToolbar table={table} />}
            save={save}
            initialState={initialState}
          />
        </Suspense>
      </ExpandablePanel>
    </>
  );
});

export default MassTable;
