
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
    xAxisDateFrom?: Date;
    xAxisDateTo?: Date;
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

    xAxisDateFrom: {
      (xAxisDateFrom: Date): LineChart;
      (): Date;
    };

    xAxisDateTo: {
      (xAxisDateTo: Date): LineChart;
      (): Date;
    };

    chartHeight: () => number;
    chartWidth: () => number;
  }

  /* Bar chart */

  interface BarChartConfig {
    width?: number;
    height?: number;
    margin?: {
      top?: number,
      right?: number,
      bottom?: number,
      left?: number
    };
    setStackWidth?: (chartWidth:number, numberOfBars: number) => number;
    maxTimeRangeDifferenceToDraw?: number;
    stackTimeDiapason?: number;
    xAxisTimeFormat?: TickFormat;
    yAxisValueFormat?: TickFormat;
    xAxisDateFrom?: Date;
    xAxisDateTo?: Date;
    yAxisValueFrom?: number;
    yAxisValueTo?: number;
  }

  interface MouseEventBarChartData {
    dataSum: number;
    dateFrom: Date;
    dateTo: Date;
    date: Date;
    data: {
      name: string;
      value: number;
      previousValueSum: number;
      color: string;
      date: Date;
      dateFrom: Date;
      dateTo: Date;
    }
  }

  interface BarChart {
    (selection: any): void;

    width: {
      (width: number): BarChart;
      (): number;
    };

    height: {
      (height: number): BarChart;
      (): number;
    };

    margin: {
      (margin: { top: number, right: number, bottom: number, left: number }): BarChart;
      (): { top: number, right: number, bottom: number, left: number };
    };

    setStackMargin: {
      (setStackMargin: (chartWidth:number, numberOfBars: number) => number): BarChart;
      (): (chartWidth:number, numberOfBars: number) => number;
    }

    on: (event: string, callback: (...args: any[]) => void, ...args: any[]) => BarChart;

    maxTimeRangeDifferenceToDraw: {
      (maxTimeRangeDifferenceToDraw: number): BarChart;
      (): number;
    };

    stackTimeDiapason: {
      (stackTimeDiapason: number): BarChart;
      (): number;
    };

    xAxisTimeFormat: {
      (xAxisTimeFormat: TickFormat): BarChart;
      (): TickFormat;
    };

    yAxisValueFormat: {
      (yAxisValueFormat: TickFormat): BarChart;
      (): TickFormat;
    };

    xAxisDateFrom: {
      (curve: d3.CurveFactory): BarChart;
      (): d3.CurveFactory;
    }

    xAxisDateTo: {
      (interpolationMaxIterationCount: number): BarChart;
      (): number;
    }

    yAxisValueFrom: {
      (xAxisDateFrom: Date): BarChart;
      (): Date;
    };

    yAxisValueTo: {
      (xAxisDateTo: Date): BarChart;
      (): Date;
    };

    chartHeight: () => number;
    chartWidth: () => number;
  }

  /* Stack chart */ 

  interface StackBarData {
    name: string;
    backgroundColor?: string;
    data: {
      date: Date,
      color?: string,
      value: any
    }[];
  }

  interface StackBarEventData {
    interpolatedDate: Date;
    from: Date;
    to: Date;
    value: any;
    name: string;
    color: string;
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
    marginBetweenStacks?: number;
    backgroundColor?: string;
    maxTimeRangeDifferenceToDraw?: number;
    xAxisTimeFormat?: TickFormat;
    mouseMoveTimeTreshold?: number;
    xAxisDateFrom: Date;
    xAxisDateTo: Date;
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

    marginBetweenStacks: {
      (marginBetweenStacks: number): StackBarChart;
      (): number;
    }

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

    xAxisDateFrom: {
      (xAxisDateFrom: Date): StackBarChart;
      (): Date;
    };

    xAxisDateTo: {
      (xAxisDateTo: Date): StackBarChart;
      (): Date;
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
    headerFormatter?: (selectedDate: Date, data: PointData[] | StackBarEventData[] ) => string;
    topicFormatter?: (data: PointData | StackBarEventData) => string;
    valueFormatter?: (data: PointData | StackBarEventData) => string;
    sort?: (markerData1: PointData | StackBarEventData, markerData2: PointData | StackBarEventData) => number;
  }

  interface Tooltip {
    (selection: any): void;

    remove: () => Tooltip;
    show: ({ x, y, selectedDate, data }: { x: number, y: number, selectedDate: Date, data: PointData[] | StackBarEventData[]}) => Tooltip;

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
      (headerFormatter: (selectedDate: Date, data: PointData[] | StackBarEventData[]) => string): Tooltip;
      (): (selectedDate: Date, data: PointData[] | StackBarEventData[]) => string;
    };

    topicFormatter: {
      (topicFormatter: (data: PointData | StackBarEventData) => string): Tooltip;
      (): (data: PointData | StackBarEventData) => string;
    };

    valueFormatter: {
      (valueFormatter: (data: PointData | StackBarEventData) => string): Tooltip;
      (): (data: PointData | StackBarEventData) => string;
    };

    sort: {
      (sort: (markerData1: PointData | StackBarEventData, markerData2: PointData | StackBarEventData) => number): Tooltip;
      (): (markerData1: PointData | StackBarEventData, markerData2: PointData | StackBarEventData) => number;
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
  export function bar(config?: BarChartConfig): BarChart;
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
