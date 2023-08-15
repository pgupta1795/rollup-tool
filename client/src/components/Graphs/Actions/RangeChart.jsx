import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { selectAllActions } from '../../../features/actions/actionsSlice';
import useChartSeries from '../../../hooks/useChartSeries';
import { getAttributeRangeSeries } from '../../../utils/ChartUtils';

const ActionsRangeChart = () => {
  const options = {
    series: [],
    options: {
      chart: {
        id: 'attributeRangeChart',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      title: {
        text: 'Attribute Ranges',
      },
    },
  };
  const actions = useSelector(selectAllActions);
  const state = useChartSeries(actions, options, getAttributeRangeSeries);

  return (
    <div id="apex-chart">
      <Chart
        options={state.options}
        series={state.series}
        type="rangeBar"
        height="300"
      />
    </div>
  );
};

export default ActionsRangeChart;
