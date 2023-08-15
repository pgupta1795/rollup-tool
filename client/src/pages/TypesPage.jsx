import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DEFAULT_COLUMNS } from '../components/Table/Columns/DefaultColumns';
import { fetchObjects } from '../features/types/Actions';
import {
  getPagination,
  getTypesError,
  getTypesStatus,
  selectTypeObjects,
  setPagination,
} from '../features/types/typesSlice';
import Constants from '../helper/Constants';
import { TYPES } from '../utils/ServiceUtils';

const MaterialTable = lazy(() => import('../components/Table/MaterialTable'));

const TypesPage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const objects = useSelector(selectTypeObjects);
  const status = useSelector(getTypesStatus);
  const error = useSelector(getTypesError);
  const pagination = useSelector(getPagination);
  const columns = DEFAULT_COLUMNS;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchObjects({ type, columns }));
    }
  }, [status, dispatch]);

  if (!TYPES.includes(type)) return Constants.TYPE_NOT_CONFIGURED_WARNING;
  if (status === 'failed') return error;

  return (
    <Suspense fallback={<>LOADING...</>}>
      <MaterialTable
        loading={status === 'loading'}
        tableData={objects}
        columns={columns}
        enableExpanding={false}
        enableEditing={false}
        displayColumnDefOptions={{}}
        enableRowActions={false}
        state={{
          isLoading: status === 'loading',
          showProgressBars: false,
          pagination: {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
          },
        }}
        onPaginationChange={(newPage) => {
          const newPagination = newPage({
            ...pagination,
          });
          dispatch(setPagination(newPagination));
          dispatch(fetchObjects({ type, columns }));
        }}
        manualPagination
        rowCount={(pagination.pageIndex + 2) * pagination.pageSize}
      />
    </Suspense>
  );
};

export default TypesPage;
