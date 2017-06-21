import { verticalDivider } from '../../src/index.js';
import { mouseEventData } from '../data/mouse-event.js';
import * as d3 from 'd3';

describe('tooltip', () => {

  let verticalDividerPlugin, svg;

  beforeEach(() => {
    verticalDividerPlugin = verticalDivider();

    svg = document.createElement('svg');
    svg.className = 'svg-container';
    document.body.appendChild(svg);

    d3
      .select('.svg-container')
      .datum([]).call(verticalDividerPlugin);
  });

  afterEach(() => {
    svg.remove();
  });

  describe('render', () => {
    it('should display vertical divider', () => {
      verticalDividerPlugin.show(mouseEventData);

      const dividerLine = d3
        .select(svg)
        .select('.divider');

      expect(dividerLine.empty()).toBeFalsy();
    });

    it('should hide vertical divider', () => {
      verticalDividerPlugin.show();
      verticalDividerPlugin.remove();

      const dividerContainer = d3
        .select(svg)
        .select('.divider-container');

      expect(dividerContainer.style('display')).toBe('none');
    });

    it('should update vertical divider position', () => {
      const xPosition = 20;
      verticalDividerPlugin.show();
      verticalDividerPlugin.update({ x: xPosition });

      const dividerLine = d3
        .select(svg)
        .select('.divider');

      expect(+dividerLine.attr('x1')).toBe(xPosition);
      expect(+dividerLine.attr('x2')).toBe(xPosition);
    });
  });

  describe('api', () => {
    it('should provide height getter and setter', () => {
      const defaultHeight = verticalDividerPlugin.height();
      const testHeight = 900;
      const setterResult = verticalDividerPlugin.height(testHeight);
      const newHeight = verticalDividerPlugin.height();

      expect(defaultHeight).not.toBe(newHeight);
      expect(testHeight).toBe(newHeight);
      expect(setterResult).toBe(verticalDividerPlugin);
    });
  });
});
