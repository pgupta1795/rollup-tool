import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ObjectContext } from '../../hooks/contexts';
import useChartSeriesAndLabels from '../../hooks/useChartSeriesAndLabels';
import { getMassSeriesAndLabels } from '../../utils/ChartUtils';

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
  const object = useContext(ObjectContext);
  const state = useChartSeriesAndLabels(
    object,
    options,
    getMassSeriesAndLabels
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

export default MassDistributionChart;
