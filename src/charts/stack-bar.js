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
    marginBetweenStacks = 10,
    backgroundColor = '#CCC',
    maxTimeRangeDifferenceToDraw = 1000 * 60 * 60 * 24 * 1.5,
    xAxisTimeFormat,
    mouseMoveTimeTreshold = 20,
    xAxisDateFrom, xAxisDateTo
  } = {}) {

  let svg;
  let chartWidth, chartHeight;
  let stackHeight;
  let xAxis;
  let xScale;

  let diapasons;

  const colors = colorProvider();
  const diapasonColors = {};
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
    const numberOfStacks = data.length;
    stackHeight = (chartHeight - (numberOfStacks - 1) * marginBetweenStacks) / numberOfStacks;
    diapasons = data.map(d => getStackDiapasons(d));
  }

  function createScales() {
    const allChartDiapasons = [].concat.apply([], diapasons.map(d => d.chartDiapasons))// .map(d => [d.from, d.to]);
    const allChartDates = allChartDiapasons.map(d => d.from).concat(allChartDiapasons.map(d => d.to));

    const xMin = xAxisDateFrom || d3.min(allChartDates);
    const xMax = xAxisDateTo || d3.max(allChartDates);

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
      .selectAll('.stack-holder')
      // reverse order - first path should be drawn above last
      .data(diapasons);

    const computeXPosition = date =>
      moveNumToRange(Math.trunc(xScale(date)), 0, chartWidth);

    const stackHolders = stacks
      .enter()
        .append('g')
        .classed('stack-holder', true)
      .merge(stacks)
        .attr('transform', (d, i) => `translate(0, ${i * (stackHeight + marginBetweenStacks)})`)
        .attr('width', chartWidth)
        .attr('height', stackHeight);
        
    stackHolders.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', chartWidth)
      .attr('height', stackHeight)
      .style('fill', d => d.backgroundColor)

    stackHolders.selectAll('.stack-holder')
      .data(d => d.chartDiapasons)

      .enter()
        .append('rect')
        .classed('stack-diapason', true)
        .attr('x', d => computeXPosition(d.from))
        .attr('y', () => 0)
        .style('fill', (d) => d.color)
        .attr('width', d => moveNumToRange(Math.ceil(xScale(d.to) - xScale(d.from)),
          0, chartWidth - computeXPosition(d.from)))
        .attr('height', stackHeight);  
    
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

  function moveNumToRange(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function getMouseEventOptions(x, y) {
    // coords inside of chart
    x = moveNumToRange(x - margin.left, 0, chartWidth);
    y = moveNumToRange(y - margin.top, 0, chartHeight);

    const data = getClosestData(x);
    const selectedDate = xScale.invert(x);

    return { x, y, selectedDate, data };
  }

  function getClosestData(x) {
    const selectedDate = xScale.invert(x);
    const closestData = [];

    diapasons.forEach(d => {
      const selectedDiapason = {
        name: d.name,
        interpolatedDate: selectedDate
      };
      const closestDiapason = d.chartDiapasons
        .find(d => d.from <= selectedDate && selectedDate <= d.to)
      if (closestDiapason) {
        Object.assign(selectedDiapason, closestDiapason);
      }
      closestData.push(selectedDiapason);
    });

    return closestData;
  }

  function getStackDiapasons({ data, backgroundColor, name }) {
    if (!Array.isArray(data) || !data.length) {
      return [];
    }

    const buildDiapason = (data, from, to) => ({
      color: getDiapasonColor(data),
      value: data.value,
      from: from || data.date,
      to: to || data.date
    });

    const buildLeftDiapason = data => 
      buildDiapason(data, new Date(data.date.getTime() - maxTimeRangeDifferenceToDraw), data.date);
    const buildRightDiapason = data => 
      buildDiapason(data, data.date, new Date(data.date.getTime() + maxTimeRangeDifferenceToDraw));

    const sortedData = data
      .sort((d1, d2) => d1.date - d2.date);
    const chartDiapasons = [];

    chartDiapasons.push(buildLeftDiapason(sortedData[0]));

    if (sortedData.length > 1) {
      sortedData
        .reduce((prev, curr) => {
          const avgDate = new Date((prev.date.getTime() + curr.date.getTime()) / 2);

          const leftDiapason = buildDiapason(prev, prev.date, d3.min([new Date(prev.date.getTime() + maxTimeRangeDifferenceToDraw), avgDate]));
          const rightDiapason = buildDiapason(curr, d3.max([new Date(curr.date.getTime() - maxTimeRangeDifferenceToDraw), avgDate]), curr.date);

          chartDiapasons.push(leftDiapason, rightDiapason);

          return curr;
        });
    }

    chartDiapasons.push(buildRightDiapason(sortedData[sortedData.length - 1]));
    return { chartDiapasons, backgroundColor, name };
  }

  function getDiapasonColor(diapason) {
    if (diapason.color) {
      return diapason.color;
    }
    if (diapasonColors[diapason.name]) {
      return diapasonColors[diapason.name];
    }
    diapasonColors[diapason.name] = colors.next().value;
    return diapasonColors[diapason.name];
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

  exports.xAxisDateFrom = function(_xAxisDateFrom) {
    if (!arguments.length) {
      return xAxisDateFrom;
    }
    xAxisDateFrom = _xAxisDateFrom;
    return this;
  }

  exports.xAxisDateTo = function(_xAxisDateTo) {
    if (!arguments.length) {
      return xAxisDateTo;
    }
    xAxisDateTo = _xAxisDateTo;
    return this;
  }

  return exports;
}

export {
  stackBar,
  chartEvents
};
