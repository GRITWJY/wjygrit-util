/**
 * 允许自己传一个迭代器首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较
 * */
import isArrayLikeObject from './isArrayLikeObject';
import baseDifference from '.internal/baseDifference';
import baseFlatten from './baseFlatten';
import last from './last';

function differenceBy(array, ...values) {
  let iteratee = last(values);

  // 函数是不可能是类对象数组的
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined;
  }

  return isArrayLikeObject(array)
    ? baseDifference(
        array,
        baseFlatten(values, 1, isArrayLikeObject, true),
        iteratee,
      )
    : [];
}

export default differenceBy;
