
function getYPointFromPath(path, x) {
  const bbox = path.getBBox();

  // x outside of path boundary
  if (x < bbox.x || bbox.x + bbox.width < x) {
    return null;
  }

  let startLength = 0;
  let endLength = path.getTotalLength();
  let currentIteration = 0;
  // lesser accuracy may affect correct positioning in line segments
  const maxIterationCount = 50;
  const accuracy = 0.001;
  let point = path.getPointAtLength(endLength / 2);

  // binary search for close point to x
  while (currentIteration < maxIterationCount || (point.x - x > accuracy)) {
    point = path.getPointAtLength((startLength + endLength) / 2);
    const mediumLength = (startLength + endLength) / 2;
    if (point.x < x) {
      startLength = mediumLength;
    } else {
      endLength = mediumLength;
    }
    currentIteration++;
  }
  return point.y;
}

export default getYPointFromPath;
