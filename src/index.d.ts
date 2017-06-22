
/// <reference types="d3" />
/// <reference types="d3-selection" />

import * as m from './index.js';

declare module './index.js' {
  interface TickFormat {
    (domainValue: any, index: number): string;
  }

  /* Line chart */

  interface PathDataSet {
    name: string;
    color?: string;
    data: { date: Date, value: number }[];
  }

  interface ChartLinePointData {
    date: Date;
    value: number;
    x: number;
    y: number;
    interpolatedX: number;
    interpolatedY: number;
    interpolatedDate: Date;
    interpolatedValue: number;
    name: string;
    color: string;
  }

  interface PointData {
    date: Date;
    value: number;
    x: number;
    y: number;
    interpolatedX: number;
    interpolatedY: number;
    interpolatedDate: Date;
    interpolatedValue: number;
    name: string;
    color: string;
  }

  interface LineChartConfig {
    width?: number;
    height?: number;
    margin?: {
      top?: number,
      right?: number,
      bottom?: number,
      left?: number
    };
    maxTimeRangeDifferenceToDraw?: number;
    xAxisTimeFormat?: TickFormat;
    yAxisValueFormat?: TickFormat;
    curve?: d3.CurveFactory;
    interpolationMaxIterationCount?: number;
    interpolationAccuracy?: number;
    mouseMoveTimeTreshold?: number;
  }

  interface MouseEventChartData {
    date: Date;
    value: number;
    x: number;
    y: number;
    interpolatedX: number;
    interpolatedY: number;
    interpolatedDate: Date;
    interpolatedValue: number;
    name: string;
    color: string;
  }

  interface LineChart {
    (selection: any): void;

    width: {
      (width: number): LineChart;
      (): number;
    };

    height: {
      (height: number): LineChart;
      (): number;
    };

    margin: {
      (margin: { top: number, right: number, bottom: number, left: number }): LineChart;
      (): { top: number, right: number, bottom: number, left: number };
    };

    on: (event: string, callback: (...args: any[]) => void, ...args: any[]) => LineChart;

    maxTimeRangeDifferenceToDraw: {
      (maxTimeRangeDifferenceToDraw: number): LineChart;
      (): number;
    };

    xAxisTimeFormat: {
      (xAxisTimeFormat: TickFormat): LineChart;
      (): TickFormat;
    };

    yAxisValueFormat: {
      (yAxisValueFormat: TickFormat): LineChart;
      (): TickFormat;
    };

    curve: {
      (curve: d3.CurveFactory): LineChart;
      (): d3.CurveFactory;
    }

    interpolationMaxIterationCount: {
      (interpolationMaxIterationCount: number): LineChart;
      (): number;
    }

    interpolationAccuracy: {
      (interpolationAccuracy: number): LineChart;
      (): number;
    }

    mouseMoveTimeTreshold: {
      (mouseMoveTimeTreshold: number): LineChart;
      (): number;
    }

    chartHeight: () => number;
    chartWidth: () => number;
  }

  /* Stack chart */

  interface StackBarData {
    name: string;
    color?: string;
    date: Date;
    value?: number;
  }

  interface StackBarConfig {
    width?: number;
    height?: number;
    margin?: {
      top?: number,
      right?: number,
      bottom?: number,
      left?: number
    };
    backgroundColor?: string;
    maxTimeRangeDifferenceToDraw?: number;
    xAxisTimeFormat?: TickFormat;
    mouseMoveTimeTreshold?: number;
  }

  interface StackBarPointData extends StackBarData {
    interpolatedDate: Date;
  }
  
  interface StackBarChart {
    (selection: any): void;

    width: {
      (width: number): StackBarChart;
      (): number;
    };

    height: {
      (height: number): StackBarChart;
      (): number;
    };

    margin: {
      (margin: { top: number, right: number, bottom: number, left: number }): StackBarChart;
      (): { top: number, right: number, bottom: number, left: number };
    };

    backgroundColor: {
      (backgroundColor: string): StackBarChart;
      (): string;
    };

    on: (event: string, callback: (...args: any[]) => void, ...args: any[]) => StackBarChart;

    maxTimeRangeDifferenceToDraw: {
      (maxTimeRangeDifferenceToDraw: number): StackBarChart;
      (): number;
    };

    xAxisTimeFormat: {
      (xAxisTimeFormat: TickFormat): StackBarChart;
      (): TickFormat;
    };

    mouseMoveTimeTreshold: {
      (mouseMoveTimeTreshold: number): StackBarChart;
      (): number;
    }
  }

  /* Plugins */

  interface MarkersConfig {
    cx?: (markerData: PointData) => number;
    cy?: (markerData: PointData) => number;
    radius?: (markerData: PointData) => number;
    fill?: (markerData: PointData) => string;
    stroke?: (markerData: PointData) => string;
    strokeWidth?: (markerData: PointData) => number;
    sort?: (markerData1: PointData, markerData2: PointData) => number;
  }

  interface Markers {
    (selection: any): void;

    remove: () => Markers;
    show: ({ data }: { data: PointData[] }) => Markers;

    cx: {
      (cx: (markerData: PointData) => number): Markers;
      (): (markerData: PointData) => number;
    };

    cy: {
      (cy: (markerData: PointData) => number): Markers;
      (): (markerData: PointData) => number;
    };

    radius: {
      (radius: (markerData: PointData) => number): Markers;
      (): (markerData: PointData) => number;
    };

    fill: {
      (fill: (markerData: PointData) => string): Markers;
      (): (markerData: PointData) => string;
    };

    stroke: {
      (stroke: (markerData: PointData) => string): Markers;
      (): (markerData: PointData) => string;
    };

    strokeWidth: {
      (strokeWidth: (markerData: PointData) => number): Markers;
      (): (markerData: PointData) => number;
    };

    sort: {
      (sort: (markerData1: PointData, markerData2: PointData) => number): Markers;
      (): (markerData1: PointData, markerData2: PointData) => number;
    };
  }

  interface TooltipConfig {
    chartHeight?: number;
    chartWidth?: number;
    tooltipWidth?: number;
    horizontalMouseMargin?: number;
    verticalBorderMargin?: number;
    headerFormatter?: (selectedDate: Date, data: PointData[] ) => string;
    topicFormatter?: (data: PointData) => string;
    valueFormatter?: (data: PointData) => string;
    sort?: (markerData1: PointData, markerData2: PointData) => number;
  }

  interface Tooltip {
    (selection: any): void;

    remove: () => Tooltip;
    show: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: PointData[]} ) => Tooltip;

    chartHeight: {
      (chartHeight: number): Tooltip;
      (): number;
    };

    chartWidth: {
      (chartWidth: number): Tooltip;
      (): number;
    };

    tooltipWidth: {
      (tooltipWidth: number): Tooltip;
      (): number;
    };

    horizontalMouseMargin: {
      (horizontalMouseMargin: number): Tooltip;
      (): number;
    };

    verticalBorderMargin: {
      (verticalBorderMargin: number): Tooltip;
      (): number;
    };

    headerFormatter: {
      (headerFormatter: (selectedDate: Date, data: PointData[]) => string): Tooltip;
      (): (selectedDate: Date, data: PointData[]) => string;
    };

    topicFormatter: {
      (topicFormatter: (data: PointData) => string): Tooltip;
      (): (data: PointData) => string;
    };

    valueFormatter: {
      (valueFormatter: (data: PointData) => string): Tooltip;
      (): (data: PointData) => string;
    };

    sort: {
      (sort: (markerData1: PointData, markerData2: PointData) => number): Tooltip;
      (): (markerData1: PointData, markerData2: PointData) => number;
    };
  }

  interface VerticalDividerConfig {
    height?: number;
  }

  interface VerticalDivider {
    (selection: any): void;

    remove: () => VerticalDivider;
    show: () => VerticalDivider;
    update: ({ x }: { x: number }) => VerticalDivider;

    height: {
      (height: number): VerticalDivider;
      (): number;
    }
  }

  export function line(config?: LineChartConfig): LineChart;
  export function stackBar(config?: StackBarConfig): StackBarChart;

  export const chartEvents: {
    chartMouseEnter: string;
    chartMouseLeave: string;
    chartMouseMove: string;
    chartMouseClick: string;
  };

  export function markers(config?: MarkersConfig): Markers;
  export function tooltip(config?: TooltipConfig): Tooltip;
  export function verticalDivider(config?: VerticalDividerConfig): VerticalDivider;
}
