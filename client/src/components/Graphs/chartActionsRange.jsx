import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ActionsContext } from '../../hooks/contexts';
import useChartSeries from '../../hooks/useChartSeries';
import { getAttributeRangeSeries } from '../../utils/ChartUtils';

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
  const action = useContext(ActionsContext);
  const state = useChartSeries(action, options, getAttributeRangeSeries);

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
