/**
 * The base implementation of `findIndex` and `findLastIndex`.
 * */

function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array;
  // fromRight 控制查找方向， 这里+1和 -1 是因为  ++index 和 index-- 的缘故
  let index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
export default baseFindIndex;
