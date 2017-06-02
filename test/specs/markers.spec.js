import { markers } from '../../src/index.js';
import { mouseEventData } from '../data/mouse-event-data.js';
import * as d3 from 'd3';

describe('markers', () => {

  let markersPlugin, svg;

  beforeEach(() => {
    markersPlugin = markers();

    svg = document.createElement('svg');
    svg.className = 'svg-container';
    document.body.appendChild(svg);

    d3
      .select('.svg-container')
      .datum([]).call(markersPlugin);
  });

  afterEach(() => {
    svg.remove();
  });

  describe('render', () => {
    it('should display markers', () => {
      markersPlugin.show(mouseEventData);

      const tooltipContainer = d3
        .select(svg)
        .select('.marker-container');

      expect(tooltipContainer.empty()).toBeFalsy();
    });

    it('should hide markers', () => {
      markersPlugin.show(mouseEventData);
      markersPlugin.remove();

      const markers = d3
        .select(svg)
        .selectAll('.marker');

      expect(markers.size()).toBe(0);
    });

    it('should display marker for every data object', () => {
      markersPlugin.show(mouseEventData);

      const markerContainer = d3
        .select(svg)
        .select('.marker-container');

      const markers = markerContainer
        .selectAll('.marker');
      
      const eventDataCount = mouseEventData.data.length;
      
      expect(markers.size()).toBe(eventDataCount);
    });
  });

  describe('api', () => {
    it('should provide cx coordinates getter and setter', () => {
      const defaultCx = markersPlugin.cx();
      const testCx = data => data.x + 5;
      const setterResult = markersPlugin.cx(testCx);
      const newCx = markersPlugin.cx();

      expect(defaultCx).not.toBe(newCx);
      expect(testCx).toBe(newCx);
      expect(setterResult).toBe(markersPlugin);
    });

    it('should provide cy coordinates getter and setter', () => {
      const defaultCy = markersPlugin.cy();
      const testCy = data => data.y + 5;
      const setterResult = markersPlugin.cy(testCy);
      const newCy = markersPlugin.cy();

      expect(defaultCy).not.toBe(newCy);
      expect(testCy).toBe(newCy);
      expect(setterResult).toBe(markersPlugin);
    });

    it('should provide radius function getter and setter', () => {
      const defaultRadius = markersPlugin.radius();
      const testRadius = data => data.value * 2;
      const setterResult = markersPlugin.radius(testRadius);
      const newRadius = markersPlugin.radius();

      expect(defaultRadius).not.toBe(newRadius);
      expect(testRadius).toBe(newRadius);
      expect(setterResult).toBe(markersPlugin);
    });

    it('should provide fill color function getter and setter', () => {
      const defaultFill = markersPlugin.fill();
      const testFill = () => 'green';
      const setterResult = markersPlugin.fill(testFill);
      const newFill = markersPlugin.fill();

      expect(defaultFill).not.toBe(newFill);
      expect(testFill).toBe(newFill);
      expect(setterResult).toBe(markersPlugin);
    });

    it('should provide stroke function getter and setter', () => {
      const defaultStroke = markersPlugin.stroke();
      const testStroke = () => 'blue';
      const setterResult = markersPlugin.stroke(testStroke);
      const newStroke = markersPlugin.stroke();

      expect(defaultStroke).not.toBe(newStroke);
      expect(testStroke).toBe(newStroke);
      expect(setterResult).toBe(markersPlugin);
    });

    it('should provide strokeWidth function getter and setter', () => {
      const defaultStrokeWidth = markersPlugin.strokeWidth();
      const testStrokeWidth = () => 1;
      const setterResult = markersPlugin.strokeWidth(testStrokeWidth);
      const newStrokeWidth = markersPlugin.strokeWidth();

      expect(defaultStrokeWidth).not.toBe(newStrokeWidth);
      expect(testStrokeWidth).toBe(newStrokeWidth);
      expect(setterResult).toBe(markersPlugin);
    });

    it('should provide sort function getter and setter', () => {
      const defaultSort = markersPlugin.sort();
      const testSort = (a, b) => a.value < b.value;
      const setterResult = markersPlugin.sort(testSort);
      const newSort = markersPlugin.sort();

      expect(defaultSort).not.toBe(newSort);
      expect(testSort).toBe(newSort);
      expect(setterResult).toBe(markersPlugin);
    });
  });
});
