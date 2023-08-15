import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { selectAllActions } from '../../../features/actions/actionsSlice';
import useChartSeries from '../../../hooks/useChartSeries';
import { getActionsCountSeries } from '../../../utils/ChartUtils';

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
  const actions = useSelector(selectAllActions);
  const state = useChartSeries(actions, options, getActionsCountSeries);

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
