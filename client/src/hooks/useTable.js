import React from 'react';
import Toolbar from '../components/GridTable/toolbar/toolbar';
import ToolbarSkeleton from '../components/GridTable/toolbar/toolbarSkeleton';

export default () => {
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
  const [oldRows, setOldRows] = React.useState([]);
  const [reRender, setRerender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const setProps = (rows, columns, objDetails, pagination) => {
    setDetails(objDetails);
    setState({
      ...state,
      data: rows,
    });
    setOldRows(rows);
    setToolbar(
      <Toolbar
        setRerender={setRerender}
        setLoading={setLoading}
        columns={[...columns]}
        rows={rows}
        pagination={pagination}
      />
    );
    setRerender(false);
    setLoading(false);
  };

  return [
    toolbar,
    state,
    details,
    oldRows,
    reRender,
    loading,
    [setLoading, setState, setProps],
  ];
};
