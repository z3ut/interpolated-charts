(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["interpolated-charts"] = factory(require("d3"));
	else
		root["interpolated-charts"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultColorSchema = ['#6aedc7', '#39c2c9', '#ffce00', '#ffa71a', '#f866b9', '#998ce3'];

function colorProvider() {
  var colorSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultColorSchema;

  var currentColorNumber = 0;
  var savedColors = {};

  /**
   * Get new color. If it called with key param, returned value will be saved
   * and will return every new call with same identificator.
   * @param {string} [key] - Color identificator
   */
  function next(key) {
    var color = arguments.length ? savedColors[key] = savedColors[key] || getNextColor() : getNextColor();

    return { value: color, done: false };
  }

  function getNextColor() {
    var color = colorSchema[currentColorNumber];
    currentColorNumber = (currentColorNumber + 1) % colorSchema.length;
    return color;
  }

  function schema(_schema) {
    if (!arguments.length) {
      return colorSchema;
    }
    colorSchema = _schema;
    currentColorNumber = 0;
    return this;
  }

  return {
    next: next,
    schema: schema
  };
}

exports.colorProvider = colorProvider;
exports.defaultColorSchema = defaultColorSchema;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/*
  Do not call repeated events in threshold time range
*/

function eventThreshold() {
  var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;


  var eventTimer = void 0;
  var previousEventTime = void 0;

  function call(func) {
    var currentDate = Date.now();
    var timeSinceLastEvent = currentDate - previousEventTime;

    /*
      if last event was < threshold ms ago,
      start timeout for new event dispatch.
      timeout will fire if no new event occurs.
      use case - call new event when last event occured recently.
      timeout will dispatch new event after treshold time.
    */
    if (previousEventTime && timeSinceLastEvent < threshold) {
      if (eventTimer) {
        clearTimeout(eventTimer);
      }
      eventTimer = setTimeout(runFunc.bind(null, func), threshold - timeSinceLastEvent);
      return;
    }
    runFunc(func);
  }

  function clear() {
    if (eventTimer) {
      clearTimeout(eventTimer);
    }
  }

  function runFunc(func) {
    previousEventTime = Date.now();
    func();
  }

  return {
    call: call,
    clear: clear
  };
}

exports.default = eventThreshold;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getDatePlusTime(date, time) {
  return new Date(date.getTime() + time);
}

function getAverageDate(date1, date2) {
  return new Date((date1.getTime() + date2.getTime()) / 2);
}

function boundNumberToRange(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

exports.getDatePlusTime = getDatePlusTime;
exports.getAverageDate = getAverageDate;
exports.boundNumberToRange = boundNumberToRange;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartEvents = exports.bar = undefined;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _colorProvider = __webpack_require__(1);

var _helpers = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var chartEvents = {
  chartMouseEnter: 'chartMouseEnter',
  chartMouseLeave: 'chartMouseLeave',
  chartMouseMove: 'chartMouseMove',
  chartMouseClick: 'chartMouseClick'
};

function bar() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 700 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 500 : _ref$height,
      _ref$margin = _ref.margin,
      margin = _ref$margin === undefined ? { top: 20, right: 30, bottom: 40, left: 40 } : _ref$margin,
      _ref$setStackWidth = _ref.setStackWidth,
      setStackWidth = _ref$setStackWidth === undefined ? function (chartWidth, numberOfBars) {
    return chartWidth / numberOfBars - 20;
  } : _ref$setStackWidth,
      _ref$maxTimeRangeDiff = _ref.maxTimeRangeDifferenceToDraw,
      maxTimeRangeDifferenceToDraw = _ref$maxTimeRangeDiff === undefined ? 1000 * 60 * 60 * 24 * 1.5 : _ref$maxTimeRangeDiff,
      _ref$stackTimeDiapaso = _ref.stackTimeDiapason,
      stackTimeDiapason = _ref$stackTimeDiapaso === undefined ? 1000 * 60 * 60 * 24 : _ref$stackTimeDiapaso,
      xAxisTimeFormat = _ref.xAxisTimeFormat,
      yAxisValueFormat = _ref.yAxisValueFormat,
      xAxisDateFrom = _ref.xAxisDateFrom,
      xAxisDateTo = _ref.xAxisDateTo,
      yAxisValueFrom = _ref.yAxisValueFrom,
      yAxisValueTo = _ref.yAxisValueTo;

  var svg = void 0;
  var chartWidth = void 0,
      chartHeight = void 0;
  var xAxis = void 0,
      yAxis = void 0;
  var xScale = void 0,
      yScale = void 0;

  var minDate = void 0,
      maxDate = void 0,
      maxValue = void 0;

  var chartData = [];
  var stackWidth = void 0,
      stackBackgroundWidth = void 0;

  var colors = (0, _colorProvider.colorProvider)();

  var dispatcher = d3.dispatch(chartEvents.chartMouseEnter, chartEvents.chartMouseLeave, chartEvents.chartMouseMove, chartEvents.chartMouseClick);

  function exports(selection) {
    selection.each(function (data) {
      chartWidth = exports.chartWidth();
      chartHeight = exports.chartHeight();

      buildSvg(this);

      initializeChartData(data);
      createScales();
      createAxis();

      drawAxis();
      drawGridLines();
      drawBars();
      runDrawingAnimation();

      subscribeEvents();
    });
  }

  function initializeChartData(data) {
    var chartDates = [].concat.apply([], data.map(function (d) {
      return d.data;
    })).map(function (p) {
      return p.date;
    });

    minDate = xAxisDateFrom || d3.min(chartDates);
    var maxDateConfig = xAxisDateTo || d3.max(chartDates);

    var numberOfBars = 0;
    maxDate = minDate;

    var _loop = function _loop() {
      var diapasonStart = maxDate;
      maxDate = (0, _helpers.getDatePlusTime)(maxDate, stackTimeDiapason);
      var avgDate = (0, _helpers.getAverageDate)(diapasonStart, maxDate);
      numberOfBars++;

      var currentStack = {
        dataSum: 0,
        dateFrom: diapasonStart,
        dateTo: maxDate,
        date: avgDate,
        data: []
      };

      var filteredData = data.map(function (d) {
        return {
          name: d.name,
          color: d.color || colors.next(d.name),
          data: d.data.filter(function (d) {
            return diapasonStart <= d.date && d.date < maxDate;
          })
        };
      }).reduce(function (acc, curr) {
        var currSet = {
          name: curr.name,
          // empty array or all missing values should return null
          value: curr.data.reduce(function (acc, curr) {
            return typeof curr.value === 'number' ? acc + curr.value : acc;
          }, null),
          previousValueSum: acc.dataSum,
          color: curr.color,
          date: avgDate,
          dateFrom: diapasonStart,
          dateTo: maxDate
        };
        acc.dataSum += currSet.value;
        acc.data.push(currSet);
        return acc;
      }, currentStack);

      chartData.push(filteredData);
    };

    do {
      _loop();
    } while (maxDate < maxDateConfig);

    maxValue = d3.max(chartData.map(function (d) {
      return d3.sum(d.data, function (d) {
        return d.value;
      });
    }));

    stackWidth = setStackWidth(chartWidth, numberOfBars);
    stackBackgroundWidth = Math.round(chartWidth / numberOfBars);
  }

  function createScales() {
    xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, chartWidth]);

    var yMin = yAxisValueFrom || 0;
    var yMax = typeof yAxisValueTo === 'number' ? yAxisValueTo :
    // add free space at top
    maxValue * 1.05;

    yScale = d3.scaleLinear().domain([yMin, yMax]).range([chartHeight, 0]);
  }

  function createAxis() {
    xAxis = d3.axisBottom(xScale);

    if (xAxisTimeFormat) {
      xAxis.tickFormat(xAxisTimeFormat);
    }

    yAxis = d3.axisLeft(yScale);

    if (yAxisValueFormat) {
      yAxis.tickFormat(yAxisValueFormat);
    }
  }

  function drawAxis() {
    svg.select('.x-axis-container').append('g').classed('x-axis', true).attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);

    svg.select('.y-axis-container').append('g').classed('y-axis', true).call(yAxis);
  }

  function drawGridLines() {
    svg.select('.grid-container').selectAll('.horizontal-grid-line').data(yScale.ticks()).enter().append('line').classed('horizontal-grid-line', true).attr('x1', 0).attr('x2', chartWidth).attr('y1', function (d) {
      return yScale(d);
    }).attr('y2', function (d) {
      return yScale(d);
    });

    svg.select('.grid-container').selectAll('.vertical-grid-line').data(xScale.ticks()).enter().append('line').classed('vertical-grid-line', true).attr('x1', function (d) {
      return xScale(d);
    }).attr('x2', function (d) {
      return xScale(d);
    }).attr('y1', 0).attr('y2', chartHeight);
  }

  function drawBars() {
    var containers = svg.select('.data-bar-container').selectAll('.bar').data(chartData).enter().append('g');

    containers.append('rect').classed('stack-background', true).attr('x', function (d) {
      return xScale(d.date);
    }).attr('y', 0).attr('width', stackBackgroundWidth).attr('height', chartHeight).attr('transform', 'translate(-' + stackBackgroundWidth / 2 + ', 0)');

    containers.selectAll('.stack').data(function (d) {
      return d.data;
    }).enter().append('rect').classed('stack', true).attr('class', 'bar').attr('x', function (d) {
      return xScale(d.date);
    }).attr('y', function (d) {
      return yScale(d.value + d.previousValueSum);
    }).attr('width', stackWidth)
    // zero or positive - handle case when y axis min value > current drawing y
    .attr('height', function (d) {
      return Math.max(chartHeight - yScale(d.value), 0);
    }).attr('transform', 'translate(-' + stackWidth / 2 + ', 0)').attr('fill', function (d) {
      return d.color;
    });
  }

  function runDrawingAnimation() {
    var maskingRectangle = svg.append('rect').style('fill', 'white').attr('width', chartWidth).attr('height', chartHeight).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('x', 0).attr('y', 0);

    maskingRectangle.transition().duration(1000).ease(d3.easeQuadInOut).attr('x', chartWidth).on('end', function () {
      return maskingRectangle.remove();
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container).append('svg').classed('bar-chart', true);

      buildContainerGroups();
    }

    svg.attr('width', width).attr('height', height);
  }

  function buildContainerGroups() {
    var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    container.append('g').classed('grid-container', true);

    container.append('g').classed('x-axis-container', true);

    container.append('g').classed('y-axis-container', true);

    container.append('g').classed('data-bar-container', true);

    container.append('g').classed('metadata-container', true);
  }

  function subscribeEvents() {
    svg.on('mousemove', mouseMove);
    svg.on('mouseenter', mouseEnter);
    svg.on('mouseleave', mouseLeave);
    svg.on('click', mouseClick);
  }

  function mouseMove() {
    var options = getMouseEventOptions.apply(undefined, _toConsumableArray(d3.mouse(this)));
    dispatcher.call(chartEvents.chartMouseMove, this, options);
  }

  function mouseClick() {
    var options = getMouseEventOptions.apply(undefined, _toConsumableArray(d3.mouse(this)));
    dispatcher.call(chartEvents.chartMouseClick, this, options);
  }

  function mouseEnter() {
    dispatcher.call.apply(dispatcher, [chartEvents.chartMouseEnter].concat(_toConsumableArray(d3.mouse(this))));
  }

  function mouseLeave() {
    dispatcher.call.apply(dispatcher, [chartEvents.chartMouseLeave].concat(_toConsumableArray(d3.mouse(this))));
  }

  function getMouseEventOptions(x, y) {
    // coords inside of chart
    x = (0, _helpers.boundNumberToRange)(x - margin.left, 0, chartWidth);
    y = (0, _helpers.boundNumberToRange)(y - margin.top, 0, chartHeight);

    var data = getClosestData(x);
    var selectedDate = xScale.invert(x);

    var diapasonStart = minDate;
    var diapasonEnd = (0, _helpers.getDatePlusTime)(diapasonStart, stackTimeDiapason);

    while (selectedDate > diapasonEnd) {
      diapasonStart = diapasonEnd;
      diapasonEnd = (0, _helpers.getDatePlusTime)(diapasonStart, stackTimeDiapason);
    }

    return { x: x, y: y, selectedDate: selectedDate, diapasonStart: diapasonStart, diapasonEnd: diapasonEnd, data: data };
  }

  function getClosestData(x) {
    var selectedDate = xScale.invert(x);
    var stackData = chartData.find(function (d) {
      return d.dateFrom <= selectedDate && selectedDate <= d.dateTo;
    });
    return stackData.data;
  }

  exports.width = function (_width) {
    if (!arguments.length) {
      return width;
    }
    width = _width;
    return this;
  };

  exports.height = function (_height) {
    if (!arguments.length) {
      return height;
    }
    height = _height;
    return this;
  };

  exports.margin = function (_margin) {
    if (!arguments.length) {
      return margin;
    }
    margin = _margin;
    return this;
  };

  exports.setStackWidth = function (_setStackWidth) {
    if (!arguments.length) {
      return setStackWidth;
    }
    setStackWidth = _setStackWidth;
    return this;
  };

  exports.on = function () {
    dispatcher.on.apply(dispatcher, arguments);
    return this;
  };

  exports.maxTimeRangeDifferenceToDraw = function (_maxTimeRangeDifferenceToDraw) {
    if (!arguments.length) {
      return maxTimeRangeDifferenceToDraw;
    }
    maxTimeRangeDifferenceToDraw = _maxTimeRangeDifferenceToDraw;
    return this;
  };

  exports.stackTimeDiapason = function (_stackTimeDiapason) {
    if (!arguments.length) {
      return stackTimeDiapason;
    }
    stackTimeDiapason = _stackTimeDiapason;
    return this;
  };

  exports.xAxisTimeFormat = function (_xAxisTimeFormat) {
    if (!arguments.length) {
      return xAxisTimeFormat;
    }
    xAxisTimeFormat = _xAxisTimeFormat;
    return this;
  };

  exports.yAxisValueFormat = function (_yAxisValueFormat) {
    if (!arguments.length) {
      return yAxisValueFormat;
    }
    yAxisValueFormat = _yAxisValueFormat;
    return this;
  };

  exports.xAxisDateFrom = function (_xAxisDateFrom) {
    if (!arguments.length) {
      return xAxisDateFrom;
    }
    xAxisDateFrom = _xAxisDateFrom;
    return this;
  };

  exports.xAxisDateTo = function (_xAxisDateTo) {
    if (!arguments.length) {
      return xAxisDateTo;
    }
    xAxisDateTo = _xAxisDateTo;
    return this;
  };

  exports.yAxisValueFrom = function (_yAxisValueFrom) {
    if (!arguments.length) {
      return yAxisValueFrom;
    }
    yAxisValueFrom = _yAxisValueFrom;
    return this;
  };

  exports.curve = function (_yAxisValueTo) {
    if (!arguments.length) {
      return yAxisValueTo;
    }
    yAxisValueTo = _yAxisValueTo;
    return this;
  };

  exports.chartHeight = function () {
    return height - margin.top - margin.bottom;
  };

  exports.chartWidth = function () {
    return width - margin.left - margin.right;
  };

  return exports;
}

exports.bar = bar;
exports.chartEvents = chartEvents;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartEvents = exports.line = undefined;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _colorProvider = __webpack_require__(1);

var _svgCalculating = __webpack_require__(12);

var _svgCalculating2 = _interopRequireDefault(_svgCalculating);

var _eventThreshold = __webpack_require__(2);

var _eventThreshold2 = _interopRequireDefault(_eventThreshold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var chartEvents = {
  chartMouseEnter: 'chartMouseEnter',
  chartMouseLeave: 'chartMouseLeave',
  chartMouseMove: 'chartMouseMove',
  chartMouseClick: 'chartMouseClick'
};

function line() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 700 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 500 : _ref$height,
      _ref$margin = _ref.margin,
      margin = _ref$margin === undefined ? { top: 20, right: 30, bottom: 40, left: 40 } : _ref$margin,
      _ref$maxTimeRangeDiff = _ref.maxTimeRangeDifferenceToDraw,
      maxTimeRangeDifferenceToDraw = _ref$maxTimeRangeDiff === undefined ? 1000 * 60 * 60 * 24 * 1.5 : _ref$maxTimeRangeDiff,
      xAxisTimeFormat = _ref.xAxisTimeFormat,
      yAxisValueFormat = _ref.yAxisValueFormat,
      _ref$curve = _ref.curve,
      curve = _ref$curve === undefined ? d3.curveBasis : _ref$curve,
      _ref$interpolationMax = _ref.interpolationMaxIterationCount,
      interpolationMaxIterationCount = _ref$interpolationMax === undefined ? 25 : _ref$interpolationMax,
      _ref$interpolationAcc = _ref.interpolationAccuracy,
      interpolationAccuracy = _ref$interpolationAcc === undefined ? 0.005 : _ref$interpolationAcc,
      _ref$mouseMoveTimeTre = _ref.mouseMoveTimeTreshold,
      mouseMoveTimeTreshold = _ref$mouseMoveTimeTre === undefined ? 20 : _ref$mouseMoveTimeTre,
      xAxisDateFrom = _ref.xAxisDateFrom,
      xAxisDateTo = _ref.xAxisDateTo;

  var svg = void 0;
  var chartWidth = void 0,
      chartHeight = void 0;
  var xAxis = void 0,
      yAxis = void 0;
  var xScale = void 0,
      yScale = void 0;

  var chartData = void 0;

  var colors = (0, _colorProvider.colorProvider)();
  var events = (0, _eventThreshold2.default)(mouseMoveTimeTreshold);

  var dispatcher = d3.dispatch(chartEvents.chartMouseEnter, chartEvents.chartMouseLeave, chartEvents.chartMouseMove, chartEvents.chartMouseClick);

  function exports(selection) {
    selection.each(function (data) {
      chartWidth = exports.chartWidth();
      chartHeight = exports.chartHeight();

      buildSvg(this);

      initializeChartData(data);
      createScales();
      createAxis();

      drawAxis();
      drawGridLines();
      drawLines();
      runDrawingAnimation();

      subscribeEvents();
    });
  }

  function initializeChartData(data) {
    chartData = data.map(function (d) {
      d.color = d.color || colors.next().value;
      d.segregatedData = getSegregatedData(d.data);
      d.chartDiapasons = getDiapasonsWithData(d.data);
      return d;
    });
  }

  function createScales() {
    var _ref2;

    var chartPoints = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(chartData.map(function (c) {
      return c.data;
    })));
    var chartDates = chartPoints.map(function (p) {
      return p.date;
    });
    var chartValues = chartPoints.map(function (p) {
      return p.value;
    });

    var xMin = xAxisDateFrom || d3.min(chartDates);
    var xMax = xAxisDateTo || d3.max(chartDates);
    var yMin = d3.min(chartValues);
    var yMax = d3.max(chartValues);

    xScale = d3.scaleTime().domain([xMin, xMax]).range([0, chartWidth]);

    // add some free space at Y scale borders
    var yScaleIndentation = (yMax - yMin) * 0.05;
    yScale = d3.scaleLinear().domain([yMin - yScaleIndentation, yMax + yScaleIndentation]).range([chartHeight, 0]);
  }

  function createAxis() {
    xAxis = d3.axisBottom(xScale);

    if (xAxisTimeFormat) {
      xAxis.tickFormat(xAxisTimeFormat);
    }

    yAxis = d3.axisLeft(yScale);

    if (yAxisValueFormat) {
      yAxis.tickFormat(yAxisValueFormat);
    }
  }

  function drawAxis() {
    svg.select('.x-axis-container').append('g').classed('x-axis', true).attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);

    svg.select('.y-axis-container').append('g').classed('y-axis', true).call(yAxis);
  }

  function drawGridLines() {
    svg.select('.grid-container').selectAll('.horizontal-grid-line').data(yScale.ticks()).enter().append('line').classed('horizontal-grid-line', true).attr('x1', 0).attr('x2', chartWidth).attr('y1', function (d) {
      return yScale(d);
    }).attr('y2', function (d) {
      return yScale(d);
    });

    svg.select('.grid-container').selectAll('.vertical-grid-line').data(xScale.ticks()).enter().append('line').classed('vertical-grid-line', true).attr('x1', function (d) {
      return xScale(d);
    }).attr('x2', function (d) {
      return xScale(d);
    }).attr('y1', 0).attr('y2', chartHeight);
  }

  function drawLines() {
    var valueLine = d3.line().curve(curve)
    // end line segment if current point falsy (null)
    .defined(function (d) {
      return d;
    }).x(function (d) {
      return xScale(d.date);
    }).y(function (d) {
      return yScale(d.value);
    });

    var lines = svg.select('.data-lines-container').selectAll('.line')
    // reverse order - first path should be drawn above last
    .data(chartData.reverse());

    lines.enter().append('path').classed('line', true).style('stroke-width', 2).style('fill', 'none').merge(lines).style('stroke', function (d) {
      return d.color;
    }).attr('d', function (d) {
      return valueLine(d.segregatedData);
    });

    lines.exit().remove();
  }

  function runDrawingAnimation() {
    var maskingRectangle = svg.append('rect').style('fill', 'white').attr('width', chartWidth).attr('height', chartHeight).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('x', 0).attr('y', 0);

    maskingRectangle.transition().duration(1000).ease(d3.easeQuadInOut).attr('x', chartWidth).on('end', function () {
      return maskingRectangle.remove();
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container).append('svg').classed('line-chart', true);

      buildContainerGroups();
    }

    svg.attr('width', width).attr('height', height);
  }

  function buildContainerGroups() {
    var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    container.append('g').classed('grid-container', true);

    container.append('g').classed('x-axis-container', true);

    container.append('g').classed('y-axis-container', true);

    container.append('g').classed('data-lines-container', true);

    container.append('g').classed('metadata-container', true);
  }

  function subscribeEvents() {
    svg.on('mousemove', mouseMove);
    svg.on('mouseenter', mouseEnter);
    svg.on('mouseleave', mouseLeave);
    svg.on('click', mouseClick);
  }

  function mouseMove() {
    var mouse = d3.mouse(this);
    events.call(dispatchMouseMoveEvent.bind(this, mouse));
  }

  function dispatchMouseMoveEvent(mouse) {
    var options = getMouseEventOptions.apply(undefined, _toConsumableArray(mouse));
    dispatcher.call(chartEvents.chartMouseMove, this, options);
  }

  function mouseClick() {
    var options = getMouseEventOptions.apply(undefined, _toConsumableArray(d3.mouse(this)));
    dispatcher.call(chartEvents.chartMouseClick, this, options);
  }

  function mouseEnter() {
    dispatcher.call.apply(dispatcher, [chartEvents.chartMouseEnter].concat(_toConsumableArray(d3.mouse(this))));
  }

  function mouseLeave() {
    events.clear();
    dispatcher.call.apply(dispatcher, [chartEvents.chartMouseLeave].concat(_toConsumableArray(d3.mouse(this))));
  }

  function getMouseEventOptions(x, y) {
    var moveNumToRange = function moveNumToRange(num, min, max) {
      return Math.min(Math.max(num, min), max);
    };
    // coords inside of chart
    x = moveNumToRange(x - margin.left, 0, chartWidth);
    y = moveNumToRange(y - margin.top, 0, chartHeight);

    var data = getClosestData(x);
    var selectedDate = xScale.invert(x);

    return { x: x, y: y, selectedDate: selectedDate, data: data };
  }

  var previousClosestPathes = {};

  function getClosestData(x) {
    var closestData = [];
    var selectedDate = xScale.invert(x);

    svg.selectAll('.line').each(function (data) {
      var closesPoint = data.data.reduce(function (prev, curr) {
        return !curr || Math.abs(prev.date - selectedDate) < Math.abs(curr.date - selectedDate) ? prev : curr;
      });

      // closest point does not fall into path drawing range
      if (!data.chartDiapasons.some(function (d) {
        return d.from <= selectedDate && selectedDate <= d.to;
      })) {
        return;
      }

      var _getYPointFromPath = (0, _svgCalculating2.default)(this, x, interpolationMaxIterationCount, interpolationAccuracy, previousClosestPathes[data.name]),
          y = _getYPointFromPath.y,
          pathLength = _getYPointFromPath.pathLength;

      closesPoint.x = xScale(closesPoint.date);
      closesPoint.y = yScale(closesPoint.value);
      closesPoint.interpolatedX = x;
      closesPoint.interpolatedY = y;
      closesPoint.interpolatedDate = xScale.invert(x);
      closesPoint.interpolatedValue = yScale.invert(y);
      closesPoint.name = data.name;
      closesPoint.color = data.color;
      closestData.push(closesPoint);
      previousClosestPathes[data.name] = pathLength;
    });

    // reverse to move last elements on top of svg to array start
    return closestData.reverse();
  }

  function getDiapasonsWithData(data) {
    if (!Array.isArray(data) || !data.length) {
      return [];
    }
    var chartDiapasons = [];
    data.reduce(function (prev, curr) {
      if (curr.date - prev.date < maxTimeRangeDifferenceToDraw) {
        // TODO: don't add neighbours, change existing point
        chartDiapasons.push({ from: prev.date, to: curr.date });
      }
      return curr;
    });
    return chartDiapasons;
  }

  function getSegregatedData(data) {
    var segregatedData = [];
    data.forEach(function (d, i, arr) {
      if (i === 0 || i === arr.length - 1) {
        segregatedData.push(arr[i]);
        return;
      }

      var isBreakBetween = function isBreakBetween(p1, p2) {
        return p1.date - p2.date > maxTimeRangeDifferenceToDraw;
      };

      if (isBreakBetween(arr[i], arr[i - 1])) {
        segregatedData.push(null);
      }

      segregatedData.push(arr[i]);

      if (isBreakBetween(arr[i + 1], arr[i])) {
        segregatedData.push(null);
      }
    });

    return segregatedData;
  }

  exports.width = function (_width) {
    if (!arguments.length) {
      return width;
    }
    width = _width;
    return this;
  };

  exports.height = function (_height) {
    if (!arguments.length) {
      return height;
    }
    height = _height;
    return this;
  };

  exports.margin = function (_margin) {
    if (!arguments.length) {
      return margin;
    }
    margin = _margin;
    return this;
  };

  exports.on = function () {
    dispatcher.on.apply(dispatcher, arguments);
    return this;
  };

  exports.maxTimeRangeDifferenceToDraw = function (_maxTimeRangeDifferenceToDraw) {
    if (!arguments.length) {
      return maxTimeRangeDifferenceToDraw;
    }
    maxTimeRangeDifferenceToDraw = _maxTimeRangeDifferenceToDraw;
    return this;
  };

  exports.xAxisTimeFormat = function (_xAxisTimeFormat) {
    if (!arguments.length) {
      return xAxisTimeFormat;
    }
    xAxisTimeFormat = _xAxisTimeFormat;
    return this;
  };

  exports.yAxisValueFormat = function (_yAxisValueFormat) {
    if (!arguments.length) {
      return yAxisValueFormat;
    }
    yAxisValueFormat = _yAxisValueFormat;
    return this;
  };

  exports.curve = function (_curve) {
    if (!arguments.length) {
      return curve;
    }
    curve = _curve;
    return this;
  };

  exports.interpolationMaxIterationCount = function (_interpolationMaxIterationCount) {
    if (!arguments.length) {
      return interpolationMaxIterationCount;
    }
    interpolationMaxIterationCount = _interpolationMaxIterationCount;
    return this;
  };

  exports.interpolationAccuracy = function (_interpolationAccuracy) {
    if (!arguments.length) {
      return interpolationAccuracy;
    }
    interpolationAccuracy = _interpolationAccuracy;
    return this;
  };

  exports.mouseMoveTimeTreshold = function (_mouseMoveTimeTreshold) {
    if (!arguments.length) {
      return mouseMoveTimeTreshold;
    }
    mouseMoveTimeTreshold = _mouseMoveTimeTreshold;

    events.clear();
    events = (0, _eventThreshold2.default)(mouseMoveTimeTreshold);
    return this;
  };

  exports.chartHeight = function () {
    return height - margin.top - margin.bottom;
  };

  exports.chartWidth = function () {
    return width - margin.left - margin.right;
  };

  return exports;
}

exports.line = line;
exports.chartEvents = chartEvents;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartEvents = exports.stackBar = undefined;

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

var _colorProvider = __webpack_require__(1);

var _helpers = __webpack_require__(3);

var _eventThreshold = __webpack_require__(2);

var _eventThreshold2 = _interopRequireDefault(_eventThreshold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var chartEvents = {
  chartMouseEnter: 'chartMouseEnter',
  chartMouseLeave: 'chartMouseLeave',
  chartMouseMove: 'chartMouseMove',
  chartMouseClick: 'chartMouseClick'
};

function stackBar() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 700 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 120 : _ref$height,
      _ref$margin = _ref.margin,
      margin = _ref$margin === undefined ? { top: 20, right: 30, bottom: 40, left: 40 } : _ref$margin,
      _ref$marginBetweenSta = _ref.marginBetweenStacks,
      marginBetweenStacks = _ref$marginBetweenSta === undefined ? 0 : _ref$marginBetweenSta,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === undefined ? '#CCCCCC' : _ref$backgroundColor,
      _ref$maxTimeRangeDiff = _ref.maxTimeRangeDifferenceToDraw,
      maxTimeRangeDifferenceToDraw = _ref$maxTimeRangeDiff === undefined ? 1000 * 60 * 60 * 24 * 1.5 : _ref$maxTimeRangeDiff,
      xAxisTimeFormat = _ref.xAxisTimeFormat,
      _ref$mouseMoveTimeTre = _ref.mouseMoveTimeTreshold,
      mouseMoveTimeTreshold = _ref$mouseMoveTimeTre === undefined ? 20 : _ref$mouseMoveTimeTre,
      xAxisDateFrom = _ref.xAxisDateFrom,
      xAxisDateTo = _ref.xAxisDateTo;

  var svg = void 0;
  var chartWidth = void 0,
      chartHeight = void 0;
  var stackHeight = void 0;
  var xAxis = void 0;
  var xScale = void 0;

  var diapasons = void 0;

  var colors = (0, _colorProvider.colorProvider)();
  var events = (0, _eventThreshold2.default)(mouseMoveTimeTreshold);

  var dispatcher = d3.dispatch(chartEvents.chartMouseEnter, chartEvents.chartMouseLeave, chartEvents.chartMouseMove, chartEvents.chartMouseClick);

  function exports(selection) {
    selection.each(function (data) {
      chartWidth = exports.chartWidth();
      chartHeight = exports.chartHeight();

      buildSvg(this);

      initializeChartData(data);
      createScales();
      createAxis();

      drawBackground();
      drawAxis();
      drawRectangles();
      runDrawingAnimation();

      subscribeEvents();
    });
  }

  function initializeChartData(data) {
    var numberOfStacks = data.length;
    stackHeight = (chartHeight - (numberOfStacks - 1) * marginBetweenStacks) / numberOfStacks;
    diapasons = data.map(function (d) {
      return getStackDiapasons(d);
    });
  }

  function createScales() {
    var dateRanges = [].concat.apply([], diapasons.map(function (d) {
      return d.chartDiapasons;
    }).filter(function (d) {
      return d;
    })).map(function (d) {
      return [d.from, d.to];
    });

    var allChartDates = [].concat.apply([], dateRanges);

    var xMin = xAxisDateFrom || d3.min(allChartDates);
    var xMax = xAxisDateTo || d3.max(allChartDates);

    xScale = d3.scaleTime().domain([xMin, xMax]).range([0, chartWidth]);
  }

  function createAxis() {
    xAxis = d3.axisBottom(xScale);

    if (xAxisTimeFormat) {
      xAxis.tickFormat(xAxisTimeFormat);
    }
  }

  function drawAxis() {
    svg.select('.x-axis-container').append('g').classed('x-axis', true).attr('transform', 'translate(0, ' + chartHeight + ')').call(xAxis);
  }

  function drawRectangles() {
    var stacks = svg.select('.data-stacks-container').selectAll('.stack-holder')
    // reverse order - first path should be drawn above last
    .data(diapasons);

    var computeXPosition = function computeXPosition(date) {
      return moveNumToRange(Math.trunc(xScale(date)), 0, chartWidth);
    };

    var stackHolders = stacks.enter().append('g').classed('stack-holder', true).merge(stacks).attr('transform', function (d, i) {
      return 'translate(0, ' + i * (stackHeight + marginBetweenStacks) + ')';
    }).attr('width', chartWidth).attr('height', stackHeight);

    stackHolders.append('rect').attr('x', 0).attr('y', 0).attr('width', chartWidth).attr('height', stackHeight).style('fill', function (d) {
      return d.backgroundColor;
    });

    stackHolders.selectAll('.stack-holder').data(function (d) {
      return d.chartDiapasons;
    }).enter().append('rect').classed('stack-diapason', true).attr('x', function (d) {
      return computeXPosition(d.from);
    }).attr('y', function () {
      return 0;
    }).style('fill', function (d) {
      return d.color;
    }).attr('width', function (d) {
      return moveNumToRange(Math.ceil(xScale(d.to) - xScale(d.from)), 0, chartWidth - computeXPosition(d.from));
    }).attr('height', stackHeight);

    stacks.exit().remove();
  }

  function runDrawingAnimation() {
    var maskingRectangle = svg.append('rect').style('fill', 'white').attr('width', chartWidth).attr('height', chartHeight).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').attr('x', 0).attr('y', 0);

    maskingRectangle.transition().duration(1000).ease(d3.easeQuadInOut).attr('x', chartWidth).on('end', function () {
      return maskingRectangle.remove();
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container).append('svg').classed('stack-bar', true);

      buildContainerGroups();
    }

    svg.attr('width', width).attr('height', height);
  }

  function buildContainerGroups() {
    var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    container.append('g').classed('background-container', true);

    container.append('g').classed('x-axis-container', true);

    container.append('g').classed('data-stacks-container', true);

    container.append('g').classed('metadata-container', true);
  }

  function drawBackground() {
    var background = svg.select('.background-container');

    background.append('rect').attr('x', 0).attr('y', 0).attr('width', chartWidth).attr('height', chartHeight).attr('fill', backgroundColor).classed('background', true);
  }

  function subscribeEvents() {
    svg.on('mousemove', mouseMove);
    svg.on('mouseenter', mouseEnter);
    svg.on('mouseleave', mouseLeave);
    svg.on('click', mouseClick);
  }

  function mouseMove() {
    var mouse = d3.mouse(this);
    events.call(dispatchMouseMoveEvent.bind(this, mouse));
  }

  function dispatchMouseMoveEvent(mouse) {
    var options = getMouseEventOptions.apply(undefined, _toConsumableArray(mouse));
    dispatcher.call(chartEvents.chartMouseMove, this, options);
  }

  function mouseClick() {
    var options = getMouseEventOptions.apply(undefined, _toConsumableArray(d3.mouse(this)));
    dispatcher.call(chartEvents.chartMouseClick, this, options);
  }

  function mouseEnter() {
    dispatcher.call.apply(dispatcher, [chartEvents.chartMouseEnter].concat(_toConsumableArray(d3.mouse(this))));
  }

  function mouseLeave() {
    events.clear();
    dispatcher.call.apply(dispatcher, [chartEvents.chartMouseLeave].concat(_toConsumableArray(d3.mouse(this))));
  }

  function moveNumToRange(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function getMouseEventOptions(x, y) {
    // coords inside of chart
    x = moveNumToRange(x - margin.left, 0, chartWidth);
    y = moveNumToRange(y - margin.top, 0, chartHeight);

    var data = getClosestData(x);
    var selectedDate = xScale.invert(x);

    return { x: x, y: y, selectedDate: selectedDate, data: data };
  }

  function getClosestData(x) {
    var selectedDate = xScale.invert(x);
    var closestData = [];

    diapasons.forEach(function (d) {
      var selectedDiapason = {
        name: d.name,
        interpolatedDate: selectedDate
      };
      var closestDiapason = d.chartDiapasons.find(function (d) {
        return d.from <= selectedDate && selectedDate <= d.to;
      });
      if (closestDiapason) {
        Object.assign(selectedDiapason, closestDiapason);
      }
      closestData.push(selectedDiapason);
    });

    return closestData;
  }

  function getStackDiapasons(_ref2) {
    var data = _ref2.data,
        backgroundColor = _ref2.backgroundColor,
        name = _ref2.name;

    if (!Array.isArray(data) || !data.length) {
      return { chartDiapasons: [], backgroundColor: backgroundColor, name: name };
    }

    var buildDiapason = function buildDiapason(data, from, to) {
      return {
        color: data.color || colors.next(data.name + '-' + data.value).value,
        value: data.value,
        from: from || data.date,
        to: to || data.date
      };
    };

    var sortedData = data.sort(function (d1, d2) {
      return d1.date - d2.date;
    });
    var chartDiapasons = [];

    var leftDiapason = buildDiapason(sortedData[0], (0, _helpers.getDatePlusTime)(sortedData[0].date, -maxTimeRangeDifferenceToDraw), sortedData[0].date);

    chartDiapasons.push(leftDiapason);

    if (sortedData.length > 1) {
      sortedData.reduce(function (prev, curr) {
        var avgDate = (0, _helpers.getAverageDate)(prev.date, curr.date);
        var leftDate = d3.min([(0, _helpers.getDatePlusTime)(prev.date, maxTimeRangeDifferenceToDraw), avgDate]);
        var rightDate = d3.max([(0, _helpers.getDatePlusTime)(curr.date, -maxTimeRangeDifferenceToDraw), avgDate]);

        var leftDiapason = buildDiapason(prev, prev.date, leftDate);
        var rightDiapason = buildDiapason(curr, rightDate, curr.date);

        chartDiapasons.push(leftDiapason, rightDiapason);

        return curr;
      });
    }

    var lastData = sortedData[sortedData.length - 1];
    var rightDiapason = buildDiapason(lastData, lastData.date, (0, _helpers.getDatePlusTime)(lastData.date, maxTimeRangeDifferenceToDraw));
    chartDiapasons.push(rightDiapason);

    return { chartDiapasons: chartDiapasons, backgroundColor: backgroundColor, name: name };
  }

  exports.width = function (_width) {
    if (!arguments.length) {
      return width;
    }
    width = _width;
    return this;
  };

  exports.height = function (_height) {
    if (!arguments.length) {
      return height;
    }
    height = _height;
    return this;
  };

  exports.margin = function (_margin) {
    if (!arguments.length) {
      return margin;
    }
    margin = _margin;
    return this;
  };

  exports.marginBetweenStacks = function (_marginBetweenStacks) {
    if (!arguments.length) {
      return marginBetweenStacks;
    }
    marginBetweenStacks = _marginBetweenStacks;
    return this;
  };

  exports.backgroundColor = function (_backgroundColor) {
    if (!arguments.length) {
      return backgroundColor;
    }
    backgroundColor = _backgroundColor;
    return this;
  };

  exports.on = function () {
    dispatcher.on.apply(dispatcher, arguments);
    return this;
  };

  exports.maxTimeRangeDifferenceToDraw = function (_maxTimeRangeDifferenceToDraw) {
    if (!arguments.length) {
      return maxTimeRangeDifferenceToDraw;
    }
    maxTimeRangeDifferenceToDraw = _maxTimeRangeDifferenceToDraw;
    return this;
  };

  exports.xAxisTimeFormat = function (_xAxisTimeFormat) {
    if (!arguments.length) {
      return xAxisTimeFormat;
    }
    xAxisTimeFormat = _xAxisTimeFormat;
    return this;
  };

  exports.mouseMoveTimeTreshold = function (_mouseMoveTimeTreshold) {
    if (!arguments.length) {
      return mouseMoveTimeTreshold;
    }
    mouseMoveTimeTreshold = _mouseMoveTimeTreshold;

    events.clear();
    events = (0, _eventThreshold2.default)(mouseMoveTimeTreshold);
    return this;
  };

  exports.chartHeight = function () {
    return height - margin.top - margin.bottom;
  };

  exports.chartWidth = function () {
    return width - margin.left - margin.right;
  };

  exports.xAxisDateFrom = function (_xAxisDateFrom) {
    if (!arguments.length) {
      return xAxisDateFrom;
    }
    xAxisDateFrom = _xAxisDateFrom;
    return this;
  };

  exports.xAxisDateTo = function (_xAxisDateTo) {
    if (!arguments.length) {
      return xAxisDateTo;
    }
    xAxisDateTo = _xAxisDateTo;
    return this;
  };

  return exports;
}

exports.stackBar = stackBar;
exports.chartEvents = chartEvents;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function markers() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$cx = _ref.cx,
      cx = _ref$cx === undefined ? function (data) {
    return data.interpolatedX || data.x;
  } : _ref$cx,
      _ref$cy = _ref.cy,
      cy = _ref$cy === undefined ? function (data) {
    return data.interpolatedY || data.y;
  } : _ref$cy,
      _ref$radius = _ref.radius,
      radius = _ref$radius === undefined ? function () {
    return 5;
  } : _ref$radius,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? function () {
    return 'white';
  } : _ref$fill,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? function (data) {
    return data.color || 'red';
  } : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === undefined ? function () {
    return 2;
  } : _ref$strokeWidth,
      _ref$sort = _ref.sort,
      sort = _ref$sort === undefined ? function () {
    return 0;
  } : _ref$sort;

  var svg = void 0;

  function exports(selection) {
    selection.each(function () {
      buildSvg(this);
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container).append('g').classed('marker-container', true);
    }
  }

  exports.remove = function () {
    svg.selectAll('.marker').remove();

    return this;
  };

  exports.show = function (_ref2) {
    var data = _ref2.data;

    var markers = svg.selectAll('.marker')
    // reverse order - first markers should be drawn above last
    .data(data.slice().sort(sort).reverse());

    markers.enter().append('circle').classed('marker', true).merge(markers).attr('cx', function (d) {
      return cx(d);
    }).attr('cy', function (d) {
      return cy(d);
    }).attr('r', function (d) {
      return radius(d);
    }).style('fill', function (d) {
      return fill(d);
    }).style('stroke', function (d) {
      return stroke(d);
    }).style('stroke-width', function (d) {
      return strokeWidth(d);
    });

    markers.exit().remove();

    return this;
  };

  exports.cx = function (_cx) {
    if (!arguments.length) {
      return cx;
    }
    cx = _cx;
    return this;
  };

  exports.cy = function (_cy) {
    if (!arguments.length) {
      return cy;
    }
    cy = _cy;
    return this;
  };

  exports.radius = function (_radius) {
    if (!arguments.length) {
      return radius;
    }
    radius = _radius;
    return this;
  };

  exports.fill = function (_fill) {
    if (!arguments.length) {
      return fill;
    }
    fill = _fill;
    return this;
  };

  exports.stroke = function (_stroke) {
    if (!arguments.length) {
      return stroke;
    }
    stroke = _stroke;
    return this;
  };

  exports.strokeWidth = function (_strokeWidth) {
    if (!arguments.length) {
      return strokeWidth;
    }
    strokeWidth = _strokeWidth;
    return this;
  };

  exports.sort = function (_sort) {
    if (!arguments.length) {
      return sort;
    }
    sort = _sort;
    return this;
  };

  return exports;
}

exports.default = markers;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function tooltip() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$chartHeight = _ref.chartHeight,
      chartHeight = _ref$chartHeight === undefined ? 440 : _ref$chartHeight,
      _ref$chartWidth = _ref.chartWidth,
      chartWidth = _ref$chartWidth === undefined ? 700 : _ref$chartWidth,
      _ref$tooltipWidth = _ref.tooltipWidth,
      tooltipWidth = _ref$tooltipWidth === undefined ? 220 : _ref$tooltipWidth,
      _ref$horizontalMouseM = _ref.horizontalMouseMargin,
      horizontalMouseMargin = _ref$horizontalMouseM === undefined ? 40 : _ref$horizontalMouseM,
      _ref$verticalBorderMa = _ref.verticalBorderMargin,
      verticalBorderMargin = _ref$verticalBorderMa === undefined ? 10 : _ref$verticalBorderMa,
      _ref$headerFormatter = _ref.headerFormatter,
      headerFormatter = _ref$headerFormatter === undefined ? function (selectedDate) {
    return d3.timeFormat('%Y-%d-%m %H:%M:%S')(selectedDate);
  } : _ref$headerFormatter,
      _ref$topicFormatter = _ref.topicFormatter,
      topicFormatter = _ref$topicFormatter === undefined ? function (data) {
    return data.name;
  } : _ref$topicFormatter,
      _ref$valueFormatter = _ref.valueFormatter,
      valueFormatter = _ref$valueFormatter === undefined ? function (data) {
    return d3.format('.1f')(data.interpolatedValue);
  } : _ref$valueFormatter,
      _ref$sort = _ref.sort,
      sort = _ref$sort === undefined ? function () {
    return 0;
  } : _ref$sort;

  var svg = void 0;

  function exports(selection) {
    selection.each(function () {
      buildSvg(this);
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container).append('g').classed('tooltip-container', true);
    }
  }

  exports.remove = function () {
    svg.select('.tooltip').remove();

    return this;
  };

  exports.show = function (_ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        selectedDate = _ref2.selectedDate,
        data = _ref2.data;

    exports.remove();

    svg.append('g').classed('tooltip', true).append('rect').attr('width', tooltipWidth);

    var foreignObject = svg.select('.tooltip').append('foreignObject').classed('foreign-object', true).attr('width', tooltipWidth);

    var _createToltipDiv = createToltipDiv(foreignObject, selectedDate, data),
        divHeight = _createToltipDiv.divHeight;

    svg.select('.tooltip foreignObject').attr('height', divHeight);

    svg.select('.tooltip rect').attr('height', divHeight);

    var xPosition = x > chartWidth / 2 ? x - tooltipWidth - horizontalMouseMargin : x + horizontalMouseMargin;
    var yPosition = y + divHeight > chartHeight - verticalBorderMargin ? chartHeight - divHeight - verticalBorderMargin : y;

    svg.select('.tooltip').attr('transform', 'translate(' + xPosition + ', ' + yPosition + ')');

    return this;
  };

  function createToltipDiv(container, selectedDate, data) {
    var div = container.append('xhtml:div').append('div').classed('tooltip-container', true);

    div.append('div').classed('tooltip-header', true).append('p').html(headerFormatter(selectedDate, data));
    div.append('hr');

    var topics = div.selectAll('.topic').data(data.slice().sort(sort)).enter().append('div').classed('topic', true);

    topics.append('div').classed('circle', true).style('background-color', function (d) {
      return d.color;
    });

    topics.append('div').classed('topic-name', true).html(function (d) {
      return topicFormatter(d);
    });

    topics.append('div').classed('topic-value', true).html(function (d) {
      return valueFormatter(d);
    });

    var divHeight = div.node().getBoundingClientRect().height;

    return {
      div: div,
      divHeight: divHeight
    };
  }

  exports.chartHeight = function (_chartHeight) {
    if (!arguments.length) {
      return chartHeight;
    }
    chartHeight = _chartHeight;
    return this;
  };

  exports.chartWidth = function (_chartWidth) {
    if (!arguments.length) {
      return chartWidth;
    }
    chartWidth = _chartWidth;
    return this;
  };

  exports.tooltipWidth = function (_tooltipWidth) {
    if (!arguments.length) {
      return tooltipWidth;
    }
    tooltipWidth = _tooltipWidth;
    return this;
  };

  exports.horizontalMouseMargin = function (_horizontalMouseMargin) {
    if (!arguments.length) {
      return horizontalMouseMargin;
    }
    horizontalMouseMargin = _horizontalMouseMargin;
    return this;
  };

  exports.verticalBorderMargin = function (_verticalBorderMargin) {
    if (!arguments.length) {
      return verticalBorderMargin;
    }
    verticalBorderMargin = _verticalBorderMargin;
    return this;
  };

  exports.headerFormatter = function (_headerFormatter) {
    if (!arguments.length) {
      return headerFormatter;
    }
    headerFormatter = _headerFormatter;
    return this;
  };

  exports.topicFormatter = function (_topicFormatter) {
    if (!arguments.length) {
      return topicFormatter;
    }
    topicFormatter = _topicFormatter;
    return this;
  };

  exports.valueFormatter = function (_valueFormatter) {
    if (!arguments.length) {
      return valueFormatter;
    }
    valueFormatter = _valueFormatter;
    return this;
  };

  exports.sort = function (_sort) {
    if (!arguments.length) {
      return sort;
    }
    sort = _sort;
    return this;
  };

  return exports;
}

exports.default = tooltip;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d = __webpack_require__(0);

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function verticalDivider() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 440 : _ref$height;

  var svg = void 0;

  function exports(selection) {
    selection.each(function () {
      buildSvg(this);
    });
  }

  function buildSvg(container) {
    if (!svg) {
      svg = d3.select(container).append('g').classed('divider-container', true);
    }

    svg.append('line').classed('divider', true).attr('y1', 0).attr('y2', height);
  }

  exports.remove = function () {
    svg.style('display', 'none');
    return this;
  };

  exports.show = function () {
    svg.style('display', 'block');
    return this;
  };

  exports.update = function (_ref2) {
    var x = _ref2.x;

    svg.select('.divider').attr('x1', x).attr('x2', x);
    return this;
  };

  exports.height = function (_height) {
    if (!arguments.length) {
      return height;
    }
    height = _height;
    return this;
  };

  return exports;
}

exports.default = verticalDivider;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tooltip = exports.markers = exports.verticalDivider = exports.chartEvents = exports.stackBar = exports.bar = exports.line = undefined;

var _line = __webpack_require__(5);

var _bar = __webpack_require__(4);

var _stackBar = __webpack_require__(6);

var _verticalDivider = __webpack_require__(9);

var _verticalDivider2 = _interopRequireDefault(_verticalDivider);

var _markers = __webpack_require__(7);

var _markers2 = _interopRequireDefault(_markers);

var _tooltip = __webpack_require__(8);

var _tooltip2 = _interopRequireDefault(_tooltip);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.line = _line.line;
exports.bar = _bar.bar;
exports.stackBar = _stackBar.stackBar;
exports.chartEvents = _line.chartEvents;
exports.verticalDivider = _verticalDivider2.default;
exports.markers = _markers2.default;
exports.tooltip = _tooltip2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getYPointFromPath(path, x, maxIterationCount, accuracy, approximateLength) {
  var bbox = path.getBBox();

  // x outside of path boundary
  if (x < bbox.x || bbox.x + bbox.width < x) {
    return {};
  }
  var startLength = 0;
  var endLength = path.getTotalLength();

  // set search range around approximated value
  if (typeof approximateLength === 'number') {
    var leftApproximationRange = approximateLength - 20;
    var rightApproximationRange = approximateLength + 20;
    if (path.getPointAtLength(leftApproximationRange).x < x) {
      startLength = leftApproximationRange;
    }
    if (path.getPointAtLength(rightApproximationRange).x > x) {
      endLength = rightApproximationRange;
    }
  }

  var mediumLength = (startLength + endLength) / 2;
  var currentIteration = 0;
  var point = path.getPointAtLength(mediumLength);

  // binary search for close point to x
  while (currentIteration < maxIterationCount && Math.abs(point.x - x) > accuracy) {
    mediumLength = (startLength + endLength) / 2;
    point = path.getPointAtLength(mediumLength);
    if (point.x < x) {
      startLength = mediumLength;
    } else {
      endLength = mediumLength;
    }
    currentIteration++;
  }

  return { y: point.y, pathLength: mediumLength };
}

exports.default = getYPointFromPath;

/***/ })
/******/ ]);
});