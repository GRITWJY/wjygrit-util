import baseIndexOf from './baseIndexOf';

/**
 * 判断 value 是否在 array 中
 * */
function arrayIncludes(array, value) {
  const length = array == null ? 0 : array.length;

  return !!length && baseIndexOf(array, value, 0) > -1;
}

export default arrayIncludes;
