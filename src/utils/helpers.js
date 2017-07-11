
function getDatePlusTime(date, time) {
  return new Date(date.getTime() + time);
}

function getAverageDate(date1, date2) {
  return new Date((date1.getTime() + date2.getTime()) / 2);
}

function boundNumberToRange(num, min, max) {
  return Math.min(Math.max(num, min), max);
}


export {
  getDatePlusTime,
  getAverageDate,
  boundNumberToRange
}
