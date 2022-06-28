import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ObjectContext } from '../../hooks/contexts';
import useChartSeriesAndLabels from '../../hooks/useChartSeriesAndLabels';
import { getStateSeriesAndLabels } from '../../utils/ChartUtils';

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
  const object = useContext(ObjectContext);
  const state = useChartSeriesAndLabels(
    object,
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
