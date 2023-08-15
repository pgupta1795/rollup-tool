/* eslint-disable react/prop-types */
import React, { lazy, memo, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchObjects, handleRowEdit } from '../../../features/table/Actions';
import {
  getObjectsError,
  getObjectsStatus,
  getTableData,
} from '../../../features/table/structureTableSlice';
import toast from '../../../helper/toast';
import { getCostAttributeDetails } from '../../../utils/ServiceUtils';
import Export from '../../Button/Export';
import Refresh from '../../Button/Refresh';
import ExpandablePanel from '../../Card/expandablePanel';
import useCustomColumns from '../Columns/useCustomColumns';
import CostTableHeader from '../Header/CostTableHeader';

const ObjectDetails = lazy(() => import('../../Form/ObjectDetails'));
const MaterialTable = lazy(() => import('../MaterialTable'));

const CostTable = memo(() => {
  const { id, type } = useParams();
  const columns = [...useCustomColumns(type, getCostAttributeDetails)];
  const tableData = useSelector(getTableData);
  const status = useSelector(getObjectsStatus);
  const dispatch = useDispatch();
  const error = useSelector(getObjectsError);

  useEffect(() => {
    dispatch(fetchObjects({ type, id, columns }));
  }, [id, type]);

  if (status === 'failed') return error;

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
    } catch (e) {
      console.error(e);
      toast.error(e);
    }
  };

  return (
    <>
      <Suspense fallback={<>LOADING...</>}>
        <ObjectDetails fn={getCostAttributeDetails} />
      </Suspense>
      <ExpandablePanel summary={<CostTableHeader />}>
        <Suspense fallback={<>LOADING...</>}>
          <MaterialTable
            loading={status === 'loading'}
            key={id}
            isSaving={status === 'saving'}
            tableData={tableData}
            columns={columns}
            toolbar={({ table }) => (
              <div className="flex-column-box">
                <Suspense fallback={<div>Loading...</div>}>
                  <Refresh table={table} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <Export table={table} />
                </Suspense>
              </div>
            )}
            save={save}
            initialState={initialState}
          />
        </Suspense>
      </ExpandablePanel>
    </>
  );
});

export default CostTable;
