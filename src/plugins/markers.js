import * as d3 from 'd3';

function markers({
    cx = data => data.interpolatedX || data.x,
    cy = data => data.interpolatedY || data.y,
    radius = data => 5,
    fill = data => 'white',
    stroke = data => data.color || 'red',
    strokeWidth = data => 2,
    sort = (a, b) => 0
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
        .classed('marker-container', true);
    }
  }

  exports.remove = function() {
    svg
      .selectAll('.marker')
      .remove();
    
    return this;
  };

  exports.show = function({ data }) {
    const markers = svg
      .selectAll('.marker')
      // reverse order - first markers should be drawn above last
      .data(data.slice().sort(sort).reverse());

    markers
      .enter()
        .append('circle')
        .classed('marker', true)
      .merge(markers)
        .attr('cx', d => cx(d))
        .attr('cy', d => cy(d))
        .attr('r', d => radius(d))
        .style('fill', d => fill(d))
        .style('stroke', d => stroke(d))
        .style('stroke-width', d => strokeWidth(d));

    markers
      .exit()
      .remove();
    
    return this;
  };

  exports.cx = function(_cx) {
    if (!arguments.length) {
      return cx;
    }
    cx = _cx;
    return this;
  };

  exports.cy = function(_cy) {
    if (!arguments.length) {
      return cy;
    }
    cy = _cy;
    return this;
  };

  exports.radius = function(_radius) {
    if (!arguments.length) {
      return radius;
    }
    radius = _radius;
    return this;
  };

  exports.fill = function(_fill) {
    if (!arguments.length) {
      return fill;
    }
    fill = _fill;
    return this;
  };

  exports.stroke = function(_stroke) {
    if (!arguments.length) {
      return stroke;
    }
    stroke = _stroke;
    return this;
  };

  exports.strokeWidth = function(_strokeWidth) {
    if (!arguments.length) {
      return strokeWidth;
    }
    strokeWidth = _strokeWidth;
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

export default markers;
