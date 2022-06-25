import * as React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TypesTableContainer from '../components/TableContainer/TypesTableContainer';
import * as ServiceUtils from '../helper/ServiceUtils';
import Paths from '../helper/Paths';

const TypesPage = () => {
  const { type } = useParams();

  return ServiceUtils.TYPES.includes(type) ? (
    <TypesTableContainer type={type} />
  ) : (
    <>
      {alert(`${type} is not configured or valid enovia type`)}
      <Navigate to={Paths.HOME} />
    </>
  );
};

export default TypesPage;
