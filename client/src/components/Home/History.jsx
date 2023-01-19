import CasinoIcon from '@mui/icons-material/Casino';
import TreeView from '@mui/lab/TreeView';
import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTypeObjects } from '../../features/typeObjects/Actions';
import {
  getTypeObjectsError,
  getTypeObjectsStatus,
  selectLocalTypeObjects,
} from '../../features/typeObjects/typeObjectsSlice';
import StyledTreeItem from '../../Styles/StyledTreeItem';
import { TYPES } from '../../utils/ServiceUtils';
import HistorySkeleton from '../Skeleton/HistorySkeleton';
import MinusSquare from '../Svg/MinusSquare';
import PlusSquare from '../Svg/PlusSquare';

const History = () => {
  const dispatch = useDispatch();
  const objects = useSelector(selectLocalTypeObjects);
  const status = useSelector(getTypeObjectsStatus);
  const error = useSelector(getTypeObjectsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTypeObjects());
    }
  }, [status, dispatch]);

  if (status === 'failed') return error;

  if (status === 'loading') return <HistorySkeleton />;

  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CasinoIcon />}
      sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <Typography variant="h6" fontWeight={600}>
        RECENT OBJECTS
      </Typography>
      {objects.map(({ _id: id, objectTitle }, i) => (
        <StyledTreeItem
          nodeId={String(i + 1)}
          label={
            <Link className="link app-title" to={`../type/${TYPES[0]}/${id}`}>
              {objectTitle}
            </Link>
          }
          key={id}
        />
      ))}
    </TreeView>
  );
};

export default History;
