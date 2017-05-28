import * as d3 from 'd3';

function verticalDivider({
    height = 440
  } = {}) {

  let svg;

  function exports(selection) {
    selection.each(function(data) {
      buildSvg(this);
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container)
        .append('g')
        .classed('divider-container', true);
    }

    svg
      .append('line')
      .classed('divider', true)
      .attr('y1', 0)
      .attr('y2', height);
  }

  exports.remove = function() {
    svg.style('display', 'none');
    return this;
  };

  exports.show = function() {
    svg.style('display', 'block');
    return this;
  };

  exports.update = function({ x }) {
    svg
      .select('.divider')
      .attr('x1', x)
      .attr('x2', x);
    return this;
  };

  exports.height = function(_height) {
    if (!arguments.length) {
      return height;
    }
    height = _height;
    return this;
  };

  return exports;
}

export default verticalDivider;
