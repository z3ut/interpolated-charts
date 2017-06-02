import { line, chartEvents } from '../../src/index.js';
import { lineChartData } from '../data/line-chart.js';
import * as d3 from 'd3';

describe('line chart', () => {

  let lineChart, div;

  beforeEach(() => {
    lineChart = line();

    div = document.createElement('div');
    div.className = 'chart';
    document.body.appendChild(div);

    d3
      .select('.chart')
      .datum(lineChartData).call(lineChart);
  });

  afterEach(() => {
    div.remove();
  });

  describe('render', () => {
    it('should create svg', () => {
      const svg = d3
        .select(div)
        .select('.line-chart');

      expect(svg.empty()).toBeFalsy();
    });

    it('should create group countainers', () => {
      const svg = d3
        .select(div)
        .select('.line-chart');

      expect(svg.select('.grid-container').empty()).toBeFalsy();
      expect(svg.select('.x-axis-container').empty()).toBeFalsy();
      expect(svg.select('.y-axis-container').empty()).toBeFalsy();
      expect(svg.select('.data-lines-container').empty()).toBeFalsy();
      expect(svg.select('.metadata-container').empty()).toBeFalsy();
    });

    it('should draw grid', () => {
      const horizontalGridLine = d3
        .select(div)
        .select('.horizontal-grid-line');
      
      const verticallGridLine = d3
        .select(div)
        .select('.vertical-grid-line');
      
      expect(horizontalGridLine.empty()).toBeFalsy();
      expect(verticallGridLine.empty()).toBeFalsy();
    });

    it('should draw axises', () => {
      const xAxis = d3
        .select(div)
        .select('.x-axis-container');
      
      const yAxis = d3
        .select(div)
        .select('.y-axis-container');
      
      expect(xAxis.empty()).toBeFalsy();
      expect(yAxis.empty()).toBeFalsy();
    });

    it('should draw chart line for every dataset', () => {
      const lines = d3
        .select(div)
        .select('.data-lines-container')
        .selectAll('.line');
      
      const chartDataSetCount = lineChartData.length;
      
      expect(lines.size()).toBe(chartDataSetCount);
    });
  });

  describe('events', () => {
    it('should dispatch mousemove', () => {
      const svg = d3
        .select(div)
        .select('.line-chart');

      const callback = jasmine.createSpy('mouseMoveCallback');
      lineChart.on(chartEvents.chartMouseMove, callback);
      svg.dispatch('mousemove');

      expect(callback.calls.count()).toBe(1);
    });

    it('should dispatch mouseenter', () => {
      const svg = d3
        .select(div)
        .select('.line-chart');

      const callback = jasmine.createSpy('mouseEnterCallback');
      lineChart.on(chartEvents.chartMouseEnter, callback);
      svg.dispatch('mouseenter');

      expect(callback.calls.count()).toBe(1);
    });

    it('should dispatch mouseleave', () => {
      const svg = d3
        .select(div)
        .select('.line-chart');

      const callback = jasmine.createSpy('mouseleaveCallback');
      lineChart.on(chartEvents.chartMouseLeave, callback);
      svg.dispatch('mouseleave');

      expect(callback.calls.count()).toBe(1);
    });

    it('should dispatch click', () => {
      const svg = d3
        .select(div)
        .select('.line-chart');

      const callback = jasmine.createSpy('clickCallback');
      lineChart.on(chartEvents.chartMouseClick, callback);
      svg.dispatch('click');

      expect(callback.calls.count()).toBe(1);
    });
  });

  describe('api', () => {
    it('should provide width getter and setter', () => {
      const defaultWidth = lineChart.width();
      const testWidth = 900;
      const setterResult = lineChart.width(testWidth);
      const newWidth = lineChart.width();

      expect(defaultWidth).not.toBe(newWidth);
      expect(testWidth).toBe(newWidth);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide height getter and setter', () => {
      const defaultHeight = lineChart.height();
      const testHeight = 550;
      const setterResult = lineChart.height(testHeight);
      const newHeight = lineChart.height();

      expect(defaultHeight).not.toBe(newHeight);
      expect(testHeight).toBe(newHeight);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide margin getter and setter', () => {
      const defaultMargin = lineChart.margin();
      const testMargin = { top: 30, right: 40, bottom: 20, left: 50 };
      const setterResult = lineChart.margin(testMargin);
      const newMargin = lineChart.margin();

      expect(defaultMargin).not.toBe(newMargin);
      expect(testMargin).toBe(newMargin);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide maxTimeRangeDifferenceToDraw getter and setter', () => {
      const defaultMaxTimeRangeDifferenceToDraw = lineChart.maxTimeRangeDifferenceToDraw();
      const testMaxTimeRangeDifferenceToDraw = 1000 * 60 * 60;
      const setterResult = lineChart.maxTimeRangeDifferenceToDraw(testMaxTimeRangeDifferenceToDraw);
      const newMaxTimeRangeDifferenceToDraw = lineChart.maxTimeRangeDifferenceToDraw();

      expect(defaultMaxTimeRangeDifferenceToDraw).not.toBe(newMaxTimeRangeDifferenceToDraw);
      expect(testMaxTimeRangeDifferenceToDraw).toBe(newMaxTimeRangeDifferenceToDraw);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide yAxisValueFormat getter and setter', () => {
      const defaultYAxisValueFormat = lineChart.yAxisValueFormat();
      const testYAxisValueFormat = value => `${value}°C`;
      const setterResult = lineChart.yAxisValueFormat(testYAxisValueFormat);
      const newYAxisValueFormat = lineChart.yAxisValueFormat();

      expect(defaultYAxisValueFormat).not.toBe(newYAxisValueFormat);
      expect(testYAxisValueFormat).toBe(newYAxisValueFormat);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide xAxisTimeFormat getter and setter', () => {
      const defaultXAxisTimeFormat = lineChart.xAxisTimeFormat();
      const testXAxisTimeFormat = d3.timeFormat('%d-%m %H');
      const setterResult = lineChart.xAxisTimeFormat(testXAxisTimeFormat);
      const newXAxisTimeFormat = lineChart.xAxisTimeFormat();

      expect(defaultXAxisTimeFormat).not.toBe(newXAxisTimeFormat);
      expect(testXAxisTimeFormat).toBe(newXAxisTimeFormat);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide curve getter and setter', () => {
      const defaultCurve = lineChart.curve();
      const testCurve = d3.curveCatmullRom;
      const setterResult = lineChart.curve(testCurve);
      const newCurve = lineChart.curve();

      expect(defaultCurve).not.toBe(newCurve);
      expect(testCurve).toBe(newCurve);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide interpolationMaxIterationCount getter and setter', () => {
      const defaultInterpolationMaxIterationCount = lineChart.interpolationMaxIterationCount();
      const testInterpolationMaxIterationCount = 10;
      const setterResult = lineChart.interpolationMaxIterationCount(testInterpolationMaxIterationCount);
      const newInterpolationMaxIterationCount = lineChart.interpolationMaxIterationCount();

      expect(defaultInterpolationMaxIterationCount).not.toBe(newInterpolationMaxIterationCount);
      expect(testInterpolationMaxIterationCount).toBe(newInterpolationMaxIterationCount);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide interpolationAccuracy getter and setter', () => {
      const defaultInterpolationAccuracy = lineChart.interpolationAccuracy();
      const testInterpolationAccuracy = 0.01;
      const setterResult = lineChart.interpolationAccuracy(testInterpolationAccuracy);
      const newInterpolationAccuracy = lineChart.interpolationAccuracy();

      expect(defaultInterpolationAccuracy).not.toBe(newInterpolationAccuracy);
      expect(testInterpolationAccuracy).toBe(newInterpolationAccuracy);
      expect(setterResult).toBe(lineChart);
    });

    it('should provide mouseMoveTimeTreshold getter and setter', () => {
      const defaultMouseMoveTimeTreshold = lineChart.mouseMoveTimeTreshold();
      const testMouseMoveTimeTreshold = 100;
      const setterResult = lineChart.mouseMoveTimeTreshold(testMouseMoveTimeTreshold);
      const newMouseMoveTimeTreshold = lineChart.mouseMoveTimeTreshold();

      expect(defaultMouseMoveTimeTreshold).not.toBe(newMouseMoveTimeTreshold);
      expect(testMouseMoveTimeTreshold).toBe(newMouseMoveTimeTreshold);
      expect(setterResult).toBe(lineChart);
    });

    it('should compute chart width', () => {
      const margin = lineChart.margin();
      const width = lineChart.width();
      const chartWidth = lineChart.chartWidth();

      expect(chartWidth).toBe(width - margin.left - margin.right);
    });

    it('should compute chart height', () => {
      const margin = lineChart.margin();
      const height = lineChart.height();
      const chartHeight = lineChart.chartHeight();

      expect(chartHeight).toBe(height - margin.top - margin.bottom);
    });

    it('should provide subscription on events', () => {
      const eventHandler = () => {};
      lineChart
        .on(chartEvents.chartMouseEnter, eventHandler)
        .on(chartEvents.chartMouseLeave, eventHandler)
        .on(chartEvents.chartMouseMove, eventHandler)
        .on(chartEvents.chartMouseClick, eventHandler);
    });
  });
});
