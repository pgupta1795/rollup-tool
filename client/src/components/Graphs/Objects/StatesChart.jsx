import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getTableData } from '../../../features/table/structureTableSlice';
import useChartSeriesAndLabels from '../../../hooks/useChartSeriesAndLabels';
import { getStateSeriesAndLabels } from '../../../utils/ChartUtils';

const StatesChart = () => {
  const options = {
    series: [],
    options: {
      labels: [],
      chart: {
        id: 'statesChart',
      },
      title: {
        text: 'STATES',
      },
    },
  };
  const tableData = useSelector(getTableData);
  const state = useChartSeriesAndLabels(
    tableData,
    options,
    getStateSeriesAndLabels
  );

  return (
    <div id="apex-chart">
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        height="300"
      />
    </div>
  );
};

export default StatesChart;
