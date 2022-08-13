export default function throttle(fn, delay = 300) {
  let flag;
  return function () {
    if (!flag) return;

    flag = false;

    setTimeout(() => {
      flag = true; // 为true表明执行完成,可以继续下一个
      fn.apply(this, args);
    }, delay);
  };
}
// 最多1000ms执行一次
// window.addEventListener(
//   'scroll',
//   throttle(() => {
//     console.log(111);
//   }, 1000),
// );
