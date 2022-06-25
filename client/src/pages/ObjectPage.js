import React from 'react';
import { useParams } from 'react-router-dom';
import ObjectsTableContainer from '../components/TableContainer/ObjectsTableContainer';

const ObjectPage = () => {
  const { id, type } = useParams();

  return <ObjectsTableContainer type={type} id={id} key={id} />;
};

export default ObjectPage;
