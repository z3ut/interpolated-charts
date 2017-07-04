import * as d3 from 'd3';

function tooltip({
    chartHeight = 440, chartWidth = 700, tooltipWidth = 220,
    horizontalMouseMargin = 40, verticalBorderMargin = 10,
    headerFormatter = selectedDate => d3.timeFormat('%Y-%d-%m %H:%M:%S')(selectedDate),
    topicFormatter = data => data.name,
    valueFormatter = data => d3.format('.1f')(data.interpolatedValue),
    sort = () => 0
  } = {}) {

  let svg;

  function exports(selection) {
    selection.each(function() {
      buildSvg(this);
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container)
        .append('g')
        .classed('tooltip-container', true);
    }
  }

  exports.remove = function() {
    svg
      .select('.tooltip')
      .remove();

    return this;
  };

  exports.show = function({ x, y, selectedDate, data }) {
    exports.remove();

    svg
      .append('g')
      .classed('tooltip', true)
      .append('rect')
      .attr('width', tooltipWidth);

    const foreignObject = svg
      .select('.tooltip')
      .append('foreignObject')
      .classed('foreign-object', true)
      .attr('width', tooltipWidth);

    const { divHeight } = createToltipDiv(foreignObject, selectedDate, data);

    svg
      .select('.tooltip foreignObject')
      .attr('height', divHeight);

    svg
      .select('.tooltip rect')
      .attr('height', divHeight);

    const xPosition = x > chartWidth / 2 ?
      x - tooltipWidth - horizontalMouseMargin :
      x + horizontalMouseMargin;
    const yPosition = y + divHeight > chartHeight - verticalBorderMargin ?
      chartHeight - divHeight - verticalBorderMargin :
      y;

    svg
      .select('.tooltip')
      .attr('transform', `translate(${xPosition}, ${yPosition})`);
    
    return this;
  };

  function createToltipDiv(container, selectedDate, data) {
    const div = container
      .append('xhtml:div')
      .append('div')
      .classed('tooltip-container', true);

    div
      .append('div')
      .classed('tooltip-header', true)
      .append('p')
      .html(headerFormatter(selectedDate, data));
    div
      .append('hr');

    data.slice().sort(sort).forEach(d => {
      const container = div
        .append('div')
        .classed('topic', true);

      container
        .append('div')
        .classed('circle', true)
        .style('background-color', d.color);

      container
        .append('div')
        .classed('topic-name', true)
        .html(topicFormatter(d));

      container
        .append('div')
        .classed('topic-value', true)
        .html(valueFormatter(d));
    });

    const divHeight = div
      .node()
      .getBoundingClientRect()
      .height;

    return {
      div,
      divHeight
    };
  }

  exports.chartHeight = function(_chartHeight) {
    if (!arguments.length) {
      return chartHeight;
    }
    chartHeight = _chartHeight;
    return this;
  };

  exports.chartWidth = function(_chartWidth) {
    if (!arguments.length) {
      return chartWidth;
    }
    chartWidth = _chartWidth;
    return this;
  };

  exports.tooltipWidth = function(_tooltipWidth) {
    if (!arguments.length) {
      return tooltipWidth;
    }
    tooltipWidth = _tooltipWidth;
    return this;
  };

  exports.horizontalMouseMargin = function(_horizontalMouseMargin) {
    if (!arguments.length) {
      return horizontalMouseMargin;
    }
    horizontalMouseMargin = _horizontalMouseMargin;
    return this;
  };

  exports.verticalBorderMargin = function(_verticalBorderMargin) {
    if (!arguments.length) {
      return verticalBorderMargin;
    }
    verticalBorderMargin = _verticalBorderMargin;
    return this;
  };


  exports.headerFormatter = function(_headerFormatter) {
    if (!arguments.length) {
      return headerFormatter;
    }
    headerFormatter = _headerFormatter;
    return this;
  };

  exports.topicFormatter = function(_topicFormatter) {
    if (!arguments.length) {
      return topicFormatter;
    }
    topicFormatter = _topicFormatter;
    return this;
  };

  exports.valueFormatter = function(_valueFormatter) {
    if (!arguments.length) {
      return valueFormatter;
    }
    valueFormatter = _valueFormatter;
    return this;
  };

  exports.sort = function(_sort) {
    if (!arguments.length) {
      return sort;
    }
    sort = _sort;
    return this;
  };

  return exports;
}

export default tooltip;
