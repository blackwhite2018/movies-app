export default (fn: Function, ms: number): Function => {
  let timerID: any;
  return (...args: Array<any>) => {
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      timerID = null;
      fn(...args);
    }, ms);
  };
};
