import { stackBar, chartEvents } from '../../src/charts/stack-bar';
import { stackBarMultipleData, stackBarEmptyData } from '../data/stack-bar.js';
import * as d3 from 'd3';

describe('stack chart', () => {

  describe('special data input', () => {

    let stackBarChart, div;

    beforeEach(() => {
      stackBarChart = stackBar();

      div = document.createElement('div');
      div.className = 'chart';
      document.body.appendChild(div);
    });

    afterEach(() => {
      div.remove();
    });

    it('should handle input with empty data array', () => {
      d3
        .select('.chart')
        .datum(stackBarEmptyData)
        .call(stackBarChart);
    });
  });

  describe('correct data input', () => {
    let stackBarChart, div;

    beforeEach(() => {
      stackBarChart = stackBar();

      div = document.createElement('div');
      div.className = 'chart';
      document.body.appendChild(div);

      d3
        .select('.chart')
        .datum(stackBarMultipleData)
        .call(stackBarChart);
    });

    afterEach(() => {
      div.remove();
    });

    describe('render', () => {
      it('should create svg', () => {
        const svg = d3
          .select(div)
          .select('.stack-bar');

        expect(svg.empty()).toBeFalsy();
      });

      it('should create group countainers', () => {
        const svg = d3
          .select(div)
          .select('.stack-bar');

        expect(svg.select('.background-container').empty()).toBeFalsy();
        expect(svg.select('.x-axis-container').empty()).toBeFalsy();
        expect(svg.select('.data-stacks-container').empty()).toBeFalsy();
        expect(svg.select('.metadata-container').empty()).toBeFalsy();
      });

      it('should draw x axis', () => {
        const xAxis = d3
          .select(div)
          .select('.x-axis-container');
        
        expect(xAxis.empty()).toBeFalsy();
      });

      it('should draw stack holders for every dataset', () => {
        const stackHolders = d3
          .select(div)
          .select('.data-stacks-container')
          .selectAll('.stack-holder');
        
        const stackDataSetCount = stackBarMultipleData.length;
        expect(stackHolders.size()).toBe(stackDataSetCount);
      });

      it('should draw 2 rect for every stack dataset', () => {
        const stackHolders = d3
          .select(div)
          .select('.data-stacks-container')
          .selectAll('.stack-holder');
        
        stackHolders.each(function (d, i) {
          const rectangles = d3
            .select(this)
            .selectAll('.stack-diapason');
          const dataSetCount = stackBarMultipleData[i].data.length;
          expect(rectangles.size()).toBe(dataSetCount * 2);
        });
      });
    });

    describe('events', () => {
      it('should dispatch mousemove', () => {
        const svg = d3
          .select(div)
          .select('.stack-bar');

        const callback = jasmine.createSpy('mouseMoveCallback');
        stackBarChart.on(chartEvents.chartMouseMove, callback);
        svg.dispatch('mousemove');

        expect(callback.calls.count()).toBe(1);
      });

      it('should dispatch mouseenter', () => {
        const svg = d3
          .select(div)
          .select('.stack-bar');

        const callback = jasmine.createSpy('mouseEnterCallback');
        stackBarChart.on(chartEvents.chartMouseEnter, callback);
        svg.dispatch('mouseenter');

        expect(callback.calls.count()).toBe(1);
      });

      it('should dispatch mouseleave', () => {
        const svg = d3
          .select(div)
          .select('.stack-bar');

        const callback = jasmine.createSpy('mouseleaveCallback');
        stackBarChart.on(chartEvents.chartMouseLeave, callback);
        svg.dispatch('mouseleave');

        expect(callback.calls.count()).toBe(1);
      });

      it('should dispatch click', () => {
        const svg = d3
          .select(div)
          .select('.stack-bar');

        const callback = jasmine.createSpy('clickCallback');
        stackBarChart.on(chartEvents.chartMouseClick, callback);
        svg.dispatch('click');

        expect(callback.calls.count()).toBe(1);
      });
    });

    describe('api', () => {
      it('should provide width getter and setter', () => {
        const defaultWidth = stackBarChart.width();
        const testWidth = 900;
        const setterResult = stackBarChart.width(testWidth);
        const newWidth = stackBarChart.width();

        expect(defaultWidth).not.toBe(newWidth);
        expect(testWidth).toBe(newWidth);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide height getter and setter', () => {
        const defaultHeight = stackBarChart.height();
        const testHeight = 550;
        const setterResult = stackBarChart.height(testHeight);
        const newHeight = stackBarChart.height();

        expect(defaultHeight).not.toBe(newHeight);
        expect(testHeight).toBe(newHeight);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide margin getter and setter', () => {
        const defaultMargin = stackBarChart.margin();
        const testMargin = { top: 30, right: 40, bottom: 20, left: 50 };
        const setterResult = stackBarChart.margin(testMargin);
        const newMargin = stackBarChart.margin();

        expect(defaultMargin).not.toBe(newMargin);
        expect(testMargin).toBe(newMargin);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide marginBetweenStacks getter and setter', () => {
        const defaultMarginBetweenStacks = stackBarChart.marginBetweenStacks();
        const testMarginBetweenStacks = 20;
        const setterResult = stackBarChart.marginBetweenStacks(testMarginBetweenStacks);
        const newMarginBetweenStacks = stackBarChart.marginBetweenStacks();

        expect(defaultMarginBetweenStacks).not.toBe(newMarginBetweenStacks);
        expect(testMarginBetweenStacks).toBe(newMarginBetweenStacks);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide background color getter and setter', () => {
        const defaultBackgroundColor = stackBarChart.backgroundColor();
        const testBackgroundColor = '#332211';
        const setterResult = stackBarChart.margin(testBackgroundColor);
        const newBackgrounColor = stackBarChart.margin();

        expect(defaultBackgroundColor).not.toBe(newBackgrounColor);
        expect(testBackgroundColor).toBe(newBackgrounColor);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide maxTimeRangeDifferenceToDraw getter and setter', () => {
        const defaultMaxTimeRangeDifferenceToDraw = stackBarChart.maxTimeRangeDifferenceToDraw();
        const testMaxTimeRangeDifferenceToDraw = 1000 * 60 * 60;
        const setterResult = stackBarChart.maxTimeRangeDifferenceToDraw(testMaxTimeRangeDifferenceToDraw);
        const newMaxTimeRangeDifferenceToDraw = stackBarChart.maxTimeRangeDifferenceToDraw();

        expect(defaultMaxTimeRangeDifferenceToDraw).not.toBe(newMaxTimeRangeDifferenceToDraw);
        expect(testMaxTimeRangeDifferenceToDraw).toBe(newMaxTimeRangeDifferenceToDraw);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide xAxisTimeFormat getter and setter', () => {
        const defaultXAxisTimeFormat = stackBarChart.xAxisTimeFormat();
        const testXAxisTimeFormat = d3.timeFormat('%d-%m %H');
        const setterResult = stackBarChart.xAxisTimeFormat(testXAxisTimeFormat);
        const newXAxisTimeFormat = stackBarChart.xAxisTimeFormat();

        expect(defaultXAxisTimeFormat).not.toBe(newXAxisTimeFormat);
        expect(testXAxisTimeFormat).toBe(newXAxisTimeFormat);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide mouseMoveTimeTreshold getter and setter', () => {
        const defaultMouseMoveTimeTreshold = stackBarChart.mouseMoveTimeTreshold();
        const testMouseMoveTimeTreshold = 100;
        const setterResult = stackBarChart.mouseMoveTimeTreshold(testMouseMoveTimeTreshold);
        const newMouseMoveTimeTreshold = stackBarChart.mouseMoveTimeTreshold();

        expect(defaultMouseMoveTimeTreshold).not.toBe(newMouseMoveTimeTreshold);
        expect(testMouseMoveTimeTreshold).toBe(newMouseMoveTimeTreshold);
        expect(setterResult).toBe(stackBarChart);
      });

      it('should provide subscription on events', () => {
        const eventHandler = () => {};
        stackBarChart
          .on(chartEvents.chartMouseEnter, eventHandler)
          .on(chartEvents.chartMouseLeave, eventHandler)
          .on(chartEvents.chartMouseMove, eventHandler)
          .on(chartEvents.chartMouseClick, eventHandler);
      });
    });
  });
});
