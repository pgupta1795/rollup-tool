import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTypeObjectById } from '../api/TypeObjectApi';
import { getTableData } from '../features/table/structureTableSlice';

export default () => {
  const { id } = useParams();
  const tableData = useSelector(getTableData);
  const memoTableData = useMemo(() => tableData, [tableData]);
  const [isLoading, setLoading] = useState(true);
  const [objectDBData, setObjectDBData] = useState();

  const fetchData = useCallback(async () => {
    if (!id) return;
    const response = await getTypeObjectById(id);
    if (!response) return;
    setObjectDBData(response);
  }, [memoTableData, id]);

  useEffect(() => {
    fetchData();
    setLoading(false);
    return () => {
      setObjectDBData();
    };
  }, [fetchData]);

  return { objectDBData, isLoading };
};
