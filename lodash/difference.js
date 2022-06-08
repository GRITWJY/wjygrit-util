import isArrayLikeObject from './isArrayLikeObject';

/**
 * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用[SameValueZero]()做相等比较。结果值的顺序是由第一个数组中的顺序确定。
 * 这里的 `samevaluezero` 算法在[JS类型转换](http://www.wjygrit.cn/pages/30fnodn/)中有解释，它与samevalue的差别就是 +0 和 -0
 * */

function difference(array, ...values) {
  // array是否是类数组且类对象
  // 是， 将 values展开，并跟 array 做baseFlatten比较
  // 否， 直接返回空数组

  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
}

export default difference;
