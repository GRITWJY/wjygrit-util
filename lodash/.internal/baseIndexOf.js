import strictIndexOf from './strictIndexOf';
import baseFindIndex from './baseFindIndex';
import baseIsNaN from './baseIsNaN';

/**
 * 没有“fromIndex”边界检查的“indexOf”的基本实现。
 *
 * */
function baseIndexOf(array, value, fromIndex) {
  // 这里主要是区分NaN的比较

  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

export default baseIndexOf;
