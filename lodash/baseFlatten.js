/**
 * @param array {Array} 需要展开的数组
 * @param depth {number} 最大的递归层次
 * @param predicate {boolean} 是否对数组中每一项进行检查，默认值是 isFlattenable
 * @param isStrict  {boolean}是否严格要求每一项都必须通过
 * @param result {Array}  最终结果
 *
 *
 * */
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable);
  result || (result = []);

  if (array == null) {
    return result;
  }

  // 注意哈，这里是[[],[],[]]
  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        result.push(...value);
      }
    }
    // 如果不是严格模式
    else if (!isStrict) {
      result[result.length] = value;
    }
  }

  return result;
}

export default baseFlatten;
