import * as d3 from 'd3';

import { colorProvider } from '../utils/color-provider';
import eventThreshold from '../utils/event-threshold';

const chartEvents = {
  chartMouseEnter: 'chartMouseEnter',
  chartMouseLeave: 'chartMouseLeave',
  chartMouseMove: 'chartMouseMove',
  chartMouseClick: 'chartMouseClick'
};

function stackBar({
    width = 700, height = 120,
    margin = { top: 20, right: 30, bottom: 40, left: 40 },
    backgroundColor = '#CCC',
    maxTimeRangeDifferenceToDraw = 1000 * 60 * 60 * 24 * 1.5,
    xAxisTimeFormat,
    mouseMoveTimeTreshold = 20
  } = {}) {

  let svg;
  let chartWidth, chartHeight;
  let xAxis;
  let xScale;

  let chartData, diapasons;

  const colors = colorProvider();
  let events = eventThreshold(mouseMoveTimeTreshold);

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

      drawBackground();
      drawAxis();
      drawRectangles();
      runDrawingAnimation();

      subscribeEvents();
    });
  }

  function initializeChartData(data) {
    diapasons = getStackDiapasons(data);
    chartData = data;
  }

  function createScales() {
    const chartDates = chartData.map(p => p.date);

    const xMin = d3.min(chartDates);
    const xMax = d3.max(chartDates);

    xScale = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, chartWidth]);
  }

  function createAxis() {
    xAxis = d3
      .axisBottom(xScale);

    if (xAxisTimeFormat) {
      xAxis.tickFormat(xAxisTimeFormat);
    }
  }

  function drawAxis() {
    svg
      .select('.x-axis-container')
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);
  }

  function drawRectangles() {
    const stacks = svg
      .select('.data-stacks-container')
      .selectAll('.stack')
      // reverse order - first path should be drawn above last
      .data(diapasons);

    stacks
      .enter()
        .append('rect')
        .classed('stack', true)
        .style('fill', d => d.color)
      .merge(stacks)
        .attr('x', d => Math.trunc(xScale(d.from)))
        .attr('y', 0)
        .attr('width', d => Math.ceil(xScale(d.to) - xScale(d.from)))
        .attr('height', chartHeight);
    
    stacks
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
        .classed('stack-bar', true);

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
      .classed('background-container', true);

    container
      .append('g')
      .classed('x-axis-container', true);

    container
      .append('g')
      .classed('data-stacks-container', true);

    container
      .append('g')
      .classed('metadata-container', true);
  }

  function drawBackground() {
    const background = svg
      .select('.background-container');

    background
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('fill', backgroundColor)
      .classed('background', true);
  }

  function subscribeEvents() {
    svg.on('mousemove', mouseMove);
    svg.on('mouseenter', mouseEnter);
    svg.on('mouseleave', mouseLeave);
    svg.on('click', mouseClick);
  }

  function mouseMove() {
    const mouse = d3.mouse(this);
    events.call(dispatchMouseMoveEvent.bind(this, mouse));
  }

  function dispatchMouseMoveEvent(mouse) {
    const options = getMouseEventOptions(...mouse);
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
    events.clear();
    dispatcher.call(chartEvents.chartMouseLeave, ...d3.mouse(this));
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
    const selectedDate = xScale.invert(x);

    const closestData = diapasons
      .find(d => d.from <= selectedDate && selectedDate <= d.to);
    
    if (closestData) {
      closestData.interpolatedDate = selectedDate;
    }

    return closestData ? [closestData] : [];
  }

  function getStackDiapasons(data) {
    if (!Array.isArray(data) || !data.length) {
      return [];
    }

    const chartDiapasons = [];
    data.reduce((prev, curr) => {
      const avgDate = new Date((prev.date.getTime() + curr.date.getTime()) / 2);

      const buildDiapason = data => ({
        color: data.color || colors.next().value,
        name: data.name,
        value: data.value,
        from: data.date,
        to: data.date
      });

      const leftDiapason = buildDiapason(prev);
      const rightDiapason = buildDiapason(curr);

      leftDiapason.to = Math.min(new Date(prev.date.getTime() + maxTimeRangeDifferenceToDraw), avgDate);
      rightDiapason.from = Math.max(new Date(curr.date.getTime() - maxTimeRangeDifferenceToDraw), avgDate);

      chartDiapasons.push(leftDiapason, rightDiapason);
      return curr;
    });
    return chartDiapasons;
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

  exports.backgroundColor = function(_backgroundColor) {
    if (!arguments.length) {
      return backgroundColor;
    }
    backgroundColor = _backgroundColor;
    return this;
  }

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

  exports.xAxisTimeFormat = function(_xAxisTimeFormat) {
    if (!arguments.length) {
      return xAxisTimeFormat;
    }
    xAxisTimeFormat = _xAxisTimeFormat;
    return this;
  };

  exports.mouseMoveTimeTreshold = function(_mouseMoveTimeTreshold) {
    if (!arguments.length) {
      return mouseMoveTimeTreshold;
    }
    mouseMoveTimeTreshold = _mouseMoveTimeTreshold;

    events.clear();
    events = eventThreshold(mouseMoveTimeTreshold);
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
  stackBar,
  chartEvents
};
