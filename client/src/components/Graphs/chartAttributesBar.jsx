import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ObjectContext } from '../../hooks/contexts';
import useChartSeriesAndLabels from '../../hooks/useChartSeriesAndLabels';
import { getAttributesBarSeries } from '../../utils/ChartUtils';

const AttributesBarChart = () => {
  const options = {
    series: [],
    options: {
      chart: {
        id: 'rootObjectAttributesChart',
      },
      title: {
        text: 'Attributes Distribution',
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      legend: {
        position: 'top',
      },
    },
  };
  const object = useContext(ObjectContext);
  const state = useChartSeriesAndLabels(
    object,
    options,
    getAttributesBarSeries
  );

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

export default AttributesBarChart;
