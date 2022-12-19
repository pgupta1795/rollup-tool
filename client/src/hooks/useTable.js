import React from 'react';
import Toolbar from '../components/GridTable/toolbar/toolbar';
import ToolbarSkeleton from '../components/GridTable/toolbar/toolbarSkeleton';

export default (sortField) => {
  const [toolbar, setToolbar] = React.useState(<ToolbarSkeleton />);
  const [state, setState] = React.useState({
    data: [],
    dataState: {
      sort: [
        sortField || {
          field: 'name',
          dir: 'asc',
        },
      ],
      filter: [],
    },
    expanded: [1, 2, 32],
    inEdit: [],
    rollup: [],
  });
  const [oldRows, setOldRows] = React.useState([]);
  const [reRender, setRerender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const setProps = (rows, columns, pagination, menuItems) => {
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
        otherMenuItems={menuItems || null}
      />
    );
    setRerender(false);
    setLoading(false);
  };

  return [
    toolbar,
    state,
    oldRows,
    reRender,
    loading,
    [setLoading, setState, setProps, setOldRows],
  ];
};
