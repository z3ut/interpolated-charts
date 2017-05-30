
function getYPointFromPath(path, x, maxIterationCount, accuracy, approximateLength) {
  const bbox = path.getBBox();

  // x outside of path boundary
  if (x < bbox.x || bbox.x + bbox.width < x) {
    return {};
  }
  let startLength = 0;
  let endLength = path.getTotalLength();

  // set search range around approximated value
  if (typeof approximateLength === 'number') {
    const leftApproximationRange = approximateLength - 20;
    const rightApproximationRange = approximateLength + 20;
    if (path.getPointAtLength(leftApproximationRange).x < x) {
      startLength = leftApproximationRange;
    }
    if (path.getPointAtLength(rightApproximationRange).x > x) {
      endLength = rightApproximationRange;
    }
  }

  let mediumLength = (startLength + endLength) / 2;
  let currentIteration = 0;
  let point = path.getPointAtLength(mediumLength);

  // binary search for close point to x
  while (currentIteration < maxIterationCount && (Math.abs(point.x - x) > accuracy)) {
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

export default getYPointFromPath;
