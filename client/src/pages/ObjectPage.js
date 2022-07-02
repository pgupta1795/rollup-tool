import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

const ObjectsTableContainer = lazy(() =>
  import('../components/TableContainer/ObjectsTableContainer')
);

const ObjectPage = () => {
  const { id, type } = useParams();

  return (
    <Suspense>
      <ObjectsTableContainer type={type} id={id} key={id} />
    </Suspense>
  );
};

export default ObjectPage;
