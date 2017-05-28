import * as d3 from 'd3';

import { colorProvider } from '../utils/color-provider';
import getYPointFromPath from '../utils/svg-calculating';

const chartEvents = {
  chartMouseEnter: 'chartMouseEnter',
  chartMouseLeave: 'chartMouseLeave',
  chartMouseMove: 'chartMouseMove',
  chartMouseClick: 'chartMouseClick'
};

function line({
    width = 700, height = 500,
    margin = { top: 20, right: 30, bottom: 40, left: 40 },
    maxTimeRangeDifferenceToDraw = 1000 * 60 * 60 * 24 * 1.5,
    xAxisTimeFormat, yAxisValueFormat,
    curve = d3.curveBasis
  } = {}) {

  let svg;
  let chartWidth, chartHeight;
  let xAxis, yAxis;
  let xScale, yScale;

  let chartData;

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
      drawLines();
      runDrawingAnimation();

      subscribeEvents();
    });
  }

  function initializeChartData(data) {
    chartData = data.map(d => {
      d.color = d.color || colors.getNextColor();
      d.segregatedData = getSegregatedData(d.data);
      d.chartDiapasons = getDiapasonsWithData(d.data);
      return d;
    });
  }

  function createScales() {
    const chartPoints = [].concat(...chartData.map(c => c.data));
    const chartDates = chartPoints.map(p => p.date);
    const chartValues = chartPoints.map(p => p.value);

    const xMin = d3.min(chartDates);
    const xMax = d3.max(chartDates);
    const yMin = d3.min(chartValues);
    const yMax = d3.max(chartValues);

    xScale = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, chartWidth]);

    // add some free space at Y scale borders
    const yScaleIndentation = (yMax - yMin) * 0.05;
    yScale = d3
      .scaleLinear()
      .domain([yMin - yScaleIndentation, yMax + yScaleIndentation])
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

  function drawLines() {
    const valueLine = d3
      .line()
      .curve(curve)
      // end line segment if current point falsy (null)
      .defined(d => d)
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    const lines = svg
      .select('.data-lines-container')
      .selectAll('.line')
      // reverse order - first path should be drawn above last
      .data(chartData.reverse());

    lines
      .enter()
        .append('path')
        .classed('line', true)
        .style('stroke-width', 2)
        .style('fill', 'none')
      .merge(lines)
        .style('stroke', d => d.color)
        .attr('d', d => valueLine(d.segregatedData));

    lines
      .exit()
      .remove();
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
        .classed('line-chart', true);

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
      .classed('data-lines-container', true);

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
    dispatcher.call(chartEvents.chartMouseEnter);
  }

  function mouseLeave() {
    dispatcher.call(chartEvents.chartMouseLeave);
  }

  function getMouseEventOptions(x, y) {
    const moveNumToRange = (num, min, max) => Math.min(Math.max(num, min), max);
    // coords inside of chart
    x = moveNumToRange(x - margin.left, 0, chartWidth);
    y = moveNumToRange(y - margin.top, 0, chartHeight);

    const data = getClosestData(x);
    const selectedDate = xScale.invert(x);

    return { x, y, selectedDate, data };
  }

  function getClosestData(x) {
    const closestData = [];
    const selectedDate = xScale.invert(x);

    svg
      .selectAll('.line')
      .each(function(data) {
        const closesPoint = data.data.reduce((prev, curr) => {
          return !curr || Math.abs(prev.date - selectedDate) < Math.abs(curr.date - selectedDate) ?
            prev :
            curr;
        });

        // closest point does not fall into path drawing range
        if (!data.chartDiapasons.some(d => d.from <= selectedDate && selectedDate <= d.to)) {
          return;
        }

        const y = getYPointFromPath(this, x);
        closesPoint.x = xScale(closesPoint.date);
        closesPoint.y = yScale(closesPoint.value);
        closesPoint.interpolatedX = x;
        closesPoint.interpolatedY = y;
        closesPoint.interpolatedDate = xScale.invert(x);
        closesPoint.interpolatedValue = yScale.invert(y);
        closesPoint.name = data.name;
        closesPoint.color = data.color;
        closestData.push(closesPoint);
      });
    return closestData;
  }

  function getDiapasonsWithData(data) {
    const chartDiapasons = [];
    data.reduce((prev, curr) => {
      if (curr.date - prev.date < maxTimeRangeDifferenceToDraw) {
        // TODO: don't add neighbours, change existing point
        chartDiapasons.push({ from: prev.date, to: curr.date });
      }
      return curr;
    });
    return chartDiapasons;
  }

  function getSegregatedData(data) {
    const segregatedData = [];
    data.forEach((d, i, arr) => {
      if (i === 0 || i === arr.length - 1) {
        segregatedData.push(arr[i]);
        return;
      }

      const isBreakBetween = (p1, p2) => p1.date - p2.date > maxTimeRangeDifferenceToDraw;

      if (isBreakBetween(arr[i], arr[i - 1])) {
        segregatedData.push(null);
      }

      segregatedData.push(arr[i]);

      if (isBreakBetween(arr[i + 1], arr[i])) {
        segregatedData.push(null);
      }
    });

    return segregatedData;
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

  exports.on = function() {
    dispatcher.on.apply(dispatcher, arguments);
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

  exports.curve = function(_curve) {
    if (!arguments.length) {
      return curve;
    }
    curve = _curve;
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
  line,
  chartEvents
};
