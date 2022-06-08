import arrayIncludes from './arrayIncludes';
import map from '../map';
import arrayIncludesWith from '../arrayIncludesWith';

const LARGE_ARRAY_SIZE = 200;

/**
 * @param array {Array}  需要检查的数组
 * @param values {Array}  与array进行对比的数组
 * @param iteratee {Function}  遍历数组时每个元素都会调用iteratee函数
 * @param {Function}  用于判断两个值是否相等
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee) {
  let includes = arrayIncludes;
  let isCommon = true; /**是否是普通比较**/
  const result = [];
  const valuesLength = values.length;
  if (!array.length) {
    return result;
  }

  // 迭代器的处理
  if (iteratee) {
    values = map(values, (value) => iteratee(value));
  }

  if (comparator) {
    includes = arrayIncludesWith; /**这里判断是否存在就要用自己给的方法了**/
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }

  outer: for (let value of array) {
    // 直接在这里处理array数组
    const computed = iteratee == null ? value : iteratee(value);

    /**如果自定义函数存在， 就直接用原值**/
    value = comparator || value != 0 ? value : 0;
    // 这里用到的是严格比较，具体比较流程可以看我的 [JS类型转换]()
    /**自定义函数直接走else*/
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength;
      while (valuesIndex--) {
        // 找到相同的了
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      // 没有相同
      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      // 这里要检查NaN
      result.push(value);
    }
  }

  return result;
}

export default baseDifference;
