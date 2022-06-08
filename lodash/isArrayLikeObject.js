import isObjectLike from './isObjectLike';
import isArrayLike from './isArrayLike';

function isArrayLikeObject(value) {
  // 是否是对象和是否是数组
  return isObjectLike(value) && isArrayLike(value);
}

export default isArrayLikeObject;
