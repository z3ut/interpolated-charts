import { tooltip } from '../../src/index.js';
import { mouseEventData } from '../data/mouse-event-data.js';
import * as d3 from 'd3';

describe('tooltip', () => {

  let tooltipPlugin, svg;

  beforeEach(() => {
    tooltipPlugin = tooltip();

    svg = document.createElement('svg');
    svg.className = 'svg-container';
    document.body.appendChild(svg);

    d3
      .select('.svg-container')
      .datum([]).call(tooltipPlugin);
  });

  afterEach(() => {
    svg.remove();
  });

  describe('render', () => {
    it('should display tooltip', () => {
      tooltipPlugin.show(mouseEventData);

      const tooltipContainer = d3
        .select(svg)
        .select('.tooltip');

      expect(tooltipContainer.empty()).toBeFalsy();
    });

    it('should hide tooltip', () => {
      tooltipPlugin.show(mouseEventData);
      tooltipPlugin.remove();

      const tooltipContainer = d3
        .select(svg)
        .select('.tooltip');

      expect(tooltipContainer.empty()).toBeTruthy();
    });

    it('should display rows for every data object', () => {
      tooltipPlugin.show(mouseEventData);

      const tooltipContainer = d3
        .select(svg)
        .select('.tooltip');

      const topics = tooltipContainer
        .selectAll('.topic');
      
      const eventDataCount = mouseEventData.data.length;
      
      expect(topics.size()).toBe(eventDataCount);
    });
  });

  describe('api', () => {
    it('should provide chartHeight getter and setter', () => {
      const defaultChartHeight = tooltipPlugin.chartHeight();
      const testChartHeight = 900;
      const setterResult = tooltipPlugin.chartHeight(testChartHeight);
      const newChartHeight = tooltipPlugin.chartHeight();

      expect(defaultChartHeight).not.toBe(newChartHeight);
      expect(testChartHeight).toBe(newChartHeight);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide chartWidth getter and setter', () => {
      const defaultChartWidth = tooltipPlugin.chartWidth();
      const testChartWidth = 550;
      const setterResult = tooltipPlugin.chartWidth(testChartWidth);
      const newChartWidth = tooltipPlugin.chartWidth();

      expect(defaultChartWidth).not.toBe(newChartWidth);
      expect(testChartWidth).toBe(newChartWidth);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide tooltipWidth getter and setter', () => {
      const defaultTooltipWidth = tooltipPlugin.tooltipWidth();
      const testTooltipWidth = 300;
      const setterResult = tooltipPlugin.tooltipWidth(testTooltipWidth);
      const newTooltipWidth = tooltipPlugin.tooltipWidth();

      expect(defaultTooltipWidth).not.toBe(newTooltipWidth);
      expect(testTooltipWidth).toBe(newTooltipWidth);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide horizontalMouseMargin getter and setter', () => {
      const defaultHorizontalMouseMargin = tooltipPlugin.horizontalMouseMargin();
      const testHorizontalMouseMargin = 80;
      const setterResult = tooltipPlugin.horizontalMouseMargin(testHorizontalMouseMargin);
      const newHorizontalMouseMargin = tooltipPlugin.horizontalMouseMargin();

      expect(defaultHorizontalMouseMargin).not.toBe(newHorizontalMouseMargin);
      expect(testHorizontalMouseMargin).toBe(newHorizontalMouseMargin);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide verticalBorderMargin getter and setter', () => {
      const defaultVerticalBorderMargin = tooltipPlugin.verticalBorderMargin();
      const testVerticalBorderMargin = 40;
      const setterResult = tooltipPlugin.verticalBorderMargin(testVerticalBorderMargin);
      const newVerticalBorderMargin = tooltipPlugin.verticalBorderMargin();

      expect(defaultVerticalBorderMargin).not.toBe(newVerticalBorderMargin);
      expect(testVerticalBorderMargin).toBe(newVerticalBorderMargin);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide headerFormatter getter and setter', () => {
      const defaultHeaderFormatter = tooltipPlugin.headerFormatter();
      const testHeaderFormatter = selectedDate => d3.timeFormat('%H:%M')(selectedDate);
      const setterResult = tooltipPlugin.headerFormatter(testHeaderFormatter);
      const newHeaderFormatter = tooltipPlugin.headerFormatter();

      expect(defaultHeaderFormatter).not.toBe(newHeaderFormatter);
      expect(testHeaderFormatter).toBe(newHeaderFormatter);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide topicFormatter getter and setter', () => {
      const defaultTopicFormatter = tooltipPlugin.topicFormatter();
      const testTopicFormatter = data => `name: ${data.name}`;
      const setterResult = tooltipPlugin.topicFormatter(testTopicFormatter);
      const newTopicFormatter = tooltipPlugin.topicFormatter();

      expect(defaultTopicFormatter).not.toBe(newTopicFormatter);
      expect(testTopicFormatter).toBe(newTopicFormatter);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide valueFormatter getter and setter', () => {
      const defaultValueFormatter = tooltipPlugin.valueFormatter();
      const testValueFormatter = data => d3.format('.2f')(data.value);
      const setterResult = tooltipPlugin.valueFormatter(testValueFormatter);
      const newValueFormatter = tooltipPlugin.valueFormatter();

      expect(defaultValueFormatter).not.toBe(newValueFormatter);
      expect(testValueFormatter).toBe(newValueFormatter);
      expect(setterResult).toBe(tooltipPlugin);
    });

    it('should provide sort getter and setter', () => {
      const defaultSort = tooltipPlugin.sort();
      const testSort = (a, b) => a.value - b.value;
      const setterResult = tooltipPlugin.sort(testSort);
      const newSort = tooltipPlugin.sort();

      expect(defaultSort).not.toBe(newSort);
      expect(testSort).toBe(newSort);
      expect(setterResult).toBe(tooltipPlugin);
    });
  });
});
