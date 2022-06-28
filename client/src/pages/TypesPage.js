import * as React from 'react';
import { useParams } from 'react-router-dom';
import TypesTableContainer from '../components/TableContainer/TypesTableContainer';
import * as ServiceUtils from '../utils/ServiceUtils';
import toast from '../helper/toast';
import Constants from '../helper/Constants';

const TypesPage = () => {
  const { type } = useParams();

  return ServiceUtils.TYPES.includes(type) ? (
    <TypesTableContainer type={type} />
  ) : (
    toast.warning(Constants.TYPE_NOT_CONFIGURED_WARNING)
  );
};

export default TypesPage;
