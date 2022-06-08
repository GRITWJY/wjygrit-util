// 累加值
// 1. 返回一个64-bit floating的等长数组
// 2. 可以只传一个数字，它会从n 到0逐渐自动累加
// 3. 会忽略NaN 和 undefined， 但保持下标
// d3.cumsum([1, NaN, undefined, 2, "wat", 7])
// [1,1,1,3,3,10]
// 4. d3.cumsum([{a: 1.3}, {a: 2.2}, {a: 3.0}], d => d.a)
// [1.3,3.5,6.5]
// Array.from() 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
export function cumsum(values, valueof) {
  var sum = 0,
    index = 0;
  return Float64Array.from(
    values,
    valueof === undefined
      ? (v) => (sum += +v || 0)
      : (v) => (sum += +valueof(v, index++, values) || 0),
  );
}
