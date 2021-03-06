import * as d3 from 'd3';
import { line, bar, stackBar, chartEvents, verticalDivider, markers, tooltip } from '../src/index.js';
import { lineChartData } from '../test/data/line-chart';
import { barChartData } from '../test/data/bar-chart';
import { stackBarMultipleData } from '../test/data/stack-bar';
import './index.css';

// default line chart
(() => {
  const verticalDividerPlugin = verticalDivider();
  const markersPlugin = markers();
  const tooltipPlugin = tooltip();

  const lineChart = line()
    // subscribe plugins to chart events
    .on(chartEvents.chartMouseEnter, () => {
      verticalDividerPlugin.show();
    })
    .on(chartEvents.chartMouseLeave, () => {
      verticalDividerPlugin.remove();
      markersPlugin.remove();
      tooltipPlugin.remove();
    })
    .on(chartEvents.chartMouseMove, (options) => {
      verticalDividerPlugin.update(options);
      markersPlugin.show(options);
      tooltipPlugin.show(options);
    });

  // create chart with data
  const chartContainer = d3.select('.default-chart');
  chartContainer.datum(lineChartData).call(lineChart);

  // bind plugins to chart
  const metadataContainer = d3.select('.default-chart .metadata-container');
  metadataContainer.datum([]).call(verticalDividerPlugin);
  metadataContainer.datum([]).call(markersPlugin);
  metadataContainer.datum([]).call(tooltipPlugin);
})();

// configurated line chart
(() => {
  const verticalDividerPlugin = verticalDivider();
  const markersPlugin = markers()
    .fill(data => {
      return data.interpolatedValue > 10 ? data.color : 'white'
    })
    .radius(data => {
      if (data.interpolatedValue > 10) {
        return 10;
      }
      if (data.interpolatedValue < 0) {
        return 3;
      }
      return 5;
    })
    .sort((a, b) => b.interpolatedValue - a.interpolatedValue);

  const tooltipPlugin = tooltip()
    .sort((a, b) => b.interpolatedValue - a.interpolatedValue)
    .valueFormatter(({ interpolatedValue }) => `${interpolatedValue.toFixed(1)}°C`)
    .headerFormatter((selectedDate, data) => {
      const date = d3.timeFormat('%d-%m %H:%M')(selectedDate);
      return data.length ?
        `Found ${data.length}</br>${date}` :
        `Nothing found</br>${date}`;
    });

  const lineChart = line()
    .width(900)
    .height(550)
    .yAxisValueFormat(value => `${value}°C`)
    .xAxisTimeFormat(d3.timeFormat('%d-%m %H'))
    .curve(d3.curveCatmullRom)
    .on(chartEvents.chartMouseEnter, () => {
      verticalDividerPlugin.show();
    })
    .on(chartEvents.chartMouseLeave, () => {
      verticalDividerPlugin.remove();
      markersPlugin.remove();
      tooltipPlugin.remove();
    })
    .on(chartEvents.chartMouseMove, (options) => {
      verticalDividerPlugin.update(options);
      markersPlugin.show(options);
      tooltipPlugin.show(options);
    })
    .on(chartEvents.chartMouseClick, () => {

    });

  verticalDividerPlugin
    .height(lineChart.chartHeight());

  tooltipPlugin
    .chartHeight(lineChart.chartHeight())
    .chartWidth(lineChart.chartWidth());

  const container = d3.select('.configured-chart');
  container.datum(lineChartData).call(lineChart);

  const metadataContainer = d3.select('.configured-chart .metadata-container');
  metadataContainer.datum([]).call(verticalDividerPlugin);
  metadataContainer.datum([]).call(markersPlugin);
  metadataContainer.datum([]).call(tooltipPlugin);
})();

// bar chart
(() => {
  const verticalDividerPlugin = verticalDivider();
  const tooltipPlugin = tooltip({
    valueFormatter: data => { 
      return data.value === null ?
        'no data' :
        data.value + ' mm'
    }
  });

  const barChart = bar()
    // subscribe plugins to chart events
    .on(chartEvents.chartMouseEnter, () => {
      verticalDividerPlugin.show();
    })
    .on(chartEvents.chartMouseLeave, () => {
      verticalDividerPlugin.remove();
      tooltipPlugin.remove();
    })
    .on(chartEvents.chartMouseMove, (options) => {
      // console.log(options);
      verticalDividerPlugin.update(options);
      tooltipPlugin.show(options);
    });

  // create chart with data
  const chartContainer = d3.select('.bar-chart');
  chartContainer.datum(barChartData).call(barChart);

  // bind plugins to chart
  const metadataContainer = d3.select('.bar-chart .metadata-container');
  metadataContainer.datum([]).call(verticalDividerPlugin);
  metadataContainer.datum([]).call(tooltipPlugin);
})();

// stack bar multiple
(() => {
  const chartHeight = 200;

  const verticalDividerPlugin = verticalDivider()
  const tooltipPlugin = tooltip({
    verticalBorderMargin: -10,
    topicFormatter: data => data.name,
    valueFormatter: data => data.value ? data.value : 'No data'
  })

  const stackBarChart = stackBar({
    height: chartHeight
  })
    .on(chartEvents.chartMouseEnter, () => {
      verticalDividerPlugin.show();
    })
    .on(chartEvents.chartMouseLeave, () => {
      verticalDividerPlugin.remove();
      tooltipPlugin.remove();
    })
    .on(chartEvents.chartMouseMove, (options) => {
      verticalDividerPlugin.update(options);
      tooltipPlugin.show(options);
    });

  verticalDividerPlugin.height(stackBarChart.chartHeight());
  tooltipPlugin.chartHeight(stackBarChart.chartHeight());

  const chartContainer = d3.select('.stack-bar-multiple');
  chartContainer.datum(stackBarMultipleData).call(stackBarChart);

  const metadataContainer = d3.select('.stack-bar-multiple .metadata-container');
  metadataContainer.datum([]).call(verticalDividerPlugin);
  metadataContainer.datum([]).call(tooltipPlugin);
})();
