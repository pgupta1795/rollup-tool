import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getTableData } from '../../../features/table/structureTableSlice';
import useChartSeriesAndLabels from '../../../hooks/useChartSeriesAndLabels';
import { getMassSeriesAndLabels } from '../../../utils/ChartUtils';

const MassDistributionChart = () => {
  const options = {
    series: [],
    options: {
      labels: [],
      chart: {
        id: 'massDistributionChart',
      },
      title: {
        text: 'Mass Distribution',
      },
    },
  };
  const tableData = useSelector(getTableData);
  const state = useChartSeriesAndLabels(
    tableData,
    options,
    getMassSeriesAndLabels
  );

  return (
    <div id="apex-chart">
      {state?.series ? (
        <Chart
          options={state?.options}
          series={state?.series}
          type="pie"
          height="300"
        />
      ) : (
        'NO DATA'
      )}
    </div>
  );
};

export default MassDistributionChart;
