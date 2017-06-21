
/*
  Do not call repeated events in threshold time range
*/

function eventThreshold(threshold = 20) {

  let eventTimer;
  let previousEventTime;

  function call(func) {
    const currentDate = new Date().getTime();
    const timeSinceLastEvent = currentDate - previousEventTime;

    /*
      if last event was < threshold ms ago,
      start timeout for new event dispatch.
      timeout will fire if no new event occurs.
      use case - call new event when last event occured recently.
      timeout will dispatch new event after treshold time.
    */
    if (previousEventTime && (timeSinceLastEvent < threshold)) {
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
    previousEventTime = new Date().getTime();
    func();
  }

  return {
    call,
    clear
  }
}

export default eventThreshold
