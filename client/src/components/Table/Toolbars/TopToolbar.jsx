import React, { lazy, Suspense } from 'react';

const Export = lazy(() => import('../../Button/Export'));
const Refresh = lazy(() => import('../../Button/Refresh'));
const RollupMenu = lazy(() => import('../../Rollup/RollupMenu'));

const Toolbar = (props) => (
  <div className="flex-column-box">
    <Suspense fallback={<div>Loading...</div>}>
      <Refresh {...props} />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <Export {...props} />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <RollupMenu {...props} />
    </Suspense>
  </div>
);

export default Toolbar;
