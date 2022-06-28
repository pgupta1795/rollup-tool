import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ActionsContext } from '../../hooks/contexts';
import useChartSeries from '../../hooks/useChartSeries';
import { getActionsCountSeries } from '../../utils/ChartUtils';

const ActionsCountChart = () => {
  const options = {
    series: [],
    options: {
      chart: {
        id: 'countChart',
      },
      title: {
        text: 'Object Transactions',
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
    },
  };
  const action = useContext(ActionsContext);
  const state = useChartSeries(action, options, getActionsCountSeries);

  return (
    <div id="apex-chart">
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height="300"
      />
    </div>
  );
};

export default ActionsCountChart;
