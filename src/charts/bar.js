import * as d3 from 'd3';

import { colorProvider } from '../utils/color-provider';
import { getDatePlusTime, getAverageDate, boundNumberToRange } from '../utils/helpers';

const chartEvents = {
  chartMouseEnter: 'chartMouseEnter',
  chartMouseLeave: 'chartMouseLeave',
  chartMouseMove: 'chartMouseMove',
  chartMouseClick: 'chartMouseClick'
};

function bar({
    width = 700, height = 500,
    margin = { top: 20, right: 30, bottom: 40, left: 40 },
    setStackWidth = (chartWidth, numberOfBars) => chartWidth / numberOfBars - 20,
    maxTimeRangeDifferenceToDraw = 1000 * 60 * 60 * 24 * 1.5,
    stackTimeDiapason = 1000 * 60 * 60 * 24,
    xAxisTimeFormat, yAxisValueFormat,
    xAxisDateFrom, xAxisDateTo,
    yAxisValueFrom, yAxisValueTo
  } = {}) {

  let svg;
  let chartWidth, chartHeight;
  let xAxis, yAxis;
  let xScale, yScale;

  let minDate, maxDate, maxValue;

  const chartData = [];
  let stackWidth, stackBackgroundWidth;

  const colors = colorProvider();

  const dispatcher = d3.dispatch(chartEvents.chartMouseEnter,
    chartEvents.chartMouseLeave, chartEvents.chartMouseMove,
    chartEvents.chartMouseClick);

  function exports(selection) {
    selection.each(function(data) {
      chartWidth = exports.chartWidth();
      chartHeight = exports.chartHeight();

      buildSvg(this);

      initializeChartData(data);
      createScales();
      createAxis();

      drawAxis();
      drawGridLines();
      drawBars();
      runDrawingAnimation();

      subscribeEvents();
    });
  }

  function initializeChartData(data) {
    const chartDates = [].concat.apply([], data.map(d => d.data))
      .map(p => p.date);

    minDate = xAxisDateFrom || d3.min(chartDates);
    const maxDateConfig = xAxisDateTo || d3.max(chartDates);

    let numberOfBars = 0;
    maxDate = minDate;

    do {
      const diapasonStart = maxDate;
      maxDate = getDatePlusTime(maxDate, stackTimeDiapason);
      const avgDate = getAverageDate(diapasonStart, maxDate);
      numberOfBars++;

      const currentStack = {
        dataSum: 0,
        dateFrom: diapasonStart,
        dateTo: maxDate,
        date: avgDate,
        data: []
      };
      
      const filteredData = data
        .map(d => ({
          name: d.name,
          color: d.color || colors.next(d.name),
          data: d.data.filter(d => diapasonStart <= d.date && d.date < maxDate)
        }))
        .reduce((acc, curr) => {
          const currSet = {
            name: curr.name,
            // empty array or all missing values should return null
            value: curr.data.reduce((acc, curr) => {
              return typeof curr.value === 'number' ?
                acc + curr.value :
                acc
            }, null),
            previousValueSum: acc.dataSum,
            color: curr.color,
            date: avgDate,
            dateFrom: diapasonStart,
            dateTo: maxDate
          };
          acc.dataSum += currSet.value;
          acc.data.push(currSet);
          return acc;
        }, currentStack);

      chartData.push(filteredData);

    } while (maxDate < maxDateConfig);

    maxValue = d3.max(chartData
      .map(d => d3.sum(d.data, d => d.value)));

    stackWidth = setStackWidth(chartWidth, numberOfBars);
    stackBackgroundWidth = Math.round(chartWidth / numberOfBars);
  }

  function createScales() {
    xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, chartWidth]);

    const yMin = yAxisValueFrom || 0;
    const yMax = typeof yAxisValueTo === 'number' ?
      yAxisValueTo :
      // add free space at top
      maxValue * 1.05;

    yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([chartHeight, 0]);
  }

  function createAxis() {
    xAxis = d3
      .axisBottom(xScale);

    if (xAxisTimeFormat) {
      xAxis.tickFormat(xAxisTimeFormat);
    }

    yAxis = d3
      .axisLeft(yScale);

    if (yAxisValueFormat) {
      yAxis.tickFormat(yAxisValueFormat);
    }
  }

  function drawAxis() {
    svg
      .select('.x-axis-container')
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    svg
      .select('.y-axis-container')
      .append('g')
      .classed('y-axis', true)
      .call(yAxis)
  }

  function drawGridLines() {
    svg
      .select('.grid-container')
      .selectAll('.horizontal-grid-line')
      .data(yScale.ticks())
      .enter()
        .append('line')
        .classed('horizontal-grid-line', true)
        .attr('x1', 0)
        .attr('x2', chartWidth)
        .attr('y1', d => yScale(d))
        .attr('y2', d => yScale(d));
    
    svg
      .select('.grid-container')
      .selectAll('.vertical-grid-line')
      .data(xScale.ticks())
      .enter()
        .append('line')
        .classed('vertical-grid-line', true)
        .attr('x1', d => xScale(d))
        .attr('x2', d => xScale(d))
        .attr('y1', 0)
        .attr('y2', chartHeight);
  }

  function drawBars() {
    const containers = svg
      .select('.data-bar-container')
      .selectAll('.bar')
      .data(chartData)
      .enter()
        .append('g');
    
    containers
      .append('rect')
      .classed('stack-background', true)
      .attr('x', d => xScale(d.date))
      .attr('y', 0)
      .attr('width', stackBackgroundWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(-${stackBackgroundWidth / 2}, 0)`)
    
    containers
        .selectAll('.stack')
        .data(d => d.data)
        .enter()
          .append('rect')
          .classed('stack', true)
          .attr('class', 'bar')
          .attr('x', d => xScale(d.date))
          .attr('y', d => yScale(d.value + d.previousValueSum))
          .attr('width', stackWidth)
          // zero or positive - handle case when y axis min value > current drawing y
          .attr('height', d => Math.max(chartHeight - yScale(d.value), 0))
          .attr('transform', `translate(-${stackWidth / 2}, 0)`)
          .attr('fill', d => d.color);
  }

  function runDrawingAnimation() {
    const maskingRectangle = svg.append('rect')
      .style('fill', 'white')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('x', 0)
      .attr('y', 0);

    maskingRectangle.transition()
      .duration(1000)
      .ease(d3.easeQuadInOut)
      .attr('x', chartWidth)
      .on('end', () => maskingRectangle.remove());
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3
        .select(container)
        .append('svg')
        .classed('bar-chart', true);

      buildContainerGroups();
    }

    svg
      .attr('width', width)
      .attr('height', height);
  }

  function buildContainerGroups() {
    const container = svg
      .append('g')
      .classed('container-group', true)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    container
      .append('g')
      .classed('grid-container', true);

    container
      .append('g')
      .classed('x-axis-container', true);

    container
      .append('g')
      .classed('y-axis-container', true);

    container
      .append('g')
      .classed('data-bar-container', true);

    container
      .append('g')
      .classed('metadata-container', true);
  }

  function subscribeEvents() {
    svg.on('mousemove', mouseMove);
    svg.on('mouseenter', mouseEnter);
    svg.on('mouseleave', mouseLeave);
    svg.on('click', mouseClick);
  }

  function mouseMove() {
    const options = getMouseEventOptions(...d3.mouse(this));
    dispatcher.call(chartEvents.chartMouseMove, this, options);
  }

  function mouseClick() {
    const options = getMouseEventOptions(...d3.mouse(this));
    dispatcher.call(chartEvents.chartMouseClick, this, options);
  }

  function mouseEnter() {
    dispatcher.call(chartEvents.chartMouseEnter, ...d3.mouse(this));
  }

  function mouseLeave() {
    dispatcher.call(chartEvents.chartMouseLeave, ...d3.mouse(this));
  }

  function getMouseEventOptions(x, y) {
    // coords inside of chart
    x = boundNumberToRange(x - margin.left, 0, chartWidth);
    y = boundNumberToRange(y - margin.top, 0, chartHeight);

    const data = getClosestData(x);
    const selectedDate = xScale.invert(x);

    let diapasonStart = minDate;
    let diapasonEnd = getDatePlusTime(diapasonStart, stackTimeDiapason);

    while (selectedDate > diapasonEnd) {
      diapasonStart = diapasonEnd;
      diapasonEnd = getDatePlusTime(diapasonStart, stackTimeDiapason);
    }

    return { x, y, selectedDate, diapasonStart, diapasonEnd, data };
  }

  function getClosestData(x) {
    const selectedDate = xScale.invert(x);
    const stackData = chartData
      .find(d => d.dateFrom <= selectedDate &&
        selectedDate <= d.dateTo );
    return stackData.data;
  }

  exports.width = function(_width) {
    if (!arguments.length) {
      return width;
    }
    width = _width;
    return this;
  };

  exports.height = function(_height) {
    if (!arguments.length) {
      return height;
    }
    height = _height;
    return this;
  };

  exports.margin = function(_margin) {
    if (!arguments.length) {
      return margin;
    }
    margin = _margin;
    return this;
  };
  
  exports.setStackWidth = function(_setStackWidth) {
    if (!arguments.length) {
      return setStackWidth;
    }
    setStackWidth = _setStackWidth;
    return this;
  };

  exports.on = function() {
    dispatcher.on.apply(dispatcher, arguments);
    return this;
  };

  exports.maxTimeRangeDifferenceToDraw = function(_maxTimeRangeDifferenceToDraw) {
    if (!arguments.length) {
      return maxTimeRangeDifferenceToDraw;
    }
    maxTimeRangeDifferenceToDraw = _maxTimeRangeDifferenceToDraw;
    return this;
  };

  exports.stackTimeDiapason = function(_stackTimeDiapason) {
    if (!arguments.length) {
      return stackTimeDiapason;
    }
    stackTimeDiapason = _stackTimeDiapason;
    return this;
  };

  exports.xAxisTimeFormat = function(_xAxisTimeFormat) {
    if (!arguments.length) {
      return xAxisTimeFormat;
    }
    xAxisTimeFormat = _xAxisTimeFormat;
    return this;
  };

  exports.yAxisValueFormat = function(_yAxisValueFormat) {
    if (!arguments.length) {
      return yAxisValueFormat;
    }
    yAxisValueFormat = _yAxisValueFormat;
    return this;
  };

  exports.xAxisDateFrom = function(_xAxisDateFrom) {
    if (!arguments.length) {
      return xAxisDateFrom;
    }
    xAxisDateFrom = _xAxisDateFrom;
    return this;
  };

  exports.xAxisDateTo = function(_xAxisDateTo) {
    if (!arguments.length) {
      return xAxisDateTo;
    }
    xAxisDateTo = _xAxisDateTo;
    return this;
  };

  exports.yAxisValueFrom = function(_yAxisValueFrom) {
    if (!arguments.length) {
      return yAxisValueFrom;
    }
    yAxisValueFrom = _yAxisValueFrom;
    return this;
  };

  exports.curve = function(_yAxisValueTo) {
    if (!arguments.length) {
      return yAxisValueTo;
    }
    yAxisValueTo = _yAxisValueTo;
    return this;
  };

  exports.chartHeight = function() {
    return height - margin.top - margin.bottom;
  };

  exports.chartWidth = function() {
    return width - margin.left - margin.right;
  };

  return exports;
}

export {
  bar,
  chartEvents
};
