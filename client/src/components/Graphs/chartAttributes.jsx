import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import { ObjectContext } from '../../hooks/contexts';
import useChartSeriesAndLabels from '../../hooks/useChartSeriesAndLabels';
import { getAttributeSeries } from '../../utils/ChartUtils';

const AttributesChart = () => {
  const options = {
    series: [],
    options: {
      chart: {
        id: 'attributesChart',
        type: 'line',
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      stroke: {
        width: 1,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [],
        labels: {
          show: false,
        },
      },
      legend: {
        position: 'top',
      },
      title: {
        text: 'Attributes',
      },
    },
  };
  const object = useContext(ObjectContext);
  const state = useChartSeriesAndLabels(object, options, getAttributeSeries);

  return (
    <div id="apex-chart">
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height="300"
      />
    </div>
  );
};

export default AttributesChart;
