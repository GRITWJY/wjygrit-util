var baseFlatten = require('./util/base/baseFlatten');

// 外层调用的函数
export function flatten(array) {
  // 数据校验
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

// 外层调用的函数
export function flattenDeep(array) {
  // 数据校验
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, Infinity) : [];
}

export function flattenDepth(array, depth) {
  // 数据校验
  var length = array == null ? 0 : array.length;
  depth = depth === undefined ? 1 : toInteger(depth);
  return length ? baseFlatten(array, depth) : [];
}
